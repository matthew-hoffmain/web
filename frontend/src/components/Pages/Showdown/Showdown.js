import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScreenBox from "./ScreenBox/ScreenBox";

export default function Showdown() {
    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                bgcolor: 'white',
                alignItems: 'center',
            }}
        >
            <Container
                maxWidth="md"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 4, bgcolor: 'white' }}
            >
                <Typography
                    align="justify"
                    variant="body1"
                    href="/"
                    sx={{
                        fontFamily: 'monospace',
                    }}>
                    This page is to showcase a popular subject in Intellectual Property, which is fan projects.
                    The code I use here is a fan-recreation of the game mechanics from the popular game series "Pokemon". The art is directly taken from the game files.
                    Nintendo is historically very protective of their IPs, however these applications have become an exception.
                </Typography>
            </Container>
            <ScreenBox width={800} height={800 * 2 / 3} />
        </Container>
    );
}