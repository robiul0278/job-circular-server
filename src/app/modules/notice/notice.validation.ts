import { z } from 'zod';

export const noticeValidationSchema = z.object({
    body: z.object({
        notice: z.string().min(1, "নোটিশ ফাঁকা রাখা যাবে না"),
    })
});
