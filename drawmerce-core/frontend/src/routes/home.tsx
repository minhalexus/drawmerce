import {
    createFileRoute,
  } from "@tanstack/react-router"

import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/16/solid";
import FrameContainer from "@/components/Frames/FrameContainer";



export const Route = createFileRoute('/home')({
  loader: () => {
    return 'Hello World'
  },
  component: Home,
})




export default function Home() {
    return (
        <div className="overflow-x-hidden relative">
            <FrameContainer
                variant='FrameCover'
                media={["/cover.jpg"]}
            />
            <FrameContainer variant='FrameSingle' media={["/babu.jpg"]}/>
            <FrameContainer variant='FrameForwardSlash' media={["/cover.jpg"]}/>

            <FrameContainer variant='FrameBackwardSlash' media={["/cover.jpg"]}/>

            <div className="fixed top-1/2 right-10 flex flex-col items-center space-y-4 transform -translate-y-1/2">
                <button
                    onClick={() => {
                        const sections = document.querySelectorAll('section');
                        const currentScroll = window.scrollY;
                        const previousSection = Array.from(sections).reverse().find((section) => {
                            const rect = section.getBoundingClientRect();
                            return rect.top + window.scrollY < currentScroll;
                        });
                        if (previousSection) {
                            previousSection.scrollIntoView({behavior: 'smooth'});
                        }
                    }}
                    className="p-2 bg-[#a0a4aa] rounded-full hover:bg-gray-200 cursor-pointer"
                >
        <span className="h-5 w-5">
            <ArrowUpIcon className="h-5 w-5"/>
        </span>
                </button>
                <button
                    onClick={() => {
                        const sections = document.querySelectorAll('section');
                        const currentScroll = window.scrollY;
                        const nextSection = Array.from(sections).find((section) => {
                            const rect = section.getBoundingClientRect();
                            return rect.top + window.scrollY > currentScroll;
                        });
                        if (nextSection) {
                            nextSection.scrollIntoView({behavior: 'smooth'});
                        }
                    }}
                    className="p-2 bg-[#a0a4aa] rounded-full hover:bg-gray-200 cursor-pointer"
                >
                    <span className="h-5 w-5">
                        <ArrowDownIcon className="h-5 w-5"/>
                    </span>
                </button>
            </div>
        </div>
    )
}

