import * as yup from "yup";

export const CheckoutValidation = () => {
  return yup.object().shape({
    country: yup
      .string()
      .trim()
      .matches(/^[\p{L}\s'-]+$/u, "Country name contains invalid characters")
      .min(2, "Country is too short")
      .required("Country is required"),
    firstName: yup
      .string()
      .trim()
      .matches(/^[\p{L}\s'-]+$/u, "First name contains invalid characters")
      .min(2, "First name is too short")
      .required("First name is required"),
    lastName: yup
      .string()
      .trim()
      .matches(/^[\p{L}\s'-]+$/u, "Last name contains invalid characters")
      .min(2, "Last name is too short")
      .required("Last name is required"),
    address: yup.string().required("Address is required"),
    apartment: yup.string().optional(),
    postalCode: yup
      .string()
      .trim()
      .matches(/^[A-Za-z0-9\s-]{3,10}$/, "Postal code format is invalid")
      .required("Postal code is required"),
    city: yup
      .string()
      .trim()
      .matches(/^[\p{L}\s'-]+$/u, "City name contains invalid characters")
      .min(2, "City is too short")
      .required("City is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^\+\d{7,13}$/, {
        message: "Phone must start with + and have 7–13 digits",
        excludeEmptyString: true,
      })
      .optional(),
  });
};

