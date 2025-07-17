import Pagination from "@/app/component/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQueryParams } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

//Have to use Promise<{ status?: Status }> to ensure the searchParams are resolved correctly
interface Props {
  searchParams: Promise<IssueQueryParams>;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined; // Ensure status is valid or undefined

  const orderBy = columnNames.includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(resolvedSearchParams.page) || 1; // Default to page 1 if not provided
  const pageSize = 10; // Define page size
  const skip = (page - 1) * pageSize; // Calculate skip for pagination
  const issues = await prisma.issue.findMany({
    where: status ? { status } : {}, // filter only if status is passed
    orderBy,
    skip,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: status ? { status } : {}, // count only if status is passed
  });
  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues.",
};

export const dynamic = "force-dynamic"; // to ensure it's server-rendered every time
export default IssuesPage;
