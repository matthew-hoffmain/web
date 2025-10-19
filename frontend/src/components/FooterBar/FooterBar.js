import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import PropTypes from 'prop-types';

export default function FooterBar({ onOpenCookieModal }) {

    return (
        <Box sx={{ mt: 'auto', mb: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
                <Link
                    to="/terms-of-use"
                    style={{
                        color: '#666',
                        textDecoration: 'none',
                        fontSize: '0.875rem'
                    }}
                    onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >
                    Terms of Use
                </Link>
                {'   |   '}
                <span
                    role="button"
                    tabIndex={0}
                    style={{
                        color: '#666',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        outline: 'none',
                    }}
                    onClick={onOpenCookieModal}
                    onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') onOpenCookieModal(); }}
                    onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >
                    Cookie Settings
                </span>
                {'   |   '}
                <Link
                    to="/faq"
                    style={{
                        color: '#666',
                        textDecoration: 'none',
                        fontSize: '0.875rem'
                    }}
                    onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >
                    Frequently Asked Questions
                </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
                Hoffmain &copy; {new Date().getFullYear()} - Built with React, Material-UI, Flask, and PostgreSQL
            </Typography>
        </Box>
    );
}

FooterBar.propTypes = {
    onOpenCookieModal: PropTypes.func,
};
