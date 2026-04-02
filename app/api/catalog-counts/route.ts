import { NextResponse } from "next/server";
import { getCatalogCounts } from "../../lib/catalogCounts";

export async function GET() {
  const counts = await getCatalogCounts();
  return NextResponse.json(counts);
}

