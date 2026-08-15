"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ContactBubble() {
  const pathname = usePathname();
  if (pathname === "/contact" || pathname === "/enter" || pathname === "/login") {
    return null;
  }

  return (
    <Link
      href="/contact"
      className="contact-bubble"
      aria-label="Leave a note"
    >
      Note
    </Link>
  );
}
