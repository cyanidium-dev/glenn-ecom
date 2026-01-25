"use client";

import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { Children, isValidElement } from "react";
import type { PortableTextBlock as CustomPortableTextBlock } from "@/types/store";

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => {
      const text = Array.isArray(children)
        ? children.join("").trim()
        : String(children || "").trim();

      if (!text) return null;

      return (
        <p className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] mb-2 lg:mb-[15px] last:mb-0 last:lg:mb-0">
          {children}
        </p>
      );
    },
    h2: ({ children }) => (
      <h2 className="mt-[40px] lg:mt-[50px] first:mt-0 text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] font-medium mb-[15px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-[30px] lg:mt-[40px] first:mt-0 text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%] mb-[14px] lg:mb-[15px]">
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium">{children}</strong>
    ),
  },
  list: {
    bullet: props => (
      <ul className="flex flex-col list-disc pl-[14px] lg:pl-[18px] mb-[10px] lg:mb-[15px]">
        {props.children}
      </ul>
    ),
    number: props => {
      // Try to get start value from the first list item's block data
      let startValue: number | undefined;

      if (props.children) {
        const firstChild = Children.toArray(props.children)[0];
        if (isValidElement(firstChild)) {
          // Access the value prop that PortableText passes to listItem
          const childValue = (
            firstChild.props as { value?: CustomPortableTextBlock }
          )?.value;
          startValue = childValue?.start;
        }
      }

      return (
        <ol
          className="flex flex-col list-decimal pl-[14px] lg:pl-[18px] mb-[10px] lg:mb-[15px]"
          {...(startValue ? { start: startValue } : {})}
        >
          {props.children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%]">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[12px] leading-[116%] lg:text-[14px] lg:leading-[121%]">
        {children}
      </li>
    ),
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
