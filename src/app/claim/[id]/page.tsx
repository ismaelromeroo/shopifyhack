import type { Metadata } from "next";
import { claimOrderFromId } from "@/lib/sim";
import { ClaimTicket } from "@/components/claim-ticket";

export const metadata: Metadata = {
  title: "Your order is riding on the Yankees — Covered",
};

export default async function ClaimPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = claimOrderFromId(id.slice(0, 24));
  return <ClaimTicket order={order} />;
}
