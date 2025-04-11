import React from 'react';
import FrameBackwardSlash from "@drawmerce/components/FrameBackwardSlash";
import FrameForwardSlash from "@drawmerce/components/FrameForwardSlash";
import FrameSingle from "@drawmerce/components/FrameSingle";
import FrameCover from "@drawmerce/components/FrameCover";

interface ContainerProps {
    variant?: 'FrameForwardSlash' | 'FrameBackwardSlash' | 'FrameSingle' | 'FrameCover';
    media: string[];
}

const FrameContainer: React.FC<ContainerProps> = ({variant = 'FrameForwardSlash', media}) => {
    let content;
    if (variant === 'FrameForwardSlash') {
        content = <FrameForwardSlash/>;
    } else if (variant === 'FrameBackwardSlash') {
        content = <FrameBackwardSlash/>;
    } else if (variant === 'FrameCover') {
        content = <FrameCover media={ media }/>
    } else {
        content = <FrameSingle media={ media }/>;
    }

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
            {content}
        </div>
    );
};

export default FrameContainer;