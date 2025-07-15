import { Issue, Status } from "@prisma/client";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "@/app/component";
import IssueActions from "./IssueActions";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/component/Pagination";

//Have to use Promise<{ status?: Status }> to ensure the searchParams are resolved correctly
interface Props {
  searchParams: Promise<{
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }>;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined; // Ensure status is valid or undefined

  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const orderBY = columns
    .map((column) => column.value)
    .includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(resolvedSearchParams.page) || 1; // Default to page 1 if not provided
  const pageSize = 10; // Define page size
  const skip = (page - 1) * pageSize; // Calculate skip for pagination
  const issues = await prisma.issue.findMany({
    where: status ? { status } : {}, // filter only if status is passed
    orderBy: orderBY,
    skip,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where: status ? { status } : {}, // count only if status is passed
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...resolvedSearchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === resolvedSearchParams.orderBy && (
                  <ArrowUpIcon className="inline-flex" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic"; // to ensure it's server-rendered every time
export default IssuesPage;
