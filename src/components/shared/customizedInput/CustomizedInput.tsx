"use client";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";
import LoaderIcon from "../icons/LoaderIcon";
import { twMerge } from "tailwind-merge";
import JournalInputDecoration from "../icons/JournalInputDecoration";

interface Values {
  [fieldName: string]: string;
}

interface CustomizedInputProps {
  fieldName: string;
  placeholder: string;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isRequired?: boolean;
  as?: string;
  labelClassName?: string;
  fieldClassName?: string;
  mask?: string | RegExp | (string | RegExp)[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  inputType?: string;
  fieldFontSize?: string;
  variant?: "white" | "fancy";
}

export default function CustomizedInput({
  fieldName,
  placeholder,
  errors,
  touched,
  as,
  labelClassName = "",
  fieldClassName = "",
  mask = "",
  onChange,
  onFocus,
  inputType = "text",
  isLoading = false,
  variant = "white",
}: CustomizedInputProps) {
  const { handleChange } = useFormikContext<Values>();
  const isError = (errors as Record<string, unknown>)[fieldName];
  const isTouched = (touched as Record<string, unknown>)[fieldName];

  const labelStyles = "relative flex flex-col justify-center w-full";
  const fieldStyles = `relative w-full border-[2px] outline-none resize-none transition duration-300 ease-in-out ${variant === "fancy" ? "placeholder:font-andes placeholder:text-[22px] placeholder:leading-[95%] placeholder:text-white/80" : ""}`;
  const errorStyles =
    "absolute bottom-[-11px] left-5 text-[9px] lg:text-[12px] font-normal leading-none text-white";

  return (
    <label className={twMerge(labelStyles, labelClassName)}>
      <Field
        as={as}
        mask={mask}
        placeholder={placeholder}
        name={fieldName}
        type={inputType}
        autoComplete="on"
        onChange={onChange || handleChange}
        onFocus={onFocus}
        className={twMerge(
          fieldStyles,
          fieldClassName,
          isError && isTouched
            ? "border-red"
            : variant === "fancy"
              ? "border-transparent"
              : "border-white"
        )}
      />
      {isLoading && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2">
          <LoaderIcon variant="outline" />
        </div>
      )}
      {variant === "fancy" && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <JournalInputDecoration />
        </div>
      )}

      <ErrorMessage name={fieldName} component="p" className={errorStyles} />
    </label>
  );
}
