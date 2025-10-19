import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tooltip, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHighlight } from '../../contexts/HighlightContext';

// Styled component for highlighted text
const HighlightedText = styled('span')(({ variant = 'generic' }) => ({
    backgroundColor:
        variant === 'professional' ? '#e3f2fd' : // Light blue
        variant === 'academic' ? '#ffebee' :     // Light red
        variant === 'personal' ? '#e8f5e8' :    // Light green
        '#fff3cd',                               // Yellow for generic
    color:
        variant === 'professional' ? '#1565c0' : // Dark blue
        variant === 'academic' ? '#c62828' :     // Dark red
        variant === 'personal' ? '#2e7d32' :    // Dark green
        '#856404',                               // Dark yellow for generic
    padding: '2px 0px',
    borderRadius: '3px',
    cursor: 'help',
    borderBottom: `1px dotted ${
        variant === 'professional' ? '#1565c0' :
        variant === 'academic' ? '#c62828' :
        variant === 'personal' ? '#2e7d32' :
        '#856404'
    }`,
    '&:hover': {
        backgroundColor:
            variant === 'professional' ? '#bbdefb' : // Darker blue
            variant === 'academic' ? '#ffcdd2' :     // Darker red
            variant === 'personal' ? '#c8e6c9' :    // Darker green
            '#ffeaa7',                               // Darker yellow for generic
    },
}));

// Component for rendering tooltip content (text, image, or both)
const TooltipContent = ({ content }) => {
    // Check if content contains image syntax: IMG:url or GIF:url
    const imageMatch = content.match(/^(IMG|GIF):(.+)$/);
    const textAndImageMatch = content.match(/^(.+?)\s*\|\s*(IMG|GIF):(.+)$/);

    if (imageMatch) {
        // Pure image tooltip
        const [, type, url] = imageMatch;
        return (
            <Box sx={{ textAlign: 'center', maxWidth: '300px' }}>
                <img
                    src={url}
                    alt={`${type} tooltip`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '4px'
                    }}
                />
            </Box>
        );
    } else if (textAndImageMatch) {
        // Text with image tooltip
        const [, text, type, url] = textAndImageMatch;
        return (
            <Box sx={{ textAlign: 'center', maxWidth: '300px' }}>
                <Typography sx={{
                    mb: 1,
                    fontSize: '0.875rem',
                    color: 'inherit'
                }}>
                    {text.trim()}
                </Typography>
                <img
                    src={url}
                    alt={`${type} tooltip`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '150px',
                        borderRadius: '4px'
                    }}
                />
            </Box>
        );
    } else {
        // Regular text tooltip
        return (
            <Typography sx={{
                fontSize: '0.875rem',
                maxWidth: '300px'
            }}>
                {content}
            </Typography>
        );
    }
};

