import Image from "next/image";

export default function Home() {
  return (
    <div>


        <div className="w-screen h-screen relative overflow-hidden">
            {/* Diagonal Split */}
            <div className="absolute inset-0" style={{clipPath: "polygon(0 0, 70% 0, 45% 100%, 0 100%)"}}>
                <Image
                    src="/jahesh.jpg"
                    alt="Larger Portion Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="absolute inset-0" style={{clipPath: "polygon(70% 0, 100% 0, 100% 100%, 45% 100%)"}}>
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
