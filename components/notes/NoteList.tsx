// components/notes/NoteList.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteListProps {
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  selectedId?: string;
}

export function NoteList({ onEdit, onDelete, selectedId }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading notes...</div>;
  if (!notes.length) return <div className="text-muted-foreground">No notes yet.</div>;

  return (
    <div className="flex flex-col gap-4 w-full">
      {notes.map((note) => (
        <Card
          key={note.id}
          className={`transition-all ${selectedId === note.id ? "ring-2 ring-primary" : ""}`}
        >
          <CardHeader className="pb-2 flex-row items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="truncate text-lg">{note.title}</CardTitle>
              <CardDescription className="truncate">
                {note.content.length > 80 ? note.content.slice(0, 80) + "..." : note.content}
              </CardDescription>
            </div>
            <div className="flex gap-2 items-start">
              <Button size="sm" variant="outline" onClick={() => onEdit(note)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(note.id)}>
                Delete
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
