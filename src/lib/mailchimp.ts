/**
 * Mailchimp integration — DEFERRED
 * Enable when MAILCHIMP_API_KEY is set. See docs/INTEGRATIONS.md
 */
export async function syncLead(_data: {
  full_name: string;
  phone: string;
  email?: string;
}): Promise<void> {
  if (!process.env.MAILCHIMP_API_KEY) {
    return;
  }
  // TODO: Implement Mailchimp API when keys are available
}
