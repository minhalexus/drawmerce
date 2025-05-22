import { Image } from "@chakra-ui/react";

interface FrameSingleProps {
    media: string[]
}

export default function FrameSingle({ media }: FrameSingleProps) {
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
                            className="select-none absolute inset-0 translate-x-[40%]"
                        />
                        {/* <img
                            src={media[0]}
                            alt="Larger Portion Image"
                            h="100%"
                            objectFit="contain"
                            draggable={false}
                            className=""
                            zIndex={5}
                        /> */}
                    </div>
                </div>
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*   */}
            {/*</footer>*/}
        </div>
    );
}
