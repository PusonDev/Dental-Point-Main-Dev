/**
 * Mailchimp Integration for Newsletters
 * Requires MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID in .env
 */

export const subscribeEmail = async (email: string) => {
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !AUDIENCE_ID) {
    console.warn("Mailchimp keys missing. Skipping subscription.");
    return { error: "Newsletter service not configured." };
  }

  // Extract datacenter from API key (e.g., us20)
  const DATACENTER = API_KEY.split("-")[1] || "us1";

  try {
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      // Handle cases where user is already subscribed
      if (data.title === "Member Exists") {
        return { success: true, message: "Already subscribed!" };
      }
      throw new Error(data.detail || "Mailchimp subscription failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Mailchimp error:", error);
    return { error: error instanceof Error ? error.message : "Failed to subscribe" };
  }
};

export const syncLead = async (lead: { full_name: string; phone: string; email?: string }) => {
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_LEADS_AUDIENCE_ID || process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !AUDIENCE_ID) {
    console.warn("Mailchimp keys missing. Skipping lead sync.");
    return { error: "Lead sync service not configured." };
  }

  const DATACENTER = API_KEY.split("-")[1] || "us1";
  
  // Use email if provided, otherwise create a placeholder email using phone
  const email = lead.email && lead.email.trim() !== "" 
    ? lead.email 
    : `${lead.phone.replace(/\D/g, "")}@placeholder.com`;

  try {
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: lead.full_name,
            PHONE: lead.phone,
          },
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok && data.title !== "Member Exists") {
      throw new Error(data.detail || "Mailchimp lead sync failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Mailchimp sync error:", error);
    return { error: error instanceof Error ? error.message : "Failed to sync lead" };
  }
};

