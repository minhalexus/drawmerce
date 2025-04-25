import React, {MouseEventHandler, useState} from "react";
import Image from "next/image";

interface FrameForwardSlashProps {
    displacement: number;
    setDisplacement: (displacement: number) => void;
}

export default function FrameForwardSlash({ displacement, setDisplacement }: FrameForwardSlashProps) {

    const diagonalClipPaths = {
        firstDiv: `polygon(0 0, ${displacement}% 0, ${displacement - 15}% 100%, 0 100%)`,
        blackLineDiv: `polygon(${displacement}% 0, ${displacement + 0.5}% 0, ${displacement - 14.5}% 100%, ${displacement - 15}% 100%)`,
        secondDiv: `polygon(${displacement}% 0, 100% 0, 100% 100%, ${displacement - 15}% 100%)`,
    };

    const handleSliderChange = (event: MouseEventHandler<HTMLDivElement>) => {
        const onMouseMove = (moveEvent: MouseEvent) => {
            const maxDisplacement = 113;
            const minDisplacement = 7;

            const newDisplacement = Math.min(
                Math.max(((moveEvent.clientX + 290) / window.innerWidth) * 100, minDisplacement),
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
                            src="/jahesh.jpg"
                            alt="Larger Portion Image"
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                            className="blur-sm select-none"
                        />
                        <Image
                            src="/jahesh.jpg"
                            alt="Larger Portion Image"
                            layout="fill"
                            objectFit="contain"
                            draggable={false}
                            className="absolute inset-0 translate-x-[-31.8%]"
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
                            src="/stefan.jpg"
                            alt="Smaller Portion Image"
                            layout="fill"
                            objectFit="cover"
                            draggable={false}
                            className="blur-sm select-none"
                        />
                        <Image
                            src="/stefan.jpg"
                            alt="Smaller Portion Image"
                            layout="fill"
                            objectFit="contain"
                            draggable={false}
                            className="absolute inset-0 translate-x-[31%]"
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
