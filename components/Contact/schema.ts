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
    .oneOf(["sell", "buy"], "Please select an inquiry type")
    .required("Please select an inquiry type"),
  message: yup.string().trim().required("Message is required"),
  imageUrl: yup.string().url().nullable().optional(),
  consent: yup.boolean().oneOf([true], "You must accept the terms").required(),
})
