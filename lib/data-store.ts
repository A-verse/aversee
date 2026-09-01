import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type PublicSignature = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export type GuestbookInsert = {
  name: string;
  message: string;
};

export type ContactSubmissionInsert = {
  name: string;
  email: string;
  message: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

function getSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
    throw new Error("Supabase is not configured.");
  }

  if (key.startsWith("sb_publishable_")) {
    throw new Error("Supabase service-role key is misconfigured.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

function mapPublicSignature(row: {
  id: string;
  name: string;
  message: string;
  created_at: string;
}): PublicSignature {
  return {
    id: row.id,
    name: row.name?.trim() || "Anonymous",
    message: row.message?.trim() || "",
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function readGuestbookSignatures(): Promise<PublicSignature[]> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("signatures")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapPublicSignature);
}

export async function insertGuestbookSignature(
  input: GuestbookInsert,
): Promise<PublicSignature> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("signatures")
    .insert({
      name: input.name || "Anonymous",
      message: input.message,
    })
    .select("id, name, message, created_at")
    .single();

  if (error) {
    throw error;
  }

  return mapPublicSignature(data);
}

export async function insertContactSubmission(
  input: ContactSubmissionInsert,
): Promise<ContactSubmission> {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("contact_submissions")
    .insert({
      name: input.name,
      email: input.email,
      message: input.message,
    })
    .select("id, name, email, message, created_at")
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    message: data.message,
    createdAt: new Date(data.created_at).toISOString(),
  };
}
