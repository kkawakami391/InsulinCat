import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/db";

export async function GET() {
  let catsNames: string[] = [];
  try {
    const catNameRecords = await prisma.cat.findMany({
      select: {
        name: true,
      },
    });
    if (catNameRecords) {
      catNameRecords.forEach((cat) => {
        catsNames.push(cat.name);
      });
    }
  } catch (error) {
    console.error("Error al buscar la columna:", error);
    return NextResponse.json({ error: "Database query failed" });
  }
  return NextResponse.json({ catsNames });
}
