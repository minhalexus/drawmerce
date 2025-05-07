import React, {MouseEventHandler, useState} from "react";
import { Image } from "@chakra-ui/react";

interface FrameBackwardSlashProps {
    displacement: number;
    setDisplacement: (displacement: number) => void;
}

export default function FrameBackwardSlash({ displacement, setDisplacement }: FrameBackwardSlashProps) {
    const diagonalClipPaths = {
        firstDiv: `polygon(${100 - displacement}% 0, 100% 0, 100% 100%, ${115 - displacement}% 100%)`,
        blackLineDiv: `polygon(${100 - displacement}% 0, ${99.5 - displacement}% 0, ${114.5 - displacement}% 100%, ${115 - displacement}% 100%)`,
        secondDiv: `polygon(0 0, ${100 - displacement}% 0, ${115 - displacement}% 100%, 0 100%)`,
    };

    const handleSliderChange = (event: MouseEventHandler<HTMLDivElement>) => {
        const onMouseMove = (moveEvent: MouseEvent) => {
            const maxDisplacement = 113;
            const minDisplacement = 7;

            const newDisplacement = Math.min(
                Math.max(((window.innerWidth - moveEvent.clientX) / window.innerWidth) * 100, minDisplacement),
                maxDisplacement
            );
            setDisplacement(newDisplacement);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    return (
        <div>
            <div className="w-[85vw] h-[85vh] relative border-[1.7rem] border-black overflow-hidden">
                {/* Diagonal Split */}
                <div className="absolute inset-0 select-none"
                     style={{clipPath: diagonalClipPaths.firstDiv}}>
                    <div className="relative w-full h-full select-none">
                        <Image
                            src="/minhal.jpg"
                            alt="Smaller Portion Image"
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                            className="blur-md select-none"
                        />
                        <Image
                            src="/minhal.jpg"
                            alt="Smaller Portion Image"
                            layout="fill"
                            objectFit="contain"
                            draggable={false}
                            className="absolute inset-0 translate-x-[28%]"
                        />
                    </div>
                </div>

                {/* Black Line Along Polygon Edge */}

                <div
                    className="absolute bg-black cursor-ew-resize"
                    style={{
                        clipPath: diagonalClipPaths.blackLineDiv,
                        width: "100%",
                        height: "80vh",
                        zIndex: 1
                    }}

                    // @ts-ignore
                    onMouseDown={ handleSliderChange }
                ></div>

                <div className="absolute inset-0 select-none"
                     style={{clipPath: diagonalClipPaths.secondDiv}}>

                    <div className="relative w-full h-full select-none">

                        <Image
                            src="/ogi.jpg"
                            alt="Larger Portion Image"
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                            className="blur-md select-none"
                        />
                        <Image
                            src="/ogi.jpg"
                            alt="Larger Portion Image"
                            layout="fill"
                            objectFit="contain"
                            draggable={false}
                            className="absolute inset-0 translate-x-[-30.5%] layout-[fill]"
                        />
                    </div>
                </div>
            </div>
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*   */}
            {/*</footer>*/}
        </div>
    );
}