import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from '../charts/lineChart';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        minWidth: 220,
    },
    title: {
        flexGrow: 1,
    },
    fixedHeight: {

    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    }
}));

export default function PolicyDashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [getTilesData, setTilesData] = useState([]);
    const [getLineChartData, setLineChartData] = useState([]);
    const [getCustomerRegionsData, setCustomerRegions] = useState([]);
    const [getSelectedCustomerRegions, setSelectedCustomerRegions] = useState('');


    const getCustomerRegions = async () => {
        try {
            const response = await axios.get('/api/getCustomerRegions/');
            setCustomerRegions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getKPIsTilesData = async () => {
        try {
            const response = await axios.get('/api/getKPITilesData/');
            setTilesData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getChartData = async (selectedRegion) => {
        try {
            const response = await axios.post('/api/getLineChartData/', {
                region: selectedRegion
            });
            setLineChartData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getKPIsTilesData();
        getCustomerRegions();
    }, [])

    useEffect(() => {
        getChartData(getSelectedCustomerRegions);
    }, [getSelectedCustomerRegions])


    return (
        <Fragment>
            {getTilesData.length > 0 && <Grid container spacing={1}>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#31b3e0,#1d97c2)', color: 'white' }}>
                        <Typography>Policies Bought - <strong> {getTilesData[0]?.TOTAL_POLICIES_BOUGHT}</strong> </Typography>
                        <div id="chartNewDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#60c483,#41af67)', color: 'white' }}>
                        <Typography>Top Region - <strong> {getTilesData[0]?.CUSTOMER_REGION}</strong> </Typography>
                        <div id="chartApprovedDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#f98483,#f75453)', color: 'white' }}>
                        <Typography>Top Month - <strong> {getTilesData[0]?.UNIQUE_MONTH}</strong></Typography>
                        <div id="chartClosedDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper} style={{ background: 'linear-gradient(45deg,#ffc721,#edb100)', color: 'white' }}>
                        <Typography>Top Vehicle Segment - <strong> {getTilesData[0]?.VEHICLE_SEGMENT}</strong></Typography>
                        <div id="chartTotalDiv" style={{ width: "100%", height: "25px" }}></div>
                    </Paper>
                </Grid>
            </Grid>}
            {getLineChartData.length > 0 && <Grid item xs={12} md={12} lg={12}>
                <FormControl className={classes.formControl} >
                    <InputLabel id="demo-simple-select-helper-label">Select Region</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={getSelectedCustomerRegions}
                        onChange={(event) => { setSelectedCustomerRegions(event.target.value); }}
                    >
                        {getCustomerRegionsData.map((option, index) => {
                            return <MenuItem key={option.MASTER_ID} value={option.CUSTOMER_REGION}>{option.CUSTOMER_REGION}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                <LineChart chartData={getLineChartData} />
            </Grid>}
        </Fragment >
    );

}