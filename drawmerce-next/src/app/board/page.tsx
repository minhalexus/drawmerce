"use client"
import React, {MouseEventHandler, useState} from "react";
import Image from "next/image";
import FrameForwardSlash from "@drawmerce/components/FrameForwardSlash";
import FrameBackwardSlash from "@drawmerce/components/FrameBackwardSlash";
import FrameContainer from "@drawmerce/components/FrameContainer";
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/16/solid";

export default function BoardPage() {
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
                <button className="p-2 bg-gray-300 rounded-full hover:bg-gray-300 cursor-pointer">
                    <span className="h-5 w-5">
                        <ArrowUpIcon className="h-5 w-5"/>
                    </span>
                </button>
                <button className="p-2 bg-gray-300 rounded-full hover:bg-gray-300 cursor-pointer">
                    <span className="h-5 w-5">
                        <ArrowDownIcon className="h-5 w-5"/>
                    </span>
                </button>
            </div>
        </div>
    )
}