// Function to process text content and convert tooltip syntax to components
const processTextWithTooltips = (text, highlightEnabled = true) => {
    if (typeof text !== 'string') return text;

    // If highlights are disabled, also disable tooltips and return plain text
    if (!highlightEnabled) {
        // Remove tooltip syntax and return just the word
        const tooltipRegex = /(\[\[([^:]+)::([^\]]+)]]|\{\{([^:]+)::([^}]+)}}|#\[([^:]+)::([^\]]+)]|@\[([^:]+)::([^\]]+)])/g;
        return text.replace(tooltipRegex, (match, fullMatch, genericWord, genericDef, profWord, profDef, acadWord, acadDef, persWord, persDef) => {
            // Return just the word without tooltip syntax
            return genericWord || profWord || acadWord || persWord || match;
        });
    }

    // Updated regex to match category-based syntax patterns:
    // [[word::definition]] - generic (yellow)
    // {{word::definition}} - professional (blue)
    // #[word::definition] - academic (red)
    // @[word::definition] - personal (green)
    const tooltipRegex = /(\[\[([^:]+)::([^\]]+)]]|\{\{([^:]+)::([^}]+)}}|#\[([^:]+)::([^\]]+)]|@\[([^:]+)::([^\]]+)])/g;

    if (!tooltipRegex.test(text)) {
        return text;
    }

    const parts = [];
    let lastIndex = 0;
    let match;

    // Reset regex for global matching
    tooltipRegex.lastIndex = 0;

    while ((match = tooltipRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        // Determine category based on syntax
        let word, definition, variant;

        if (match[0].startsWith('[[')) {
            // Generic - yellow
            word = match[2];
            definition = match[3];
            variant = 'generic';
        } else if (match[0].startsWith('{{')) {
            // Professional - blue
            word = match[4];
            definition = match[5];
            variant = 'professional';
        } else if (match[0].startsWith('#[')) {
            // Academic - red
            word = match[6];
            definition = match[7];
            variant = 'academic';
        } else if (match[0].startsWith('@[')) {
            // Personal - green
            word = match[8];
            definition = match[9];
            variant = 'personal';
        }

        // Add the tooltip component with highlighting (highlights are enabled at this point)
        parts.push(
            <Tooltip
                key={match.index}
                title={<TooltipContent content={definition} />}
                placement="top"
                arrow
                slotProps={{
                    tooltip: {
                        sx: {
                            bgcolor: '#333',
                            color: 'white',
                            fontSize: '0.875rem',
                            maxWidth: 'none', // Allow custom sizing in TooltipContent
                            '& .MuiTooltip-arrow': {
                                color: '#333',
                            },
                        },
                    },
                }}
            >
                <HighlightedText variant={variant}>{word}</HighlightedText>
            </Tooltip>
        );

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
};

// Custom renderer for text nodes that processes our tooltip syntax
const TextRenderer = ({ children }) => {
    const { highlightEnabled } = useHighlight();

    // Handle both string children and nested children
    if (typeof children === 'string') {
        return processTextWithTooltips(children, highlightEnabled);
    }

    // If children is an array, process each string element
    if (Array.isArray(children)) {
        return children.map((child, index) => {
            if (typeof child === 'string') {
                return <React.Fragment key={index}>{processTextWithTooltips(child, highlightEnabled)}</React.Fragment>;
            }
            return child;
        });
    }

    return children;
};

// Main component
export default function MarkdownWithTooltips({ children, align, variant, color, sx, component, ...props }) {
    // Extract Typography-specific props that should be inherited by child Typography components
    const typographyProps = {
        align,
        variant,
        color,
        sx,
        component
    };

    // Filter out undefined values
    const inheritedTypographyProps = Object.fromEntries(
        Object.entries(typographyProps).filter(([_, value]) => value !== undefined)
    );

    return (
        <ReactMarkdown
            skipHtml={false} // Allow HTML if needed
            breaks={true} // This enables line breaks for single newlines
            components={{
                // Override text rendering to process our tooltip syntax
                text: ({ children }) => <TextRenderer>{children}</TextRenderer>,
                // Override paragraph to apply text renderer and inherit typography props
                p: ({ node, children, ...mdProps }) => (
                    <Typography
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ margin: 0, ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                // Override other text containers as needed
                li: ({ node, children, ...mdProps }) => (
                    <li {...mdProps}>
                        <TextRenderer>{children}</TextRenderer>
                    </li>
                ),
                h1: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h1"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h2: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h2"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h3: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h3"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h4: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h4"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h5: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h5"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h6: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h6"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ whiteSpace: 'pre-wrap', ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                // Handle strong/bold text
                strong: ({ node, children, ...mdProps }) => (
                    <strong {...mdProps}>
                        <TextRenderer>{children}</TextRenderer>
                    </strong>
                ),
                // Handle em/italic text
                em: ({ node, children, ...mdProps }) => (
                    <em {...mdProps}>
                        <TextRenderer>{children}</TextRenderer>
                    </em>
                ),
            }}
            {...props}
        >
            {children}
        </ReactMarkdown>
    );
}
