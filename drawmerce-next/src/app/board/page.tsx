"use client"
import React, {MouseEventHandler, useState} from "react";
import Image from "next/image";
import FrameForwardSlash from "@drawmerce/components/FrameForwardSlash";
import FrameBackwardSlash from "@drawmerce/components/FrameBackwardSlash";
import FrameContainer from "@drawmerce/components/FrameContainer";

export default function BoardPage() {
    return(
        <div className="overflow-x-hidden">
            <FrameContainer variant='FrameForwardSlash' />

            <FrameContainer variant='FrameBackwardSlash' />
        </div>
    )
}

