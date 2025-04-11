import Image from "next/image";

interface FrameCoverProps {
    media: string[]
}

export default function FrameCover({media}: FrameCoverProps) {
    return (
        <div>
            <div className="w-[85vw] h-[85vh] relative border-[1.7rem] border-black overflow-hidden">
                {/* Diagonal Split */}
                <div className="relative w-full h-full select-none">
                    <Image
                        src={media[0]}
                        alt="Larger Portion Image"
                        layout="fill"
                        objectFit="cover"
                        draggable={false}
                        className="blur-md select-none"
                    />
                    <Image
                        src={media[0]}
                        alt="Larger Portion Image"
                        layout="fill"
                        objectFit="contain"
                        draggable={false}
                        className=""
                    />
                    {/* Centered Heading */}
                    <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl italic font-bold">
                        Minhal's Muse
                    </h1>
                </div>
            </div>
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*   */}
            {/*</footer>*/}
        </div>
    );
}
