import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

function App() {
    return (
        <Grid container spacing={5}>
            <Grid xs={12} sm={6} md={4} lg={3}>1</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>2</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>3</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>4</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>5</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>6</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>7</Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>8</Grid>
        </Grid>
    );
}

export default App;
