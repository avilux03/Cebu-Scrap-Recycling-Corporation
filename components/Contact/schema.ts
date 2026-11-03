import * as yup from "yup"

export const contactSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().trim()
    .matches(/^(?:\+63|0)?9\d{9}$/, "Phone number is invalid")
    .required("Phone number is required"),
  address: yup.string().trim().required("Address is required"),
  inquiryType: yup
    .string()
    .oneOf(["sell", "buy", "services", "others"], "Please select an inquiry type")
    .required("Please select an inquiry type"),
  message: yup.string().trim().required("Message is required"),

  // Only required when the user picks "Sell to you". For every other
  // inquiry type the value is stripped so it never reaches the server.
  minSellPrice: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue ?? "").trim() === "" ? undefined : value
    )
    .typeError("Enter a valid price")
    .when("inquiryType", {
      is: "sell",
      then: (schema) =>
        schema
          .required("Minimum sell price is required")
          .moreThan(0, "Price must be greater than 0"),
      otherwise: (schema) => schema.strip(),
    }),
  priceUnit: yup
    .string()
    .oneOf(["kg", "piece", "lot"], "Select a unit")
    .default("kg"),

  imageUrl: yup.string().url().nullable().optional(),
  consent: yup.boolean().oneOf([true], "You must accept the terms").required(),
})
