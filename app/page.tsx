import Hero from "@/components/UI/HeroBanner/hero";
import RecentListing from "@/components/UI/RecentListing/recentListing";


export default function Home() {
  return (
    <main className=" max-w-screen  min-h-[100lvh]">
      <div className="pb-9 max-w-screen" >
        <Hero />
      </div>
      <RecentListing />
    </main>
  );
}
