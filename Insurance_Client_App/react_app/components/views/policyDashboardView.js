import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { trackPromise } from 'react-promise-tracker';
import LineChart from '../charts/lineChart';
import PolicyDashboardKPIs from '../charts/kpiTiles';
import { getApiCall, postApiCall } from '../utils/axiosApis';


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

    const [getTilesData, setTilesData] = useState([]);
    const [getLineChartData, setLineChartData] = useState([]);
    const [getCustomerRegionsData, setCustomerRegions] = useState([]);
    const [getSelectedCustomerRegions, setSelectedCustomerRegions] = useState('');


    const getCustomerRegions = async () => {
        const response = await getApiCall('/api/getCustomerRegions/');
        setCustomerRegions(response);
    };

    const getKPIsTilesData = async () => {
        const response = await getApiCall('/api/getKPITilesData/');
        setTilesData(response);
    };

    const getChartData = async (selectedRegion) => {
        const response = await postApiCall('/api/getLineChartData/', {
            region: selectedRegion
        });
        setLineChartData(response);
    };

    useEffect(() => {
        getKPIsTilesData();
        getCustomerRegions();
    }, []);

    useEffect(() => {
        trackPromise(getChartData(getSelectedCustomerRegions));
    }, [getSelectedCustomerRegions]);

    return (
        <Fragment>
            {getTilesData.length > 0 && <PolicyDashboardKPIs tilesData={getTilesData} />}
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