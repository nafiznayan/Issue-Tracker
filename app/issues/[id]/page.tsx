import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/component/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

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
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssuedetailPage;
