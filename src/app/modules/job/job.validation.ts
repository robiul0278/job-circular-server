import { z } from 'zod';

export const jobValidationSchema = z.object({
  body: z.object({
    slug: z.string().optional(),
    title: z.string().min(1, "পদের শিরোনাম আবশ্যক!"),
    companyName: z.string().min(1, "প্রতিষ্ঠানের নাম আবশ্যক!"),
    banner: z.string().url({ message: " সঠিক ছবি প্রদান করুন!" }),
    images: z.array(z.string().url({ message: "সঠিক ছবি প্রদান করুন!" })),
    vacancy: z.coerce.number().min(1, "শূন্যপদের সংখ্যা আবশ্যক!"),
    websiteLink: z.string().url("আবেদন লিঙ্কটি সঠিক URL হতে হবে!"),
    published: z.string({
      required_error: "প্রকাশের তারিখ আবশ্যক!",
    }).min(1, "প্রকাশের তারিখ আবশ্যক!"),

    applyStart: z.string({
      required_error: "আবেদনের শুরুর তারিখ আবশ্যক!",
    }).min(1, "আবেদনের শুরুর তারিখ আবশ্যক!"),

    deadline: z.string({
      required_error: "আবেদনের শেষ তারিখ আবশ্যক!",
    }).min(1, "আবেদনের শেষ তারিখ আবশ্যক!"),

    categories: z.enum(["government", "private", "autonomous"], {
      required_error: "একটি ক্যাটাগরি নির্বাচন করুন!"
    }),
    technology: z
      .array(z.string().min(1))
      .min(1, "অন্তত একটি প্রযুক্তি উল্লেখ করতে হবে!"),
    description: z.string().min(10, "চাকরির বিবরণ খুব ছোট হয়েছে!"),
  })
});
