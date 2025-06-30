import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import EditIssueClient from "./EditIssueClient";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const issueId = (await params).id;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });
  if (!issue) return notFound(); // If the issue is not found, return a 404 page
  return <EditIssueClient issue={issue} />;
};

export default EditIssuePage;
