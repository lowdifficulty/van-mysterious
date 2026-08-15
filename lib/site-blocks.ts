import type { SiteBlock, SiteBlockType } from "@/lib/site-content-types";

export const BLOCK_TYPES: { type: SiteBlockType; label: string; hint: string }[] = [
  { type: "text", label: "Text", hint: "A heading and a paragraph" },
  { type: "image", label: "Image", hint: "A photo with a caption" },
  { type: "quote", label: "Quote", hint: "A lined-off line of dialogue" },
  { type: "cta", label: "Button", hint: "A call-to-action strip" },
  { type: "contact", label: "Contact", hint: "A note-to-the-archive strip" },
];

export function createBlock(type: SiteBlockType): SiteBlock {
  const id = `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const shared = { id, type, visible: true };
  if (type === "text") {
    return {
      ...shared,
      kicker: "New section",
      title: "Write a title",
      body: "Click to edit this text. Add atmosphere, a scene, or a note from the archive.",
    };
  }
  if (type === "image") {
    return {
      ...shared,
      title: "Untitled still",
      body: "Upload a picture or paste an image address.",
      imageUrl: "",
    };
  }
  if (type === "quote") {
    return {
      ...shared,
      body: "The house lights go down and the street keeps its secret.",
      quoteName: "A viewer",
    };
  }
  if (type === "cta") {
    return {
      ...shared,
      kicker: "Next",
      title: "Step into the archive",
      body: "Stills, diary pages, and playable weather.",
      buttonLabel: "Open Gallery",
      buttonHref: "/gallery",
    };
  }
  return {
    ...shared,
    kicker: "Contact",
    title: "Leave a note",
    body: "Questions about the fiction, the games, or the stills.",
    buttonLabel: "Write",
    buttonHref: "/contact",
  };
}
