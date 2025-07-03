import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";


export default function Message(props) {

    return (
        <Box component="section"
             sx={{ my: 2, bgcolor: '#888888', display: 'block' , padding: '1rem', borderRadius:"1rem", width: '75%'}}>
            <Typography sx={{
                color: 'white',
                fontFamily: 'monospace',}}>
                {props.content}
            </Typography>
        </Box>
    );
}