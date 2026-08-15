"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPath, setPath } from "@/lib/content-path";
import type { SiteContent } from "@/lib/site-content-types";

type StudioContextValue = {
  isStudio: boolean;
  editing: boolean;
  dirty: boolean;
  saving: boolean;
  draft: SiteContent;
  setEditing: (value: boolean) => void;
  setField: (path: string, value: string) => void;
  updateDraft: (updater: (current: SiteContent) => SiteContent) => void;
  save: () => Promise<boolean>;
  text: (path: string) => string;
};

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({
  isStudio,
  initial,
  children,
}: {
  isStudio: boolean;
  initial: SiteContent;
  children: ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState(initial);

  const setField = useCallback((path: string, value: string) => {
    setDraft((current) => setPath(current, path, value));
    setDirty(true);
  }, []);

  const updateDraft = useCallback((updater: (current: SiteContent) => SiteContent) => {
    setDraft((current) => updater(current));
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/van/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!response.ok) return false;
      setDirty(false);
      return true;
    } finally {
      setSaving(false);
    }
  }, [draft]);

  const value = useMemo(
    () => ({
      isStudio,
      editing: isStudio && editing,
      dirty,
      saving,
      draft,
      setEditing,
      setField,
      updateDraft,
      save,
      text: (path: string) => getPath(draft, path),
    }),
    [dirty, draft, editing, isStudio, save, saving, setField, updateDraft],
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const value = useContext(StudioContext);
  if (!value) {
    throw new Error("useStudio must be used inside StudioProvider");
  }
  return value;
}

export function useStudioOptional() {
  return useContext(StudioContext);
}
