import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    useHistory
} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import PolicyRoundedIcon from '@material-ui/icons/PolicyRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import PolicyDetails from '../components/views/policyDetailsView';
import PolicyDashboard from '../components/views/policyDashboardView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop:'7vh'
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        width: '100% !important'
    }
}));

const App = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" >
                <Toolbar className={classes.toolbar} variant="dense">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Insurance Policy Portal
                    </Typography>
                    <IconButton color="inherit" onClick={() => window.location.href = '/insurance_client_home'}>
                        <PolicyRoundedIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => window.location.href = '/insurance_client_dashboard'}>
                        <DashboardRoundedIcon />
                    </IconButton>
                    <AccountCircleIcon />
                    <Typography component="h1" variant="h6" color="inherit">
                        Hello, User
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Router>
                            <Switch>
                                <Route exact path="/insurance_client_home" component={PolicyDetails} />
                                <Route exact path="/insurance_client_dashboard" component={PolicyDashboard} />
                            </Switch>
                        </Router>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default App;