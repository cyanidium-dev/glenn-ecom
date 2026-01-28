"use client";
import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import Select, { StylesConfig, components } from "react-select";
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
  const selectInputId = useId();
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectedOption = options.find(opt => opt.value === selectedValue);

  const handleChange = (selected: { value: string; label: string } | null) => {
    if (selected) {
      setSelectedValue(selected.value);
      onChange(selected.value);
    }
  };

  // Custom DropdownIndicator component to use our SelectArrowIcon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <div
          className="transition-transform duration-300 ease-in-out"
          style={{
            transform: props.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
          }}
        >
          <SelectArrowIcon className="w-4 h-[9px]" />
        </div>
      </components.DropdownIndicator>
    );
  };

  // Custom Menu component to add gradient border effect
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Menu = (props: any) => {
    return (
      <components.Menu {...props}>
        <div className="relative" style={{ backgroundColor: "#93001c" }}>
          {/* Gradient border effect */}
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
          <div className="relative z-10" style={{ backgroundColor: "#93001c" }}>
            {props.children}
          </div>
        </div>
      </components.Menu>
    );
  };

  // Custom styles to match the original design
  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    container: (provided: any) => ({
      ...provided,
      height: "100%",
      display: "flex",
      alignItems: "center",
      width: "100%",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      minHeight: "unset",
      height: "100%",
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      padding: 0,
      position: "relative",
      opacity: state.isFocused ? 0.8 : 1,
      transform: state.isFocused ? "scale(0.98)" : "scale(1)",
      transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
      "&:hover": {
        border: "none",
        opacity: 0.8,
      },
      "&:active": {
        transform: "scale(0.98)",
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueContainer: (provided: any) => ({
      ...provided,
      padding: 0,
      paddingLeft: "9px",
      paddingRight: "35px",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    singleValue: (provided: any) => ({
      ...provided,
      color: "#ffffff",
      fontSize: "14px",
      lineHeight: "1",
      "@media (min-width: 1024px)": {
        fontSize: "18px",
      },
      fontWeight: 400,
      margin: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: (provided: any) => ({
      ...provided,
      color: "#ffffff",
      margin: 0,
      padding: 0,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indicatorsContainer: (provided: any) => ({
      ...provided,
      padding: 0,
      paddingRight: "11px",
      position: "absolute",
      right: 0,
      top: "50%",
      transform: "translateY(-50%)",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: () => ({
      padding: 0,
      color: "#ffffff",
      "&:hover": {
        color: "#ffffff",
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#93001c !important",
      border: "1.5px solid #ffffff",
      borderRadius: 0,
      marginTop: "4px",
      zIndex: 10000,
      overflow: "hidden",
      boxShadow: "none",
      position: "absolute",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 10000,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
      backgroundColor: "#93001c !important",
      overflow: "hidden",
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#ffffff !important"
        : state.isFocused
          ? "rgba(255, 255, 255, 0.1) !important"
          : "#93001c !important",
      color: state.isSelected ? "#93001c" : "#ffffff",
      padding: "8px 9px",
      cursor: "pointer",
      fontSize: "14px",
      lineHeight: "1",
      "@media (min-width: 1024px)": {
        fontSize: "18px",
      },
      fontWeight: state.isSelected ? 500 : 400,
      "&:active": {
        backgroundColor: state.isSelected
          ? "#ffffff !important"
          : "rgba(255, 255, 255, 0.1) !important",
      },
    }),
  };

  return (
    <div
      className={twMerge("relative w-[92px] h-[32px] lg:h-[40px]", className)}
    >
      {/* Gradient border effect */}
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
      <Select
        instanceId={selectInputId}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        styles={customStyles}
        components={{ DropdownIndicator, Menu }}
        isSearchable={false}
        menuPosition="fixed"
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : undefined
        }
        menuShouldScrollIntoView={false}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
