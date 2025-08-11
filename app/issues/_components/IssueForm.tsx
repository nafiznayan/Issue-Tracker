"use client";
// This is a client component because it uses Radix UI components that require client-side rendering.
import ErrorMessage from "@/app/component/ErrorMessage"; // Importing the ErrorMessage component
import Spinner from "@/app/component/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css"; // Import the CSS for SimpleMDE
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form"; // Importing useForm for form handling
import SimpleMDE from "react-simplemde-editor"; // Importing SimpleMDE for Markdown input
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>; // Inferring the type from the Zod schema

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      status: issue?.status || "OPEN",
    },
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred while creating the issue.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {/* New Status Field */}
        <div className="flex items-center gap-5">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger placeholder="Select status" />
                <Select.Content>
                  <Select.Item value="OPEN">Open</Select.Item>
                  <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                  <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Content>
              </Select.Root>
            )}
          />

          <ErrorMessage>{errors.status?.message}</ErrorMessage>

          <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};
// Using Controller to integrate SimpleMDE with react-hook-form
export default IssueForm;
