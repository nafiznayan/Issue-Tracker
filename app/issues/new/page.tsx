"use client";
// This is a client component because it uses Radix UI components that require client-side rendering.
import React from "react";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor"; // A Markdown editor component
import "easymde/dist/easymde.min.css"; // Import the CSS for SimpleMDE
import { useForm, Controller } from "react-hook-form"; // Importing useForm for form handling
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchemas";

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
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues"); // Redirect to the issues page after submission
          } catch (error) {
            setError("An unexpected error occurred while creating the issue.");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="div">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} /> // Using SimpleMDE for Markdown input
          )}
        />
        {errors.description && (
          <Text color="red" as="div">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};
// Using Controller to integrate SimpleMDE with react-hook-form
export default NewIssuePage;
