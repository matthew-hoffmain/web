import { useRef, useState } from 'react';
import Box from "@mui/material/Box";


export default function ScreenBox(props) {
    const x = 1

    const topRightRef = useRef(null);
    const bottomLeftRef = useRef(null);

    const [topRightSize, setTopRightSize] = useState({ width: 0, height: 0 });
    const [bottomLeftSize, setBottomLeftSize] = useState({ width: 0, height: 0 });

    const handleTopRightLoad = () => {
        const img = topRightRef.current;
        if (img) {
            setTopRightSize({
                width: img.naturalWidth * 2,
                height: img.naturalHeight * 2,
            });
        }
    };

    const handleBottomLeftLoad = () => {
        const img = bottomLeftRef.current;
        if (img) {
            setBottomLeftSize({
                width: img.naturalWidth * 2.5,
                height: img.naturalHeight * 2.5,
            });
        }
    };



    return (
        <>
            <Box sx={{ width: props.width, height: props.height, bgcolor: 'green', position: 'relative' }}>
                {/* Background Image */}
                <img
                    src="https://forums.pokemmo.com/uploads/monthly_2025_01/RDT_20250109_0835187212760689019158779.jpg.50be093a3c45a569bdc7509daefb2ced.jpg"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />


                {/* Top-right image (doubled size) */}
                <img
                    ref={topRightRef}
                    onLoad={handleTopRightLoad}
                    src="https://play.pokemonshowdown.com/sprites/gen5ani/gengar.gif" // replace with real image
                    style={{
                        position: 'absolute',
                        top: 160,
                        right: 180,
                        width: topRightSize.width,
                        height: 'auto',
                    }}
                />

                {/* Bottom-left image (doubled size) */}
                <img
                    ref={bottomLeftRef}
                    onLoad={handleBottomLeftLoad}
                    src="https://play.pokemonshowdown.com/sprites/gen5ani-back/nidorino.gif" // replace with real image
                    style={{
                        position: 'absolute',
                        bottom: 100,
                        left: 100,
                        width: bottomLeftSize.width,
                        height: 'auto',
                    }}
                />
            </Box>
        </>
    );
}