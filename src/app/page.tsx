import Image from "next/image";
import InsulinForm from "./components/InsulinForm";

export default function Home() {
  return (
    <main>
      <h1>Welcome to GatitaInsulina</h1>
      <p>
        This is a simple app to track the insulin injections of a diabetic cat.
      </p>
      <Image
        width={700}
        height={500}
        style={{ borderRadius: "50px", marginBottom: "20px"}}
        src="/assets/gata_de_mierda.jpg"
        alt="gato de mier"
        priority={true}
      />
      <InsulinForm />
    </main>
  );
}
