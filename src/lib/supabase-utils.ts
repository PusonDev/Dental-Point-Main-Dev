import { SupabaseClient } from "@supabase/supabase-js";

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Attempt ${attempt} failed:`, lastError.message);

      if (attempt < maxRetries) {
        // Exponential backoff
        const backoffDelay = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }
  }

  throw lastError;
}

export function handleSupabaseError(error: any) {
  console.error("Supabase error:", error);

  if (error?.code === 'PGRST116') {
    return "Resource not found";
  }
  if (error?.code === '23505') {
    return "Duplicate entry";
  }
  if (error?.code === '23503') {
    return "Foreign key constraint violated";
  }
  if (error?.code === 'PGRST301') {
    return "Database connection error";
  }
  if (error?.message?.includes('timeout') || error?.message?.includes('ETIMEDOUT')) {
    return "Request timeout - please try again";
  }

  return error?.message || "An unexpected error occurred";
}