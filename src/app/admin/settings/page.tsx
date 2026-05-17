"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/lib/toast";

interface ConfigStatus {
  key: string;
  label: string;
  configured: boolean;
  isPublic: boolean;
}

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<ConfigStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this from a secure endpoint that checks process.env
    // For now, we simulate the check based on standard keys
    const checkKeys = async () => {
       try {
         const res = await fetch("/api/admin/config-check");
         const data = await res.json();
         setConfig(data.config || []);
       } catch (err) {
         showToast("Failed to load configuration status", "error");
       } finally {
         setLoading(false);
       }
    };
    checkKeys();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">System Settings & Integrations</h1>
      
      <div className="card space-y-4">
        <h2 className="font-bold border-b pb-2">Configuration Diagnostics</h2>
        <p className="text-sm text-gray-500">
          Below is the current status of your server environment variables. 
          Update these in your <code className="bg-gray-100 px-1 rounded">.env.local</code> or Vercel dashboard.
        </p>

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-10 bg-gray-100 rounded" />)}
          </div>
        ) : (
          <div className="space-y-2">
            {config.map((c) => (
              <div key={c.key} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{c.label}</span>
                  <code className="text-[10px] text-gray-400">{c.key}</code>
                </div>
                <div className="flex items-center gap-2">
                  {c.configured ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Configured
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Missing
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card space-y-4">
        <h2 className="font-bold border-b pb-2">Manual Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="btn-secondary py-3 text-sm flex flex-col items-center gap-1">
            <span className="font-bold">Sync Newsletters</span>
            <span className="text-[10px] font-normal">Push current patients to Mailchimp</span>
          </button>
          <button className="btn-secondary py-3 text-sm flex flex-col items-center gap-1">
            <span className="font-bold">Clear WhatsApp Queue</span>
            <span className="text-[10px] font-normal">Remove rejected/failed messages</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
        <p className="text-xs text-primary font-medium">
          Note: Changes to environment variables require a redeploy on Vercel or a restart of the local development server.
        </p>
      </div>
    </div>
  );
}

