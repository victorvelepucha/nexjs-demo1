// lib/notes.ts
// In-memory notes store and CRUD functions

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

let notes: Note[] = [];

export function getNotes(): Note[] {
  return notes;
}

export function getNote(id: string): Note | undefined {
  return notes.find((n) => n.id === id);
}

export function createNote(title: string, content: string): Note {
  const now = new Date().toISOString();
  const note: Note = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
  notes.unshift(note);
  return note;
}

export function updateNote(id: string, title: string, content: string): Note | undefined {
  const note = notes.find((n) => n.id === id);
  if (note) {
    note.title = title;
    note.content = content;
    note.updatedAt = new Date().toISOString();
  }
  return note;
}

export function deleteNote(id: string): boolean {
  const idx = notes.findIndex((n) => n.id === id);
  if (idx !== -1) {
    notes.splice(idx, 1);
    return true;
  }
  return false;
}
