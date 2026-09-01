"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  icon: string;
  label: string;
  sub: string;
  action: { type: "link"; href: string } | { type: "external"; href: string };
};

type Group = { heading: string; items: Item[] };

const groups: Group[] = [
  {
    heading: "PAGES",
    items: [
      {
        icon: "🏠",
        label: "Home",
        sub: "Go to homepage",
        action: { type: "link", href: "/" },
      },
      {
        icon: "👤",
        label: "About",
        sub: "Learn more about me",
        action: { type: "link", href: "/about" },
      },
      {
        icon: "💼",
        label: "Projects",
        sub: "View my work",
        action: { type: "link", href: "/projects" },
      },
      {
        icon: "✍️",
        label: "Blog",
        sub: "Read my thoughts",
        action: { type: "link", href: "/blogs" },
      },
      {
        icon: "📖",
        label: "Guestbook",
        sub: "Leave a message",
        action: { type: "link", href: "/guestbook" },
      },
      {
        icon: "🖥️",
        label: "Uses",
        sub: "My tech stack",
        action: { type: "link", href: "/uses" },
      },
      {
        icon: "🔗",
        label: "Links",
        sub: "Find me elsewhere",
        action: { type: "link", href: "/links" },
      },
      {
        icon: "📷",
        label: "Off the Clock",
        sub: "Photography & writing",
        action: { type: "link", href: "/off-the-clock" },
      },
      {
        icon: "📅",
        label: "Book a Call",
        sub: "Schedule a meeting",
        action: { type: "link", href: "/book-call" },
      },
    ],
  },
  {
    heading: "CONNECT",
    items: [
      {
        icon: "🐙",
        label: "GitHub",
        sub: "@A-verse",
        action: { type: "external", href: "https://github.com/A-verse" },
      },
      {
        icon: "💼",
        label: "LinkedIn",
        sub: "Professional network",
        action: {
          type: "external",
          href: "https://linkedin.com/in/theanjalikamal",
        },
      },
      {
        icon: "🧩",
        label: "LeetCode",
        sub: "@A-verse",
        action: { type: "external", href: "https://leetcode.com/u/A-verse/" },
      },
      {
        icon: "📸",
        label: "Instagram",
        sub: "@anjalikamal31",
        action: {
          type: "external",
          href: "https://instagram.com/anjalikamal31",
        },
      },
      {
        icon: "✉️",
        label: "Email",
        sub: "anjalikamal3105@gmail.com",
        action: { type: "external", href: "mailto:anjalikamal3105@gmail.com" },
      },
    ],
  },
];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: q
          ? g.items.filter(
              (i) =>
                i.label.toLowerCase().includes(q) ||
                i.sub.toLowerCase().includes(q),
            )
          : g.items,
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const flatItems = useMemo(() => filtered.flatMap((g) => g.items), [filtered]);

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => {
      setQuery("");
      setActiveIndex(0);
      inputRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [open]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  const runItem = (item: Item) => {
    if (item.action.type === "link") router.push(item.action.href);
    else window.open(item.action.href, "_blank", "noreferrer");
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) runItem(item);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div
        className="cmd-palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="cmd-search-row">
          <span className="cmd-search-icon">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Type a command or search..."
            className="cmd-search-input"
          />
          <button
            className="cmd-close"
            onClick={onClose}
            aria-label="Close command menu"
          >
            ×
          </button>
        </div>
        <div className="cmd-results">
          {filtered.length === 0 && (
            <p className="cmd-empty">No results found.</p>
          )}
          {filtered.map((group, groupIndex) => {
            const groupOffset = filtered
              .slice(0, groupIndex)
              .reduce(
                (sum, currentGroup) => sum + currentGroup.items.length,
                0,
              );

            return (
              <div key={group.heading} className="cmd-group">
                <p className="cmd-group-heading">{group.heading}</p>
                {group.items.map((item, itemIndex) => {
                  const absoluteIndex = groupOffset + itemIndex;
                  const isActive = absoluteIndex === activeIndex;

                  return (
                    <button
                      key={item.label}
                      className={`cmd-item ${isActive ? "cmd-item-active" : ""}`}
                      onMouseEnter={() => setActiveIndex(absoluteIndex)}
                      onClick={() => runItem(item)}
                    >
                      <span className="cmd-item-icon">{item.icon}</span>
                      <span className="cmd-item-text">
                        <strong>{item.label}</strong>
                        <small>{item.sub}</small>
                      </span>
                      {isActive && <span className="cmd-item-enter">↵</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="cmd-footer">
          <span>Privacy · Terms</span>
          <span>↑↓ Navigate · ⌘↵ Open</span>
        </div>
      </div>
    </div>
  );
}
