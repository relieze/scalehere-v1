"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContactDialogContextType {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType | null>(null);

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ContactDialogContext.Provider
      value={{
        open,
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false),
      }}
    >
      {children}
    </ContactDialogContext.Provider>
  );
}

export function useContactDialog() {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) throw new Error("useContactDialog must be used within ContactDialogProvider");
  return ctx;
}
