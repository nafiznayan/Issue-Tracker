import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const issueId = (await params).id;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });
  if (!issue) return notFound(); // If the issue is not found, return a 404 page
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
