import { z } from 'zod';

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { message: "নাম দেওয়া আবশ্যক!" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "ইমেইল দিন!" })
      .email({ message: "সঠিক ইমেইল দিন!" })
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .trim()
      .min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "ইমেইল দিন!" })
      .email({ message: "সঠিক ইমেইল দিন!" })
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const forgotPasswordValidationSchema = z.object({
  body: z.object({
        email: z
      .string()
      .trim()
      .min(1, { message: "ইমেইল দিন!" })
      .email({ message: "সঠিক ইমেইল দিন!" })
  })
})

export const resetPasswordValidationSchema = z
  .object({
    body: z.object({
    newPassword: z
      .string()
      .trim()
      .min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!" }),
    }),
  })
// confirmPassword field এ error দেখাবে

// Define the validation schema for the role
export const roleValidationSchema = z.object({
  body: z.object({
    role: z.enum(["user", "admin"]).default("user")
  })
});