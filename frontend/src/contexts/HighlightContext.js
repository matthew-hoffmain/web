import React, { createContext, useContext, useState } from 'react';

// Create the context
const HighlightContext = createContext();

// Custom hook to use the context
export const useHighlight = () => {
    const context = useContext(HighlightContext);
    if (context === undefined) {
        throw new Error('useHighlight must be used within a HighlightProvider');
    }
    return context;
};

// Provider component
export const HighlightProvider = ({ children }) => {
    const [highlightEnabled, setHighlightEnabled] = useState(true);

    const toggleHighlight = () => {
        setHighlightEnabled(prev => !prev);
    };

    const value = {
        highlightEnabled,
        toggleHighlight,
        setHighlightEnabled
    };

    return (
        <HighlightContext.Provider value={value}>
            {children}
        </HighlightContext.Provider>
    );
};
