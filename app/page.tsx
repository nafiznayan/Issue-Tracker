import Pagination from "./component/Pagination";

export default function Home() {
  return <Pagination itemCount={100} pageSize={10} currentPage={1} />;
}
