import React, { useState } from "react";
import Button from "@mui/material/Button";
import {styled, keyframes} from "@mui/material";

// Define the bubble pop animation
const bubblePop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const StyledResponseButton = styled(Button)(({ isPopping, variant = 'chat' }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: variant === 'page' ? 14 : 16,
    padding: variant === 'page' ? '8px 16px' : '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderRadius: variant === 'page' ? '20px' : '4px',
    color: variant === 'page' ? '#0063cc' : 'white',
    backgroundColor: variant === 'page' ? 'transparent' : '#0063cc',
    borderColor: '#0063cc',
    transition: 'transform 0.2s ease',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: variant === 'page' ? 'rgba(0, 99, 204, 0.1)' : '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
        transform: 'scale(1.05)',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: variant === 'page' ? 'rgba(0, 99, 204, 0.2)' : '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
    ...(isPopping && {
        animation: `${bubblePop} 0.3s ease-out forwards`,
        pointerEvents: 'none',
    }),
}));

export default function SuggestedResponseButton({
    children,
    message,
    onClick,
    variant = 'chat',
    onAnimationComplete
}) {
    const [isPopping, setIsPopping] = useState(false);

    const handleClick = () => {
        // Start the pop animation
        setIsPopping(true);

        // Call the onClick handler immediately
        if (onClick) {
            onClick(message || children);
        }

        // Reset animation state after completion
        setTimeout(() => {
            setIsPopping(false);
            if (onAnimationComplete) {
                onAnimationComplete();
            }
        }, 300); // Match animation duration
    };

    return (
        <StyledResponseButton
            isPopping={isPopping}
            variant={variant}
            onClick={handleClick}
        >
            {children}
        </StyledResponseButton>
    );
}
