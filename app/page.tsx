import Hero from "@/components/UI/HeroBanner/hero";
import InfoBox from "@/components/UI/InfoBox/infobox";
import InfoUI from "@/components/UI/InfoUI/infoui";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" max-w-[110rem] mx-auto min-h-[100lvh]">
      <div className="bg-blue-600 pb-9">
        <Hero />
      </div>
      <InfoUI />

    </main>
  );
}
