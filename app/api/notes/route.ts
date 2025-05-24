// app/api/notes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getNotes, createNote } from "@/lib/notes";

export async function GET() {
  return NextResponse.json(getNotes());
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }
  const note = createNote(title, content);
  return NextResponse.json(note, { status: 201 });
}
