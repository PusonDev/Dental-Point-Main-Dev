import fs from "fs";
import path from "path";

const backupDir = path.join(process.cwd(), "tmp");
const backupFile = path.join(backupDir, "bookings-backup.jsonl");

export async function appendBookingBackup(payload: unknown) {
  try {
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
    const line = JSON.stringify({ ts: new Date().toISOString(), payload }) + "\n";
    fs.appendFileSync(backupFile, line, { encoding: "utf8" });
    return { ok: true, path: backupFile };
  } catch (err) {
    console.error("Failed to write booking backup:", err);
    return { ok: false, error: (err as Error).message };
  }
}

export function readBookingBackups() {
  try {
    if (!fs.existsSync(backupFile)) return [];
    const content = fs.readFileSync(backupFile, "utf8").trim();
    if (!content) return [];
    return content.split("\n").map((l) => JSON.parse(l));
  } catch (err) {
    console.error("Failed to read booking backups:", err);
    return [];
  }
}

export default appendBookingBackup;
