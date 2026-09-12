import clientPromise from "@/lib/mongodb";

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

async function getDatabase() {
  const client = await clientPromise;
  return client.db("guestbook");
}

export async function readGuestbookSignatures(): Promise<PublicSignature[]> {
  const db = await getDatabase();

  const rows = await db
    .collection("signatures")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return rows.map((row) => ({
    id: row._id.toString(),
    name: String(row.name ?? "").trim() || "Anonymous",
    message: String(row.message ?? "").trim(),
    createdAt: new Date(row.createdAt).toISOString(),
  }));
}

export async function insertGuestbookSignature(
  input: GuestbookInsert,
): Promise<PublicSignature> {
  const db = await getDatabase();

  const document = {
    name: input.name?.trim() || "Anonymous",
    message: input.message.trim(),
    createdAt: new Date(),
  };

  const result = await db.collection("signatures").insertOne(document);

  return {
    id: result.insertedId.toString(),
    name: document.name,
    message: document.message,
    createdAt: document.createdAt.toISOString(),
  };
}
