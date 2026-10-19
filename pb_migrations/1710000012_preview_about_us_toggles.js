/// <reference path="../pb_data/types.d.ts" />
// Temporary preview: flips the "hide until real data exists" toggles on so
// the partner-logo row and about-us stats row can be seen with sample data.
// Safe to flip back to false (or delete this migration + rerun) once the
// real logos/numbers are ready.
migrate(
  (app) => {
    const dao = new Dao(app)
    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("show_trust_marquee", true)
      record.set("show_about_stats", true)
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not enable preview toggles:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("show_trust_marquee", false)
      record.set("show_about_stats", false)
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not revert preview toggles:", e)
    }
  },
)
