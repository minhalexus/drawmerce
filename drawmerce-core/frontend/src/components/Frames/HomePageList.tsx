import React from 'react';
import { Image } from "@chakra-ui/react";

interface HomePageListProps {
    // Define your component props here
}

const HomePageList: React.FC<HomePageListProps> = (props) => {
    return (
        <div>


            <div className="w-screen h-screen relative overflow-hidden">
                {/* Diagonal Split */}
                <div className="absolute inset-0 border-[0.7rem] border-black"
                     style={{clipPath: "polygon(0 0, 70% 0, 45% 100%, 0 100%)"}}>
                    <Image
                        src="/jahesh.jpg"
                        alt="Larger Portion Image"
                        objectFit="cover"
                    />
                </div>

                {/* Black Line Along Polygon Edge */}
                <div className="absolute bg-black"
                     style={{
                         clipPath: "polygon(70% 0, 70.5% 0, 45.5% 100%, 45% 100%)",
                         width: "100%",
                         height: '100vh',
                         zIndex: 4
                     }}>
                </div>

                <div className="absolute inset-0 border-[0.7rem] border-black"
                     style={{clipPath: "polygon(70% 0, 100% 0, 100% 100%, 45% 100%)"}}>
                    <Image
                        src="/stefan.jpg"
                        alt="Smaller Portion Image"
                        objectFit="cover"
                    />
                </div>
            </div>
            {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
            {/*   */}
            {/*</footer>*/}
        </div>
    );
};

export default HomePageList;