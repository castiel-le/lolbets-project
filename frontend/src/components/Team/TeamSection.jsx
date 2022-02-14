import { Component } from "react";
import { Box, Typography, Grid } from "@mui/material";


/**
 * Component for displaying Team's information.
 */
export default class TeamSection extends Component {
    render() {
        const styleHeader = {backgroundColor: "#f4db96", fontWeight: "bold"};
        const styleLabel = {fontWeight: "bold"};
        const styleBody = {backgroundColor: "#f5f5f5"};
        return(
            <Box display="flex" flexDirection="column" style={styleBody}>
                <Typography variant="h5" noWrap style={styleHeader}>Cloud9</Typography>
                <img src="" alt="logo" width={400} height={400}/>
                <Typography variant="h5" noWrap style={styleHeader}>Team Information</Typography>
                <Grid container columnSpacing={1}>
                    <Grid item xs={6} justifyContent="flex-end" display="flex">
                        <Typography variant="p1" noWrap style={styleLabel}>Abbreviation:</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" display="flex">
                        <Typography variant="p1" noWrap align="left">C9</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-end" display="flex">
                        <Typography variant="p1" noWrap style={styleLabel}>Wins:</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" display="flex">
                        <Typography variant="p1" noWrap align="left">13</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-end" display="flex">
                        <Typography variant="p1" noWrap style={styleLabel}>Losses:</Typography>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-start" display="flex">
                        <Typography variant="p1" noWrap align="left">7</Typography>
                    </Grid>
                </Grid>
            </Box>
            // <Grid container display="flex">
            //     <Grid item xs={4} alignItems="center" justifyContent="center" display="flex">
            //             <Avatar sx={{ width: 150, height: 150 }}/>
            //         </Grid>
            //     <Grid item xs={8} border={1}>
            //             <Grid container spacing={1}>
            //                 <Grid item xs={3}>
            //                     <Typography variant="h5" align="right" noWrap>Name:</Typography>
            //                 </Grid>
            //                 <Grid item xs={8}>
            //                     <Typography variant="h5" align="left" noWrap style={styleDetail}>Cloud 9</Typography>
            //                 </Grid>
            //                 <Grid item xs={3}>
            //                     <Typography variant="h5" align="right" noWrap>Acronym:</Typography>
            //                 </Grid>
            //                 <Grid item xs={8}>
            //                     <Typography variant="h5" align="left" noWrap style={styleDetail}>C9</Typography>
            //                 </Grid>
            //                 <Grid item xs={3}>
            //                     <Typography variant="h5" align="right" noWrap>Wins:</Typography>
            //                 </Grid>
            //                 <Grid item xs={8}>
            //                     <Typography variant="h5" align="left" noWrap style={styleDetail}>20</Typography>
            //                 </Grid>
            //                 <Grid item xs={3}>
            //                     <Typography variant="h5" align="right" noWrap>Losses:</Typography>
            //                 </Grid>
            //                 <Grid item xs={8}>
            //                     <Typography variant="h5" align="left" noWrap style={styleDetail}>9</Typography>
            //                 </Grid>
            //             </Grid>
            //         </Grid>
            // </Grid> 
        );
    }
}