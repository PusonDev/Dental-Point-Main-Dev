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
}) {
  const admin = createAdminClient();
  const body =
    params.customBody ||
    TEMPLATES[params.triggerType](params.recipientName, params.extra);

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

/** Meta WhatsApp Cloud API — DEFERRED until WHATSAPP_ACCESS_TOKEN is set */
export async function sendWhatsAppMessage(
  phone: string,
  message: string
): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_NUMBER_ID) {
    return {
      ok: false,
      error: "WhatsApp API not configured. Message queued only.",
    };
  }

  const formattedPhone = phone.replace(/^\+/, "").replace(/^0/, "880");
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
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
