import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Homepage() {
    return (
            <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 4, gap: 4 , bgcolor:'red'}}
            >
                Welcome home!
            </Container>
    );
}