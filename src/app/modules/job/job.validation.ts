import { z } from 'zod';

export const jobValidationSchema = z.object({
  body: z.object({
    slug: z.string().optional(),
    title: z.string().min(1, "পদের শিরোনাম আবশ্যক!"),
    companyName: z.string().min(1, "প্রতিষ্ঠানের নাম আবশ্যক!"),
    banner: z.string().url({ message: " সঠিক ছবি প্রদান করুন!" }),
    images: z
      .array(z.string().url({ message: "সঠিক ছবি প্রদান করুন!" }))
      .min(1, { message: "অন্তত একটি ছবি অবশ্যই দিতে হবে!" }),
    deadline: z.string({
      required_error: "আবেদনের শেষ তারিখ আবশ্যক!",
    }).min(1, "আবেদনের শেষ তারিখ আবশ্যক!"),

    categories: z.enum(["govt", "private",], {
      required_error: "একটি ক্যাটাগরি নির্বাচন করুন!"
    }),
    description: z.string().min(10, "চাকরির বিবরণ খুব ছোট হয়েছে!"),
  })
});
