import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from '../charts/lineChart';


const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 220,
    }
}));

export default function PolicyDashboard() {
    const classes = useStyles();

    const [getBarChartData, setBarChartData] = useState([]);
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

    const getChartData = async (selectedRegion) => {
        try {
            const response = await axios.post('/api/getBarChartData/', {
                region: selectedRegion
            });
            setBarChartData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCustomerRegions();
    }, [])

    useEffect(() => {
        getChartData(getSelectedCustomerRegions);
    }, [getSelectedCustomerRegions])


    return (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
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
                {getBarChartData.length > 0 && <LineChart chartData={getBarChartData} />}
            </Grid>
        </Fragment >
    );

}