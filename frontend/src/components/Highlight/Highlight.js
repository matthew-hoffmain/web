import Box from "@mui/material/Box";
import {Link} from "react-router";

export default function Highlight({ children, highlightLink }) {
    return (
            <Box
                sx={{
                    flex: 1,
                    minWidth: { xs: '100%', sm: '300px', md: '250px' },
                    bgcolor: 'rgba(248, 249, 250, 0.7)',
                    borderRadius: 2,
                    border: '1px solid #e9ecef',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(2px)',
                    transition: 'all .3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: '#dee2e6',
                    },
                }}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        padding: '16px',
                        textAlign: 'justify',
                        boxSizing: 'border-box'
                    }}
                    to={highlightLink ? highlightLink : "/faq"}
                >
                    {children}
                </Link>
            </Box>
    );
}