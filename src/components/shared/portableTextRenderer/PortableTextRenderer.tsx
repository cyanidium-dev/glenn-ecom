"use client";

import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "@portabletext/react";

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => {
      const text = Array.isArray(children)
        ? children.join("").trim()
        : String(children || "").trim();

      if (!text) return null;

      return (
        <p className="text-[12px] leading-[14px] mb-2">{children}</p>
      );
    },
  },
};

export default function PortableTextRenderer({
  value,
}: {
  value?: PortableTextBlock | PortableTextBlock[];
}) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
