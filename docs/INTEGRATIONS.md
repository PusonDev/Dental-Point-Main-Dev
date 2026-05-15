# Deferred Integrations — Dr. Jarin's Dental Point

WhatsApp and Mailchimp are stubbed in code and queue/sync locally until credentials are added.

## WhatsApp (Meta Cloud API)

1. Create a Meta Business app with WhatsApp product enabled.
2. Add to `.env.local`:

```env
WHATSAPP_ACCESS_TOKEN=your-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_VERIFY_TOKEN=your-webhook-verify-token
```

3. Messages are inserted into `whatsapp_queue` with status `pending`.
4. Admin approves/sends from **Admin → WhatsApp** (`/admin/whatsapp`).
5. `sendWhatsAppMessage()` in `src/lib/whatsapp.ts` calls Graph API when tokens exist; otherwise items stay queued.

## Mailchimp

1. Create two audiences: **Leads** and **Patients**.
2. Add to `.env.local`:

```env
MAILCHIMP_API_KEY=your-key-us1
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LEADS_AUDIENCE_ID=audience-id-leads
MAILCHIMP_PATIENTS_AUDIENCE_ID=audience-id-patients
```

3. `syncLead()` in `src/lib/mailchimp.ts` runs on funnel submit (`/api/leads`) when configured.

## Supabase

Required for all environments:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Copy from `.env.example`. Admin API routes use **service role** via `createAdminClient()`. Patient routes use `createClient()` (anon + session).

## Staff accounts

Create users in Supabase Auth (email/password), then insert into `staff`:

```sql
INSERT INTO staff (user_id, full_name, role, email)
VALUES ('auth-user-uuid', 'Dr. Admin', 'admin', 'admin@example.com');
```

Staff sign in at `/admin/login`. Patients use `/auth/login` (phone + password or OTP).
