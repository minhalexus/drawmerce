import Image from "next/image";

export default function FrameSingle() {
    return (
        <div>
            <div className="w-[85vw] h-[85vh] relative border-[1.7rem] border-black overflow-hidden">
                {/* Diagonal Split */}
                <div className="relative w-full h-full select-none">
                    <Image
                        src="/babu.jpg"
                        alt="Larger Portion Image"
                        layout="fill"
                        objectFit="cover"
                        draggable={false}
                        className="blur-md select-none"
                    />
                    <Image
                        src="/babu.jpg"
                        alt="Larger Portion Image"
                        layout="fill"
                        objectFit="contain"
                        draggable={false}
                        className=""
                    />
                </div>
            </div>
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*   */}
            {/*</footer>*/}
        </div>
    );
}
