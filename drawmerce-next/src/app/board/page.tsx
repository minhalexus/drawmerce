"use client"
import React, {MouseEventHandler, useState} from "react";
import Image from "next/image";

export default function BoardPage() {
    const [displacement, setDisplacement] = useState(70); // Slider displacement state

    const diagonalClipPaths = {
        firstDiv: `polygon(0 0, ${displacement}% 0, ${displacement - 25}% 100%, 0 100%)`,
        blackLineDiv: `polygon(${displacement}% 0, ${displacement + 0.5}% 0, ${displacement - 24.5}% 100%, ${displacement - 25}% 100%)`,
        secondDiv: `polygon(${displacement}% 0, 100% 0, 100% 100%, ${displacement - 25}% 100%)`,
    };

    const handleSliderChange = (event: MouseEventHandler<HTMLDivElement>) => {
        const onMouseMove = (moveEvent: MouseEvent) => {
            const maxDisplacement = 113;
            const minDisplacement = 7;

            const newDisplacement = Math.min(
                Math.max((moveEvent.clientX / window.innerWidth) * 100, minDisplacement),
                maxDisplacement
            );
            setDisplacement(newDisplacement);
            console.log(newDisplacement);
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
            <div className="w-screen h-screen relative overflow-hidden">
                {/* Diagonal Split */}
                <div className="absolute inset-0 border-[0.7rem] border-black select-none"
                     style={{clipPath: diagonalClipPaths.firstDiv}}>
                    <Image
                        src="/jahesh.jpg"
                        alt="Larger Portion Image"
                        layout="fill"
                        objectFit="cover"
                        draggable={false}
                    />
                </div>

                {/* Black Line Along Polygon Edge */}

                <div
                    className="absolute bg-black cursor-ew-resize"
                    style={{
                        clipPath: diagonalClipPaths.blackLineDiv,
                        width: "100%",
                        height: "100vh",
                        zIndex: 4
                    }}

                    // @ts-ignore
                    onMouseDown={ handleSliderChange }
                ></div>

                <div className="absolute inset-0 border-[0.7rem] border-black select-none"
                     style={{clipPath: diagonalClipPaths.secondDiv}}>
                    <Image
                        src="/stefan.jpg"
                        alt="Smaller Portion Image"
                        layout="fill"
                        objectFit="cover"
                        draggable={false}
                    />
                </div>
            </div>
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*   */}
            {/*</footer>*/}
        </div>
    );
}

