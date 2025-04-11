import React from 'react';
import FrameBackwardSlash from "@drawmerce/components/FrameBackwardSlash";
import FrameForwardSlash from "@drawmerce/components/FrameForwardSlash";
import FrameSingle from "@drawmerce/components/FrameSingle";

interface ContainerProps {
    variant?: 'FrameForwardSlash' | 'FrameBackwardSlash';
}

const FrameContainer: React.FC<ContainerProps> = ({variant = 'FrameForwardSlash'}) => {
    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#f5f5f5', // Light shade of white
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {variant === 'FrameForwardSlash' ? (
                <FrameForwardSlash/>
            ) : variant === 'FrameBackwardSlash' ? (
                <FrameBackwardSlash/>
            ) : (
                <FrameSingle/>
            )}
        </div>
    );
};

export default FrameContainer;