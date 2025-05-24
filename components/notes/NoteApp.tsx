// components/notes/NoteApp.tsx
"use client";
import { useState } from "react";
import { NoteForm } from "./NoteForm";
import { NoteList, Note } from "./NoteList";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function NoteApp() {
  const [editing, setEditing] = useState<Note | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (title: string, content: string) => {
    setLoading(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setDialogOpen(false);
    setEditing(null);
    setRefreshKey((k) => k + 1);
    setLoading(false);
  };

  const handleEdit = (note: Note) => {
    setEditing(note);
    setDialogOpen(true);
  };

  const handleUpdate = async (title: string, content: string) => {
    if (!editing) return;
    setLoading(true);
    await fetch(`/api/notes/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setDialogOpen(false);
    setEditing(null);
    setRefreshKey((k) => k + 1);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setEditing(null);
    setRefreshKey((k) => k + 1);
    setLoading(false);
  };

  const handleAddNew = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditing(null);
  };

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col gap-8 p-4 sm:p-8 bg-card rounded-xl shadow-lg border mt-8">
    <h1 className="text-3xl font-bold mb-2 text-center flex items-center justify-center gap-2">
      <span role="img" aria-label="Notebook">🗒️</span>
      Notes Management Dashboard
    </h1>
      <div className="flex flex-col gap-6">
        <NoteList
          key={refreshKey}
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedId={editing?.id}
        />
        <Button className="mt-4 w-full" variant="default" size="lg" onClick={handleAddNew}>
          Add a New Note
        </Button>
        <Dialog open={dialogOpen} onOpenChange={open => !open && handleDialogClose()}>
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Note" : "Add a New Note"}</DialogTitle>
            </DialogHeader>
            <NoteForm
              initialTitle={editing?.title}
              initialContent={editing?.content}
              onSubmit={editing ? handleUpdate : handleCreate}
              loading={loading}
              submitLabel={editing ? "Update Note" : "Add Note"}
            />
            {(editing || dialogOpen) && (
              <Button
                variant="ghost"
                className="mt-2"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
