"use client";
// This is a client component because it uses Radix UI components that require client-side rendering.
import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor"; // A Markdown editor component
import "easymde/dist/easymde.min.css"; // Import the CSS for SimpleMDE
import { useForm, Controller } from "react-hook-form"; // Importing useForm for form handling
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        // Handle form submission
        await axios.post("/api/issues", data);
        router.push("/issues"); // Redirect to the issues page after submission
      })}
    >
      <TextField.Root
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} /> // Using SimpleMDE for Markdown input
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};
// Using Controller to integrate SimpleMDE with react-hook-form
export default NewIssuePage;
