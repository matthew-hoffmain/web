import React, { useState } from "react";
import Box from "@mui/material/Box";
import SuggestedResponseButton from "../../SuggestedResponseButton/SuggestedResponseButton";

export default function SuggestedResponses({ onSend }) {
    const initialSamples = ["How are you?", "Who are you?", "Where am I?", "Can you tell me about Matt?"];
    const [visibleSamples, setVisibleSamples] = useState(initialSamples);

    const handleSampleClick = (sample) => {
        // Send the message
        if (onSend) {
            onSend(sample);
        }
    };

    const handleAnimationComplete = (sample) => {
        // Remove the item after animation completes
        setVisibleSamples(prev => prev.filter(s => s !== sample));
    };

    return (
        <Box sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex'},
            gap: 1,
            flexWrap: 'wrap'
        }}>
            {visibleSamples.map((sample) => (
                <SuggestedResponseButton
                    key={sample}
                    message={sample}
                    variant="chat"
                    onClick={handleSampleClick}
                    onAnimationComplete={() => handleAnimationComplete(sample)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {sample}
                </SuggestedResponseButton>
            ))}
        </Box>
    );
}