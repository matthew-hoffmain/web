import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ContentBox(props) {

    return (
        <Box sx={props.sx}>
            {props.text}
        </Box>
    )
}