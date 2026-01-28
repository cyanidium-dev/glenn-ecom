import * as yup from "yup";

export const SubscribeValidation = () => {
  const subscribeFormValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  return subscribeFormValidationSchema;
};
