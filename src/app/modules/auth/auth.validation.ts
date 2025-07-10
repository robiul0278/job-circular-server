import { z } from 'zod';

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "নাম দেওয়া আবশ্যক!" }),
    password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!" }),
    email: z.string().email({ message: "সঠিক ইমেইল দিন!" }),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!" }),
    email: z.string().email({ message: "সঠিক ইমেইল দিন!" }),
    photoURL: z.string().url({ message: "ছবির জন্য একটি সঠিক লিংক দিন" }).optional(),
    role: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "ভূমিকা অবশ্যই 'user' অথবা 'admin' হতে হবে" }),
    }).default("user"),
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
    email: z.string({
      required_error: 'User email is required!',
    })
  })
})

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User email is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    })
  })
})

// Define the validation schema for the role
export const roleValidationSchema = z.object({
    body: z.object({
        role: z.enum(["user", "admin"]).default("user")
    })
});