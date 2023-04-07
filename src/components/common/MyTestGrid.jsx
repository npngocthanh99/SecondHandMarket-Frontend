import { Box, Grid, makeStyles } from '@material-ui/core';
import { Paper } from '@mui/material';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(10),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
function MyTestGrid() {

    const classes = useStyles();
    return (
        <Grid container justifyContent='space-around' alignItems='center'  >
            <Grid item xs={5} sm={5}  >
                <Box padding={100}>
                    <Paper className={classes.paper}>hello toi ten la diep the sangddddddddddddddddddddhello toi ten la diep the sangdddddddddddddddddddd</Paper>
                </Box>
            </Grid>
            <Grid item xs={6} sm={5}>
                <Paper>hello toi ten la diep the sang</Paper>
            </Grid>
        </Grid>
    )
}

export default MyTestGrid;