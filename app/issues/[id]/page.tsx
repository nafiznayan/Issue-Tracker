import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ id: string }>;
}

const IssuedetailPage = async ({ params }: Props) => {
  const issueId = (await params).id;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });
  if (!issue) return notFound(); // If the issue is not found, return a 404 page

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssuedetailPage;
