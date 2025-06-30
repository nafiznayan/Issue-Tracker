"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import type { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue;
}

export default function EditIssueClient({ issue }: Props) {
  return <IssueForm issue={issue} />;
}
