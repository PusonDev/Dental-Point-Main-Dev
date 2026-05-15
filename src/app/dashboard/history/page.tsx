"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Visit } from "@/types";

export default function HistoryPage() {
  const { t } = useLanguage();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((d) => setVisits(d.visits || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">{t.dashboard.history}</h1>
      {loading ? (
        <p className="text-gray-500">{t.common.loading}</p>
      ) : visits.length === 0 ? (
        <p className="text-gray-500 text-sm">No visits recorded yet.</p>
      ) : (
        <ul className="space-y-3">
          {visits.map((v) => (
            <li key={v.id} className="card text-sm">
              <p className="font-semibold text-primary">{v.visit_date}</p>
              {v.chief_complaint && <p>Complaint: {v.chief_complaint}</p>}
              {v.treatment_done && <p>Treatment: {v.treatment_done}</p>}
              {v.prescription && <p>Rx: {v.prescription}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
