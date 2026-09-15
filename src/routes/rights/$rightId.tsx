import { createFileRoute, notFound } from "@tanstack/react-router";

import { RightDetail } from "@/components/RightDetail";
import { getRight } from "@/data/rights";

export const Route = createFileRoute("/rights/$rightId")({
  loader: ({ params }) => {
    const right = getRight(params.rightId);
    if (!right) throw notFound();
    return { right };
  },
  head: ({ loaderData }) => {
    const right = loaderData?.right;
    const title = right ? `${right.question} | STUDENT iN` : "זכות | STUDENT iN";
    const description = right?.shortAnswer ?? "זכויות סטודנטים ברמב\"ם";
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: RightPage,
});

function RightPage() {
  const { right } = Route.useLoaderData();
  return <RightDetail right={right} />;
}
