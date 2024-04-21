import Hero from "@/components/UI/HeroBanner/hero";
import InfoBox from "@/components/UI/InfoBox/infobox";
import InfoUI from "@/components/UI/InfoUI/infoui";
import RecentListing from "@/components/UI/RecentListing/recentListing";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" max-w-screen  min-h-[100lvh]">
      <div className="bg-blue-600 pb-9 max-w-screen relative">
        <Hero />
      </div>
      <InfoUI />

      <RecentListing />
    </main>
  );
}
