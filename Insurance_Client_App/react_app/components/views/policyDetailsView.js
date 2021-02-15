import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PolicyDetailsDataTable from "../datatables/policyDetailsDatatable";


export default function PolicyDetails() {
    return (
        /*Policy datatable component*/
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
                <PolicyDetailsDataTable />
            </Grid>
        </Fragment >
    );
}