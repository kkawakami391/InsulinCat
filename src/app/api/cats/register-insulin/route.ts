import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma/db";
import { parseDate } from "@/app/lib/dayjs/parseDate";
import { InsulinInputs } from "@/app/models/InputType";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data: InsulinInputs = await req.json();
  const { gatinha, vaccinLocation, vaccinDate, usedSyringe, usedChuru } = data;
  if (typeof vaccinLocation !== "string") {
    return NextResponse.json({ error: "El tipo de input no es valido.", status: 400});
  }
  if (typeof vaccinDate !== "string") {
    return NextResponse.json({ error: "El tipo de input no es valido.", status: 400 });
  }
  if (!usedSyringe) {
    return NextResponse.json({
      error: "Es necesario ingresar la cantidad de jeringas!", status: 400
    });
  }
  if (usedSyringe < 1) {
    return NextResponse.json({
      error: "La cantidad de jeringas no puede ser menor a 1!", status: 400
    });
  }
  if (usedChuru && usedChuru < 0) {
    return NextResponse.json({
      error: "La cantidad de chuuru no puede ser negativo!", status: 400
    });
  }

  const catId = await prisma.cat.findFirst({
    where: { name: gatinha },
    select: { id: true },
  });
  if (!catId) {
    return NextResponse.json({ error: "No se encontro el gato!", status: 404});
  }

  try {
    const parsedJsDate = parseDate(vaccinDate);
    await prisma.insulin.create({
      data: {
        vaccineLocation: vaccinLocation,
        vaccinedAt: parsedJsDate,
        syringeNum: usedSyringe,
        chuuruNum: usedChuru,
        cat: { connect: { id: catId.id}}
      },
    });
    return NextResponse.json({ success: "Vacuna registrada con exito!", status: 200});
  } catch (error) {
    console.error("Error al registrar los datos", error);
    return NextResponse.json({ error: "Database query failed", status: 500});
  }
}
