# Dr. Jarin's Dental Point

Production-grade dental chamber web app — Next.js 14, Supabase, Tailwind.

## Quick start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment** — copy `.env.example` to `.env.local` and add your Supabase keys:
   ```bash
   cp .env.example .env.local
   ```

3. **Database** — In [Supabase](https://supabase.com) SQL Editor, run:
   ```
   supabase/schema.sql
   ```
   Create a Storage bucket named `reports` (private).

4. **Run locally**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Windows build note

If `npm run build` fails with `EISDIR: readlink` (common on paths with spaces or synced drives like `E:\`), use:

```bash
npm run build:win
```

This builds in `%TEMP%` and copies `.next` back.

## Staff setup

1. Create admin user in Supabase Auth (email + password).
2. Insert into `staff` table:
   ```sql
   INSERT INTO staff (user_id, full_name, role, email)
   VALUES ('YOUR-AUTH-USER-UUID', 'Dip', 'admin', 'email@example.com');
   ```
3. Login at `/admin/login`

## Patient auth

Patients sign up at `/auth/signup` using phone + password (email alias: `phone@patients.drjarinsdental.local`).

Enable Phone provider in Supabase for OTP, or use password tab on login.

## Routes

| Area | Path |
|------|------|
| Home | `/` |
| Services | `/services` |
| Marketing funnel | `/landing` |
| Book appointment | `/book-appointment` |
| Patient login | `/auth/login` |
| Patient dashboard | `/dashboard` |
| Admin panel | `/admin` |
| Receptionist | `/receptionist` |

## Deferred integrations

See [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) for WhatsApp and Mailchimp.

## Deploy (Vercel)

1. Push to GitHub
2. Import on Vercel
3. Add env vars from `.env.example`
4. Deploy

---

Built by Baba Puson
