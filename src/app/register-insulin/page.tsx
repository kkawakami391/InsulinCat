import Image from "next/image";
import InsulinForm from "../components/InsulinForm";
import { catNamesData } from "../models/RecentInsulin";

// Funcion para obtener los nombres de los gatos
async function getCatsNames() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cats/get_cats`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { catsNames }: catNamesData = await response.json();
  return catsNames;
}

export default async function RegisterInsulin() {
  const catsNames = await getCatsNames();

  return (
    <main>
      <h1>Welcome to GatitaInsulina</h1>
      <p>
        This is a simple app to track the insulin injections of a diabetic cat.
      </p>
      <Image
        width={700}
        height={500}
        style={{ borderRadius: "50px", marginBottom: "20px" }}
        src="/assets/gata_de_mierda.jpg"
        alt="gato de mier"
        priority={true}
      />
      <InsulinForm catsNames={catsNames} />
    </main>
  );
}
