import Image from "next/image";

export default function Home() {
  return (
    <div>


        <div className="w-screen h-screen flex">
            {/* Larger Portion (2/3) */}
            <div className="w-2/3 h-full relative border-r">
                <Image
                    src="/jahesh.jpg"
                    alt="Larger Portion Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            {/* Smaller Portion (1/3) */}
            <div className="w-1/3 h-full relative">
                <Image
                    src="/stefan.jpg"
                    alt="Smaller Portion Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
      {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
      {/*   */}
      {/*</footer>*/}
    </div>
  );
}
