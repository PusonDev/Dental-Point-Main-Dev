"use client";

import { useEffect, useState, useCallback } from "react";
import type { WhatsAppQueueItem } from "@/types";

export default function AdminWhatsAppPage() {
  const [queue, setQueue] = useState<WhatsAppQueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/admin/whatsapp")
      .then((r) => r.json())
      .then((d) => setQueue(d.queue || []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function act(id: string, action: "approve" | "reject" | "send") {
    await fetch("/api/admin/whatsapp", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">WhatsApp Queue</h1>
      <p className="text-xs text-gray-500 mb-4">Messages queue until API keys are configured (see docs/INTEGRATIONS.md).</p>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {queue.map((item) => (
            <li key={item.id} className="card text-sm">
              <p className="font-semibold">{item.recipient_name} · {item.recipient_phone}</p>
              <p className="text-xs text-gray-500">{item.trigger_type} · {item.status}</p>
              <p className="mt-2 whitespace-pre-wrap text-gray-700 text-xs">{item.message_body}</p>
              {item.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <button type="button" onClick={() => act(item.id, "approve")} className="btn-primary text-xs py-1 px-3">
                    Approve
                  </button>
                  <button type="button" onClick={() => act(item.id, "send")} className="border border-primary text-primary text-xs py-1 px-3 rounded-lg">
                    Send
                  </button>
                  <button type="button" onClick={() => act(item.id, "reject")} className="text-xs text-red-500">
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
