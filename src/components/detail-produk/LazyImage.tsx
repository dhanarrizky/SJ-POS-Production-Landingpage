import { useEffect, useRef, useState } from "react"
import type { ImgHTMLAttributes } from "react"

interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  /** Gambar di atas lipatan (mis. hero): dimuat langsung, bukan lazy. */
  priority?: boolean
}

/**
 * <img> dengan lazy load native dan animasi fade-in + zoom-out ringan saat
 * gambar selesai dimuat. Class layout dari pemanggil tetap dipakai apa adanya.
 */
export default function LazyImage({
  priority = false,
  className = "",
  onLoad,
  alt,
  ...rest
}: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Gambar yang sudah ada di cache bisa selesai sebelum handler onLoad terpasang.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
      onError={(e) => {
        // Fallback jika gambar 404 (misal belum di-upload)
        const target = e.target as HTMLImageElement
        target.style.display = "none"
      }}
      className={`${className} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
      }`}
      {...rest}
    />
  )
}
