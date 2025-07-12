import { Status } from "@prisma/client";
import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/component";
import IssueActions from "./IssueActions";

//Have to use Promise<{ status?: Status }> to ensure the searchParams are resolved correctly
interface Props {
  searchParams: Promise<{
    status: Status;
  }>;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined; // Ensure status is valid or undefined

  const issues = await prisma.issue.findMany({
    where: status ? { status } : {}, // filter only if status is passed
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export const dynamic = "force-dynamic"; // to ensure it's server-rendered every time
export default IssuesPage;
