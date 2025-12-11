import { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Button from "@/components/ui/Button";
import Image from "next/image";

const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});
export const metadata = {
  title: "Peer Interviewer | Home",
  description: "Give interview among peers",
};

export default function Home() {
  return (
    <div className="">
      <HomeBackGround>
        <HomeLeft />
        <HomeRight />
      </HomeBackGround>
    </div>
  );
}

// function HomeIntro() {
//   return (
//     <div className="">
//       <div>
//         <h1
//           className={`text-white text-8xl font-semibold ${montserratFont.className}`}
//         >
//           Peer Interviewer
//         </h1>
//         <p className="text-white text-xl">
//           find peers <MdKeyboardDoubleArrowRight className="inline" />
//           send request <MdKeyboardDoubleArrowRight className="inline" />
//           give interview
//         </p>
//       </div>
//     </div>
//   );
// }

// function HomeCard() {
//   return (
//     <div className="px-4 py-4 rounded-lg text-white grid grid-cols-2 bg-mysecondary shadow-xl gap-5">
//       <div className="col-span-1 flex items-center justify-center">
//         <p className="text-lg">
//           Preparing for your first interview can be challenging. Thats why
//           participating in mock interviews is highly recommended. Practicing
//           with peers who understand the interview process can provide valuable
//           insights and help simulate real interview conditions. Connect with
//           like-minded individuals and refine your skills—find your interview
//           partners here.
//         </p>
//       </div>
//       <div className="col-span-1 ">
//         <div className="rounded-lg overflow-hidden">
//           <img src="/images/int-img-1.webp" alt="img" />
//         </div>
//       </div>
//     </div>
//   );
// }

function HomeBackGround({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full bg-white flex items-center justify-between gap-2 md:flex-row flex-col ">
      {/* <div className="relative h-full w-full bg-white"> */}
      <div>
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1.5px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      {children}
      {/* </div> */}
    </div>
  );
}

function HomeLeft() {
  return (
    <div className="flex gap-4 flex-col items-start">
      <div
        className={`text-6xl text-gray-800 font-bold ${montserratFont.className} animate-bounce-twice`}
      >
        <p>Peer</p>
        <p>Interviewer</p>
      </div>
      <p className="text-xl">
        find peers <MdKeyboardDoubleArrowRight className="inline" />
        send request <MdKeyboardDoubleArrowRight className="inline" />
        give interview
      </p>
      <div className="flex w-full gap-2 items-center">
        <Button>Login</Button>
        <Button variant="secondary">Start Interview</Button>
      </div>
    </div>
  );
}

function HomeRight() {
  return (
    <div className="h-[500px] flex gap-2 p-4">
      <div className="flex items-end">
        <div className="w-[200px] h-[200px] relative overflow-hidden shadow-xl border-[1.5px] border-gray-500  rounded-md">
          <Image
            src={"/images/intv-2.png"}
            fill
            className=" object-cover"
            alt="show"
          ></Image>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[150px] h-[150px] relative overflow-hidden shadow-xl border-[1.5px] border-gray-500  rounded-md">
          <Image
            src={"/images/intv-3.png"}
            fill
            className=" object-fill"
            alt="show"
          ></Image>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-[300px] h-[300px] relative overflow-hidden shadow-2xl border-[1.5px] border-gray-500 rounded-md">
          <Image
            src={"/images/intv-4.png"}
            fill
            className=" object-cover"
            alt="show"
          ></Image>
        </div>
      </div>
    </div>
  );
}
