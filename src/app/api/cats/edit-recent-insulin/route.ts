import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma/db";
import { RecentInsulinType } from "@/app/models/RecentInsulin";
import dayjs from "dayjs";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data: RecentInsulinType[] = await req.json();
  if (!data) {
    return NextResponse.json({
      error: "No hay datos para actualizar.",
      status: 400,
    });
  }

  // Check para validar el formato de la fecha
  const vaccineAtArray = data.map((insulin) => insulin.vaccinedAt);
  const expectedFormat = "YYYY/MM/DD hh:mm A";

  // Check por cada fecha ingresada por el usuario.
  for (const vaccinedAt of vaccineAtArray) {
    if (!dayjs(vaccinedAt, expectedFormat, true).isValid()) {
      return NextResponse.json({
        error: `El formato del dia de vacunacion es invalido: ${vaccinedAt}. El formato esperado es: ${expectedFormat}`,
        status: 400,
      });
    }
  }

  try {
    for (const insulin of data) {
      await prisma.insulin.update({
        where: {
          id: insulin.id,
        },
        data: {
          vaccineLocation: insulin.vaccineLocation,
          vaccinedAt: dayjs(insulin.vaccinedAt).toISOString(),
          chuuruNum: insulin.chuuruNum,
        },
      });
    }
    return NextResponse.json({
      success: "Datos de la insulina editada satisfactoriamente!",
      status: 200,
    });
  } catch (error) {
    console.error("Error updating insulin data:", error);
    return NextResponse.json({
      error: "Edit recent insulin data failed!",
      status: 500,
    });
  }
}
