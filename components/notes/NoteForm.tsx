// components/notes/NoteForm.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface NoteFormProps {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (title: string, content: string) => void;
  loading?: boolean;
  submitLabel?: string;
}

export function NoteForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  loading,
  submitLabel = "Save Note",
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(title, content);
      }}
    >
      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="min-h-[100px]"
      />
      <Button type="submit" disabled={loading} className="self-end">
        {submitLabel}
      </Button>
    </form>
  );
}
