import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'rgba(234, 234, 234, 0.2)',
        color: '#6D2077',
    },
}));

export default function BusyIndicator() {

    const classes = useStyles();
    const { promiseInProgress } = usePromiseTracker();

    return (
        /*Busy Indicator*/
        promiseInProgress && (
            <Backdrop className={classes.backdrop} open={promiseInProgress}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    );
}