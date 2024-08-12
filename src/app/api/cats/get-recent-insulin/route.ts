import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/db";
import { dateToString } from "@/app/lib/dayjs/parseDate";

type RequestBodyType = {
  catName: string;
};

export async function POST(req: NextRequest) {
  // const data: RequestBodyType = await req.json();
  const { catName }: RequestBodyType = await req.json();
  try {
    const selectedCatId = await prisma.cat.findFirst({
      where: {
        name: catName,
      },
      select: {
        id: true,
      },
    });
    // Obtener los datos de las vacunas con el id del gato seleccionado
    if (selectedCatId) {
      const recentInsulinData = await prisma.insulin.findMany({
        where: {
          catId: selectedCatId.id,
        },
        select: {
          id: true,
          vaccineLocation: true,
          vaccinedAt: true,
          chuuruNum: true,
        },
        orderBy: {
          // Ordenar por fecha de vacunación de forma descendente
          vaccinedAt: "desc",
        },
        // Obtener solo 5 datos
        take: 5,
      });
      // TODO: Transformar los datos para que puedan utlizarse en el front. (vaccinedAt a string y chuuruNum a number)
      const recentInsulinDataFormatted = recentInsulinData.map((insulin) => {
        return {
          id: insulin.id,
          vaccineLocation: insulin.vaccineLocation,
          vaccinedAt: dateToString(insulin.vaccinedAt),
          chuuruNum: insulin.chuuruNum?.toNumber(),
        };
      });
      return NextResponse.json(recentInsulinDataFormatted, { status: 200 });
    } else {
      return NextResponse.json({ error: "Cat not found", status: 404 });
    }
  } catch (error) {
    console.error(error);
  }
}
