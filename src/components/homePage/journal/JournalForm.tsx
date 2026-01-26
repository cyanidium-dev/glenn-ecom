"use client";
import { Form, Formik, FormikHelpers } from "formik";
import axios from "axios";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SubscribeValidation } from "@/schemas/SubscribeValidation";
import MainButton from "@/components/shared/buttons/MainButton";
import CustomizedInput from "@/components/shared/customizedInput/CustomizedInput";
import SeparatorLine from "@/components/shared/icons/SeparatorLine";

interface ValuesSubscribeFormType {
  email: string;
}

interface JournalFormProps {
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
}

export default function JournalForm({
  isSuccess,
  setIsSuccess,
}: JournalFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const validationSchema = SubscribeValidation();

  const initialValues: ValuesSubscribeFormType = {
    email: "",
  };

  const submitForm = async (
    values: ValuesSubscribeFormType,
    formikHelpers: FormikHelpers<ValuesSubscribeFormType>
  ) => {
    const { resetForm } = formikHelpers;
    const data = {
      email: values.email.trim(),
    };
    try {
      setIsLoading(true);
      await axios({
        method: "post",
        url: "/api/submit-subscribe",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
      setIsSuccess(true);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative min-h-[107px] lg:min-h-[193px]">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Formik
              initialValues={initialValues}
              onSubmit={submitForm}
              validationSchema={validationSchema}
            >
              {({ errors, touched, dirty, isValid }) => (
                <Form className="flex flex-col items-center justify-center">
                  <CustomizedInput
                    fieldName="email"
                    placeholder="Email"
                    isRequired
                    errors={errors}
                    touched={touched}
                    variant="fancy"
                    fieldClassName="w-full h-[48px] px-[32px] md:px-[50px] max-w-[650px] lg:h-[88px] text-[16px] font-normal leading-none text-white"
                    labelClassName="mb-5 lg:mb-15 max-w-[650px]"
                  />
                  <MainButton
                    variant="outline"
                    disabled={!(dirty && isValid) || isLoading}
                    isLoading={isLoading}
                    type="submit"
                    className="w-[132px] lg:w-[180px] h-[39px] lg:h-[45px] text-[14px] lg:text-[18px] leading-none"
                  >
                    Join
                  </MainButton>
                </Form>
              )}
            </Formik>
          </motion.div>
        ) : (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center lg:px-[100px] px-[20px] h-[107px] lg:h-[193px]"
          >
            <p className="mb-[15px] text-center font-roboto text-[22px] leading-[120%] tracking-[0.01em] uppercase">
              THANK YOU FOR Subscribing!
            </p>
            <SeparatorLine width="100%" height={2} className="-my-px" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
