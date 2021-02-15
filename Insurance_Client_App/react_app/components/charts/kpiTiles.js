import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    fixedHeight: {

    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));


export default function PolicyDashboardKPIs({ tilesData }) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Fragment>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#31b3e0,#1d97c2)', color: 'white' }}>
                        <Typography>Policies Bought - <strong> {tilesData[0]?.TOTAL_POLICIES_BOUGHT}</strong> </Typography>
                        <div id="chartNewDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#60c483,#41af67)', color: 'white' }}>
                        <Typography>Top Region - <strong> {tilesData[0]?.CUSTOMER_REGION}</strong> </Typography>
                        <div id="chartApprovedDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#f98483,#f75453)', color: 'white' }}>
                        <Typography>Top Month - <strong> {tilesData[0]?.UNIQUE_MONTH}</strong></Typography>
                        <div id="chartClosedDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#ffc721,#edb100)', color: 'white' }}>
                        <Typography>Top Vehicle Segment - <strong> {tilesData[0]?.VEHICLE_SEGMENT}</strong></Typography>
                        <div id="chartTotalDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment >
    );

}