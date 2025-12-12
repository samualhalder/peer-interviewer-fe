import About from "@/components/About";
import HomeBg from "@/components/HomeBg";

export const metadata = {
  title: "Peer Interviewer | Home",
  description: "Give interview among peers",
};

export default function Home() {
  return (
    <div className="w-full">
      <HomeBg />
      <About />
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
