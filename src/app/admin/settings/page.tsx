export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Clinic Settings</h1>
      <div className="card text-sm space-y-3">
        <p>Configure clinic hours, branding, and integrations from Supabase <code className="text-xs bg-gray-100 px-1 rounded">clinic_settings</code> table.</p>
        <p className="text-gray-600">
          WhatsApp and Mailchimp setup instructions: <strong>docs/INTEGRATIONS.md</strong>
        </p>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>WHATSAPP_ACCESS_TOKEN — Meta Cloud API</li>
          <li>MAILCHIMP_API_KEY — audience sync for leads & patients</li>
          <li>SUPABASE_SERVICE_ROLE_KEY — admin API routes (server only)</li>
        </ul>
      </div>
    </div>
  );
}
