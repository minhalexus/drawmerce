import { Image } from "@chakra-ui/react";

interface FrameCoverProps {
    media: string[]
}

export default function FrameCover({media}: FrameCoverProps) {
    return (
        <div>
            <div className="w-[85vw] h-[85vh] relative !border-[1.7rem] !border-black overflow-hidden rounded-md">
                {/* Diagonal Split */}
                <div className="relative w-full h-full select-none">
                    <Image src={media[0]}
                        alt="Larger Portion Image"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        draggable={false}
                        className="blur-md select-none">
                    </Image>
                    <Image
                        src={media[0]}
                        alt="Larger Portion Image"
                        h="100%"
                        draggable={false}
                        className="select-none absolute inset-0 translate-x-[42%]"
                    />
                    {/* Centered Heading */}
                    <h1 className="absolute inset-0 flex items-center justify-center text-white !text-4xl !italic !font-bold">
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
