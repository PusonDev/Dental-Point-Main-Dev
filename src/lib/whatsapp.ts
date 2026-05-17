import { createAdminClient } from "@/lib/supabase/admin";
import type { WhatsAppTrigger } from "@/types";

const TEMPLATES: Record<WhatsAppTrigger, (name: string, extra?: Record<string, string>) => string> = {
  welcome: (name) =>
    `প্রিয় ${name},\n\nডাঃ জেরিন'স ডেন্টাল পয়েন্টে আপনাকে স্বাগতম! 🦷\n\nআমরা আপনার রিকোয়েস্টটি পেয়েছি। শীঘ্রই আমাদের টিম আপনার সাথে যোগাযোগ করবে।\n\nআপনার হাসি আমাদের দায়িত্ব। 😊\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট\n📞 ০১৬১৬ ৭৫৩৩৬৪`,
  login: (name) =>
    `প্রিয় ${name},\n\nআপনি সফলভাবে আপনার ডেন্টাল পোর্টালে প্রবেশ করেছেন। ✅\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট`,
  reminder: (name, extra) =>
    `প্রিয় ${name},\n\nমনে করিয়ে দিতে চাই — আগামীকাল আপনার অ্যাপয়েন্টমেন্ট আছে! 📅\n\n📅 তারিখ: ${extra?.date || ""}\n⏰ সময়: ${extra?.time || ""}\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট`,
  followup: (name) =>
    `প্রিয় ${name},\n\nসম্প্রতি আমাদের চেম্বারে আসার জন্য ধন্যবাদ। 🙏\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট`,
  due: (name, extra) =>
    `প্রিয় ${name},\n\nআপনার একটি বকেয়া পেমেন্ট রয়েছে।\n\n💰 বকেয়া পরিমাণ: ৳${extra?.amount || "0"}\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট`,
  festival: (name) =>
    `প্রিয় ${name},\n\nশুভেচ্ছা ও অভিনন্দন! 🎉\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট`,
  manual: (name) => `প্রিয় ${name},\n\n— ডাঃ জেরিন'স ডেন্টাল পয়েন্ট`,
};

export async function enqueueMessage(params: {
  recipientPhone: string;
  recipientName: string;
  triggerType: WhatsAppTrigger;
  patientId?: string;
  extra?: Record<string, string>;
  customBody?: string;
  templateName?: string; // Optional: specify a Meta template
}) {
  const admin = createAdminClient();
  
  // If templateName is provided, we store a JSON structure in message_body
  // Otherwise we use the legacy string-based body
  let body = params.customBody || TEMPLATES[params.triggerType](params.recipientName, params.extra);
  
  if (params.templateName) {
    body = JSON.stringify({
      isTemplate: true,
      template: params.templateName,
      variables: [
        params.recipientName,
        params.extra?.date || "",
        params.extra?.time || ""
      ]
    });
  }

  const { error } = await admin.from("whatsapp_queue").insert({
    recipient_phone: params.recipientPhone,
    recipient_name: params.recipientName,
    patient_id: params.patientId || null,
    trigger_type: params.triggerType,
    message_body: body,
    status: "pending",
  });

  if (error) throw error;
}

/**
 * Meta WhatsApp Cloud API — Template Messages (Official)
 */
export async function sendWhatsAppTemplate({
  to,
  template,
  variables = [],
  language = "en",
}: {
  to: string;
  template: string;
  variables?: string[];
  language?: string;
}) {
  const version = process.env.WHATSAPP_API_VERSION || "v19.0";
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneId || !token) {
    return { ok: false, error: "WhatsApp API not configured" };
  }

  const formattedPhone = to.replace(/^\+/, "").replace(/^0/, "880").replace(/\D/g, "");
  const url = `https://graph.facebook.com/${version}/${phoneId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    to: formattedPhone,
    type: "template",
    template: {
      name: template,
      language: { code: language },
      components: [
        {
          type: "body",
          parameters: variables.map((v) => ({
            type: "text",
            text: String(v),
          })),
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: JSON.stringify(data) };
    }
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

/** Meta WhatsApp Cloud API — Session Messages (Standard Text) */
export async function sendWhatsAppMessage(
  phone: string,
  message: string
): Promise<{ ok: boolean; error?: string }> {
  const version = process.env.WHATSAPP_API_VERSION || "v19.0";
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!token || !phoneId) {
    return {
      ok: false,
      error: "WhatsApp API not configured. Message queued only.",
    };
  }

  const formattedPhone = phone.replace(/^\+/, "").replace(/^0/, "880").replace(/\D/g, "");
  const url = `https://graph.facebook.com/${version}/${phoneId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: formattedPhone,
      type: "text",
      text: { body: message },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { ok: false, error: JSON.stringify(data) };
  }
  return { ok: true };
}
