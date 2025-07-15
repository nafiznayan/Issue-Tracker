import Pagination from "./component/Pagination";

// interface Props {
//   searchParams: Promise<{
//     page: string;
//   }>;
// }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page) || 1; // Default to page 1 if not provided
  return <Pagination itemCount={100} pageSize={10} currentPage={page} />;
}
