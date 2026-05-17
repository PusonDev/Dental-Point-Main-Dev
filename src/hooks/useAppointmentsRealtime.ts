"use client";
import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/client";

export const useAppointmentsRealtime = (onNew: (payload: any) => void) => {
  useEffect(() => {
    if (!supabaseClient) return;

    const channel = supabaseClient
      .channel("appointments-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "appointments",
        },
        (payload) => {
          try {
            onNew(payload.new);
          } catch (e) {
            // swallow
            console.error("onNew handler error:", e);
          }
        }
      )
      .subscribe();

    return () => {
      try {
        supabaseClient.removeChannel(channel);
      } catch (e) {
        // ignore
      }
    };
  }, [onNew]);
};

export default useAppointmentsRealtime;
