import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ScreenBox from "./ScreenBox/ScreenBox";

export default function Showdown() {
    return (
        <>
            <Container align="center">
                <ScreenBox width={800} height={800*2/3}/>
            </Container>
        </>
    );
}