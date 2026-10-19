# =========================================================================
# 1. Build Stage: Frontend compilation
# =========================================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy package.json first to leverage Docker layer caching
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy remaining source code
COPY . .

# Declare build-time variables for Vite (passed from docker-compose build.args)
ARG VITE_POCKETBASE_URL
ARG VITE_MEDIA_BASE_URL
ENV VITE_POCKETBASE_URL=${VITE_POCKETBASE_URL}
ENV VITE_MEDIA_BASE_URL=${VITE_MEDIA_BASE_URL}

# Compile React + Vite application
RUN pnpm build

# =========================================================================
# 2. Final Stage: PocketBase server with static frontend files
# =========================================================================
FROM alpine:3.20

# Install ca-certificates (essential for PocketBase mailer/backups/external requests)
# and wget for health checks
RUN apk add --no-cache ca-certificates wget unzip

WORKDIR /pb

# Parameterize PocketBase version — override with: --build-arg PB_VERSION=x.y.z
ARG PB_VERSION=0.22.20

# Detect architecture and download the correct PocketBase binary
RUN ARCH=$(uname -m) && \
    case "$ARCH" in \
        x86_64) PB_ARCH="linux_amd64" ;; \
        aarch64|arm64) PB_ARCH="linux_arm64" ;; \
        *) echo "Unsupported architecture: $ARCH" && exit 1 ;; \
    esac && \
    wget -q "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_${PB_ARCH}.zip" \
      -O /tmp/pocketbase.zip && \
    unzip /tmp/pocketbase.zip -d /pb && \
    rm /tmp/pocketbase.zip && \
    chmod +x /pb/pocketbase

# Create a non-root user for security
RUN addgroup -S pbgroup && adduser -S pbuser -G pbgroup

# Copy pb_migrations and pb_hooks
COPY pb_migrations /pb/pb_migrations
COPY pb_hooks /pb/pb_hooks

# Copy the compiled static frontend files into pb_public
COPY --from=frontend-builder /app/dist /pb/pb_public

# Ensure non-root user owns the pb directory
# pb_data is a volume so we create it first for correct ownership
RUN mkdir -p /pb/pb_data && chown -R pbuser:pbgroup /pb

USER pbuser

# Expose PocketBase default HTTP port
ENV PORT=8080
EXPOSE 8080

# Define volume for data persistence (crucial so database isn't lost on restart)
VOLUME ["/pb/pb_data"]

# Health check
HEALTHCHECK --interval=15s \
            --timeout=5s \
            --start-period=30s \
            --retries=3 \
            CMD wget -q --spider http://127.0.0.1:${PORT}/api/health || exit 1

# Run PocketBase serve command binding to all interfaces
CMD ["/bin/sh", "-c", "/pb/pocketbase serve --http=0.0.0.0:${PORT}"]
