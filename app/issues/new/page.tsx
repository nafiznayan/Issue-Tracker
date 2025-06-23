"use client";
// This is a client component because it uses Radix UI components that require client-side rendering.
import React from "react";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor"; // A Markdown editor component
import "easymde/dist/easymde.min.css"; // Import the CSS for SimpleMDE
import { useForm, Controller } from "react-hook-form"; // Importing useForm for form handling
import axios from "axios";
import { useRouter } from "next/navigation";
import { set } from "zod";
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
  const [error, setError] = React.useState("");
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} /> // Using SimpleMDE for Markdown input
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};
// Using Controller to integrate SimpleMDE with react-hook-form
export default NewIssuePage;
