import Hero from "@/components/UI/HeroBanner/hero";
import InfoBox from "@/components/UI/InfoBox/infobox";
import InfoUI from "@/components/UI/InfoUI/infoui";
import RecentListing from "@/components/UI/RecentListing/recentListing";
import Image from "next/image";
import { cabin } from "@/public/assets";


// const Background = ({ children }: any) => {
//   return (
//     <div className="pb-9 max-w-screen relative xl:h-[60rem] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${cabin.src})` }}>
//       <div style={{ filter: 'brightness(90%)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
//         {children}
//       </div>
//     </div>
//   );
// };

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
