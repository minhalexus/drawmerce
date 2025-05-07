import React, {useState} from 'react';
import FrameBackwardSlash from "@/components/Frames/FrameBackwardSlash";
import FrameForwardSlash from "@/components/Frames/FrameForwardSlash";
import FrameSingle from "@/components/Frames/FrameSingle";
import FrameCover from "@/components/Frames/FrameCover";
import Slider from '@mui/material/Slider';

interface ContainerProps {
    variant?: 'FrameForwardSlash' | 'FrameBackwardSlash' | 'FrameSingle' | 'FrameCover';
    media: string[];
}

const FrameContainer: React.FC<ContainerProps> = ({variant = 'FrameForwardSlash', media}) => {
    const [displacement, setDisplacement] = useState(65); // Slider displacement state

    let content;
    if (variant === 'FrameForwardSlash') {
        content = <FrameForwardSlash displacement={displacement} setDisplacement={setDisplacement} />;
    } else if (variant === 'FrameBackwardSlash') {
        content = <FrameBackwardSlash displacement={displacement} setDisplacement={setDisplacement} />;
    } else if (variant === 'FrameCover') {
        content = <FrameCover media={media}/>
    } else {
        content = <FrameSingle media={media}/>;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setDisplacement(newValue as number);
    };

    return (
        <section
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#f5f5f5', // Light shade of white
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            {content}
            {(variant === 'FrameForwardSlash' || variant === 'FrameBackwardSlash') && (
                <div style={{
                    width: '20rem',
                    paddingTop: '2.3rem'
                }}>
                    <Slider 
                        value={displacement}
                        onChange={handleChange}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        sx={{color: '#a0a4aa'}}
                    />
                </div>
            )}
        </section>
    );
};

export default FrameContainer;