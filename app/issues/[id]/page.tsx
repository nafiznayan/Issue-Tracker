import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;
  const issueId = resolvedParams.id;

  // Validate that issueId is a valid number
  const parsedId = parseInt(issueId);
  if (isNaN(parsedId)) {
    return notFound();
  }

  const issue = await fetchUser(parsedId);

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const issueId = resolvedParams.id;

  // Validate that issueId is a valid number
  const parsedId = parseInt(issueId);
  if (isNaN(parsedId)) {
    return { title: "Issue Not Found" };
  }

  const issue = await fetchUser(parsedId);

  if (!issue) {
    return { title: "Issue Not Found" };
  }

  return {
    title: issue?.title,
    description: `Details of issue ${issue.id}`,
  };
}

export default IssueDetailPage;
