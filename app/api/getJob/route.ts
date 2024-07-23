import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });
    return NextResponse.json({ job });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching job" }, { status: 500 });
  }
}
