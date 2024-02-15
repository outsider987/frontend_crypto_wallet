import Image from "next/image";
import MetamaskConnect from "@/app/components/MetamaskConnect";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <MetamaskConnect />
    </main>
  );
}
