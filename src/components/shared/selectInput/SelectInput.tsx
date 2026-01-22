"use client";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import SelectArrowIcon from "../icons/SelectArrowIcon";

interface SelectInputProps {
  options: { value: string; label: string }[];
  defaultValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SelectInput({
  options,
  defaultValue,
  onChange,
  className = "",
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        const currentIndex = options.findIndex(
          opt => opt.value === selectedValue
        );
        const nextIndex = Math.min(currentIndex + 1, options.length - 1);
        setSelectedValue(options[nextIndex].value);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const currentIndex = options.findIndex(
          opt => opt.value === selectedValue
        );
        const prevIndex = Math.max(currentIndex - 1, 0);
        setSelectedValue(options[prevIndex].value);
      } else if (event.key === "Enter") {
        event.preventDefault();
        onChange(selectedValue);
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedValue, options, onChange]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge("relative w-[92px] h-[32px] lg:h-[40px]", className)}
    >
      <div
        className="absolute z-0 inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 89.31%, rgba(255, 255, 255, 0.2) 144.45%, rgba(255, 255, 255, 0.7) 210.6%)",
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-full h-[32px] lg:h-[40px] px-[9px] pr-[35px] bg-transparent text-white text-[14px] leading-none lg:text-[18px] 
                   cursor-pointer
                   border-none outline-none
                   hover:opacity-80 active:scale-[98%] 
                   will-change-transform transition duration-300 ease-in-out
                   flex items-center justify-start"
      >
        <span className="truncate">{selectedOption?.label || ""}</span>
      </button>
      <div
        className="absolute z-10 right-[11px] top-1/2 pointer-events-none transition duration-300 ease-in-out"
        style={{
          transform: `translateY(-50%) ${isOpen ? "rotate(180deg)" : "rotate(0deg)"}`,
        }}
      >
        <SelectArrowIcon className="w-4 h-[9px]" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 top-full mt-1 w-full">
          <div className="relative">
            <div
              className="absolute z-20 inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 89.31%, rgba(255, 255, 255, 0.2) 144.45%, rgba(255, 255, 255, 0.7) 210.6%)",
                padding: "1.5px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="relative z-10 bg-red">
              {options.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-[9px] py-2 text-[14px] leading-none lg:text-[18px] transition-colors duration-200
                    ${
                      option.value === selectedValue
                        ? "bg-white text-red font-medium"
                        : "bg-transparent text-white hover:bg-white/10"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
