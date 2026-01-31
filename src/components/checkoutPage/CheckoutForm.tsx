"use client";

import { Form, Formik, FormikHelpers } from "formik";
import axios from "axios";
import { useState } from "react";
import CustomizedInput from "../shared/customizedInput/CustomizedInput";
import MainButton from "../shared/buttons/MainButton";
import { CheckoutValidation } from "@/schemas/CheckoutValidation";
import Link from "next/link";

interface CheckoutValues {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  postalCode: string;
  city: string;
  email: string;
  phone?: string;
}

const initialValues: CheckoutValues = {
  country: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  postalCode: "",
  city: "",
  email: "",
  phone: "",
};

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = CheckoutValidation();

  const handleSubmit = async (
    values: CheckoutValues,
    { resetForm }: FormikHelpers<CheckoutValues>
  ) => {
    const rawPhone = values.phone?.trim() ?? "";
    const phoneDigits = rawPhone.replace(/\D/g, "");
    const phone = phoneDigits ? `+${phoneDigits}` : "";

    const data = {
      ...values,
      email: values.email.trim(),
      phone,
    };

    try {
      setIsLoading(true);
      // Placeholder API similar to journal form; replace with real endpoint later
      await axios({
        method: "post",
        url: "/api/submit-checkout",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
    } catch (error) {
      console.error("Checkout submit failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[650px] mx-auto md:mx-0 md:flex-1">
      <p className="text-[16px] lg:text-[18px] leading-[120%] mb-5">Checkout</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, dirty, isValid, submitCount, setFieldValue }) => {
          const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            const digits = raw.replace(/\D/g, "");
            const withPlus = digits ? `+${digits}` : "";
            const normalized = withPlus.slice(0, 14);
            setFieldValue("phone", normalized);
          };
          return (
          <Form className="flex flex-col">
            <div className="flex flex-col gap-[10px] lg:gap-4">
              <CustomizedInput
                fieldName="country"
                isRequired
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                variant="gradient"
                labelText="Country"
                fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
              />
              <div className="flex flex-col md:flex-row gap-[10px]">
                <CustomizedInput
                  fieldName="firstName"
                  isRequired
                  errors={errors}
                  touched={touched}
                  submitCount={submitCount}
                  variant="gradient"
                  labelText="Name"
                  fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
                />
                <CustomizedInput
                  fieldName="lastName"
                  isRequired
                  errors={errors}
                  touched={touched}
                  submitCount={submitCount}
                  variant="gradient"
                  labelText="Last name"
                  fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
                />
              </div>
              <CustomizedInput
                fieldName="address"
                labelText="Address"
                isRequired
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                variant="gradient"
                fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
              />
              <CustomizedInput
                fieldName="apartment"
                labelText="Apartment, suite, etc. (optional)"
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                variant="gradient"
                fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
              />
              <div className="flex flex-col md:flex-row gap-[10px]">
                <CustomizedInput
                  fieldName="postalCode"
                  labelText="Postal code"
                  isRequired
                  errors={errors}
                  touched={touched}
                  submitCount={submitCount}
                  variant="gradient"
                  fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
                />
                <CustomizedInput
                  fieldName="city"
                  labelText="City"
                  isRequired
                  errors={errors}
                  touched={touched}
                  submitCount={submitCount}
                  variant="gradient"
                  fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
                />
              </div>
              <CustomizedInput
                fieldName="email"
                labelText="Email"
                isRequired
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                variant="gradient"
                inputType="email"
                fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
              />
              <CustomizedInput
                fieldName="phone"
                labelText="Phone (optional)"
                errors={errors}
                touched={touched}
                submitCount={submitCount}
                variant="gradient"
                onChange={handlePhoneChange}
                fieldClassName="w-full h-[50px] px-[10px] lg:px-2 lg:h-[60px] text-[16px] lg:text-[18px] leading-[120%] bg-transparent"
              />
            </div>

            <p className="text-[10px] leading-[120%] lg:text-[13px] mt-[15px] lg:mt-5 mb-5 lg:mb-[54px]">
              By clicking &quot;Pay Now&quot; you confirm you agree to our{" "}
              <span className="underline hover:text-white/60 transition duration-300 ease-in-out">
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </span>{" "}
              and have read and understood our{" "}
              <span className="underline hover:text-white/60 transition duration-300 ease-in-out">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </span>
              .
            </p>

            <div className="mt-4">
              <MainButton
                type="submit"
                variant="white"
                isLoading={isLoading}
                disabled={!(dirty && isValid) || isLoading}
                className="w-full h-[45px] lg:h-[50px] text-[14px] lg:text-[18px] leading-none"
              >
                Continue to payment
              </MainButton>
            </div>
          </Form>
          );
        }}
      </Formik>
    </div>
  );
}
