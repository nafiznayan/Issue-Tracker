"use client";
// This is a client component because it uses Radix UI components that require client-side rendering.
import React from "react";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css"; // Import the CSS for SimpleMDE
import { useForm, Controller } from "react-hook-form"; // Importing useForm for form handling
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/component/ErrorMessage"; // Importing the ErrorMessage component
import Spinner from "@/app/component/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // Disable server-side rendering for this component
});

type IssueForm = z.infer<typeof createIssueSchema>; // Inferring the type from the Zod schema

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema), // Assuming you have a Zod schema for validation
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues"); // Redirect to the issues page after submission
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
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} /> // Using SimpleMDE for Markdown input
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
// Using Controller to integrate SimpleMDE with react-hook-form
export default NewIssuePage;
