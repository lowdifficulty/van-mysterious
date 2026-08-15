"use client";

import type { ElementType, KeyboardEvent } from "react";
import { useStudioOptional } from "@/components/studio/StudioContext";

type EditableProps = {
  path: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
};

export function Editable({
  path,
  as: Tag = "span",
  className = "",
  multiline = false,
}: EditableProps) {
  const studio = useStudioOptional();
  const text = studio?.text(path) ?? "";

  if (!studio?.editing) {
    return <Tag className={className}>{text}</Tag>;
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };

  return (
    <Tag
      className={`studio-editable ${className}`}
      contentEditable
      suppressContentEditableWarning
      data-edit-path={path}
      onKeyDown={onKeyDown}
      onBlur={(event: { currentTarget: HTMLElement }) => {
        const next = event.currentTarget.innerText.replace(/\u00a0/g, " ").trim();
        studio.setField(path, next);
      }}
    >
      {text}
    </Tag>
  );
}
