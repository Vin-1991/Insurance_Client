import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import BarChart from '../charts/barchart';


export default function PolicyDashboard() {

    const [getBarChartData, setBarChartData] = useState([]);

    const getChartData = async () => {
        try {
            const response = await axios.get('/api/getBarChartData/', {
                params: { region: 'East' }
            });
            setBarChartData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getChartData();
    }, [])

    return (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
                <BarChart chartData={getBarChartData} />
            </Grid>
        </Fragment >
    );

}