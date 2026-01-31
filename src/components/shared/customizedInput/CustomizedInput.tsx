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
  placeholder?: string;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  /** When set, show error after submit attempt even if field wasn't blurred (fixes phone etc. on mobile) */
  submitCount?: number;
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
  variant?: "white" | "fancy" | "gradient";
  labelText?: string;
}

export default function CustomizedInput({
  fieldName,
  placeholder = "",
  errors,
  touched,
  submitCount,
  as,
  labelClassName = "",
  fieldClassName = "",
  mask = "",
  onChange,
  onFocus,
  inputType = "text",
  isLoading = false,
  variant = "white",
  labelText = "",
}: CustomizedInputProps) {
  const { handleChange } = useFormikContext<Values>();
  const isError = (errors as Record<string, unknown>)[fieldName];
  const isTouched = (touched as Record<string, unknown>)[fieldName];

  const labelStyles = "relative flex flex-col justify-center w-full";
  const fieldStyles = `relative w-full border-[2px] outline-none resize-none transition duration-300 ease-in-out ${
    variant === "fancy"
      ? "placeholder:font-andes placeholder:text-[22px] placeholder:leading-[95%] placeholder:text-white/80"
      : ""
  }`;
  const errorStylesBase =
    "text-[9px] lg:text-[12px] font-normal leading-none text-white/70";

  // Show errors after submit even if field wasn't touched (fixes autofill: browser doesn't fire blur)
  const hasError = Boolean(
    isError &&
    (isTouched || (typeof submitCount === "number" && submitCount > 0))
  );

  return (
    <label className={twMerge(labelStyles, labelClassName)}>
      {variant === "fancy" && (
        <>
          {labelText && (
            <p className="mb-[5px] text-[10px] lg:text-[12px] leading-[120%] text-white/60">
              {labelText}
            </p>
          )}
          <div className="relative w-full">
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
                // Fancy variant uses `JournalInputDecoration` as the frame.
                // Avoid adding an extra border on error (double-frame effect).
                "border-transparent",
                // Remove iOS/Safari default input styling (extra border, rounded corners, inner shadow)
                "appearance-none rounded-none shadow-none focus:shadow-none outline-none"
              )}
            />
            {isLoading && (
              <div className="absolute top-1/2 right-8 -translate-y-1/2">
                <LoaderIcon variant="outline" />
              </div>
            )}
            {hasError && (
              <ErrorMessage
                name={fieldName}
                component="p"
                className={twMerge(
                  errorStylesBase,
                  "absolute top-[10px] right-[32px] md:right-[50px] text-right"
                )}
              />
            )}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <JournalInputDecoration />
            </div>
          </div>
        </>
      )}

      {(variant === "white" || variant === "gradient") && (
        <>
          {labelText ? (
            <div className={twMerge("relative w-full", fieldClassName)}>
              {variant === "gradient" && (
                <div
                  className="absolute z-0 inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 38.94%, rgba(255, 255, 255, 0.2) 62.98%, rgba(255, 255, 255, 0.7) 91.83%)",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              )}
              <div
                className={twMerge(
                  "relative z-10 w-full h-full flex flex-col justify-center gap-[5px] bg-transparent",
                  variant === "white"
                    ? hasError
                      ? "border-2 border-white/60"
                      : "border-2 border-white"
                    : ""
                )}
              >
                <p className="text-[10px] lg:text-[12px] leading-[120%] text-white/60">
                  {labelText}
                </p>
                <Field
                  as={as}
                  mask={mask}
                  placeholder={placeholder}
                  name={fieldName}
                  type={inputType}
                  autoComplete="on"
                  onChange={onChange || handleChange}
                  onFocus={onFocus}
                  className="w-full bg-transparent outline-none border-none text-[14px] lg:text-[16px] leading-none text-white"
                />
                {isLoading && (
                  <div className="absolute top-1/2 right-8 -translate-y-1/2">
                    <LoaderIcon variant="outline" />
                  </div>
                )}
                {hasError && (
                  <ErrorMessage
                    name={fieldName}
                    component="p"
                    className={twMerge(
                      errorStylesBase,
                      "absolute top-[6px] right-[10px] text-right"
                    )}
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full">
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
                    hasError ? "border-white/60" : "border-white"
                  )}
                />
                {isLoading && (
                  <div className="absolute top-1/2 right-8 -translate-y-1/2">
                    <LoaderIcon variant="outline" />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* For labeled variants we render the error inside the field; for unlabeled ones use the default below-field position */}
      {variant !== "fancy" && !labelText && hasError && (
        <ErrorMessage
          name={fieldName}
          component="p"
          className={twMerge(errorStylesBase, "absolute bottom-[-11px] left-5")}
        />
      )}
    </label>
  );
}
