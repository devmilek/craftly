"use client";

import { FloatingMenu, useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading1 } from "lucide-react";
import { useEffect, useState } from "react";

const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const floatingMenuItems = [
  {
    label: "Heading 1",
    icon: Heading1,
    onClick: () => {},
  },
  {
    label: "Heading 2",
    icon: Heading1,
    onClick: () => {},
  },
  {
    label: "Heading 3",
    icon: Heading1,
    onClick: () => {},
  },
];

export const TextEditor = () => {
  const editor = useEditor({
    extensions,
    content,
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "outline-none focus-within:outline-none focus-visible:outline-none prose prose-sm max-w-none w-full prose-zinc dark:prose-invert",
      },
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      <EditorFloatingMenu editor={editor} />
    </>
  );
};

const EditorFloatingMenu = ({ editor }: { editor: Editor | null }) => {
  console.count("editor floating render");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? floatingMenuItems.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === floatingMenuItems.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        floatingMenuItems[selectedIndex].onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor}>
      <div className="bg-background border rounded-lg p-1 grid">
        {floatingMenuItems.map((item) => (
          <button
            key={item.label}
            className="p-1 flex items-center gap-2"
            onClick={item.onClick}
          >
            <item.icon className="size-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </FloatingMenu>
  );
};

EditorFloatingMenu.displayName = "EditorFloatingMenu";
