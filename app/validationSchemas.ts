// import { z } from "zod";

// export const issueSchema = z.object({
//   title: z.string().min(1, "Title is required").max(255),
//   description: z.string().min(1, "Description is required").max(65535),
// });

// export const PatchIssueSchema = z.object({
//   title: z.string().min(1, "Title is required").max(255).optional(),
//   description: z
//     .string()
//     .min(1, "Description is required")
//     .max(65535)
//     .optional(),

//   assignedToUserId: z.string().min(1).max(255).nullable().optional(),
// });
// validationSchemas.ts
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"], {
    required_error: "Status is required",
  }),
});

export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z.string().min(1).max(255).nullable().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});
