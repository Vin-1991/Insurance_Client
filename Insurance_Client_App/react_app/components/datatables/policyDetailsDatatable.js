import React, { useState, Fragment, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { PolicyDetailsColumns } from '../utils/dataTableColumns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    padBottom: {
        paddingBottom: '5px'
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PolicyDetailsDataTable() {
    const classes = useStyles();

    const [getPolicyDetailsData, setPolicyDetailsData] = useState([]);
    const [getVehicleSegmentsData, setVehicleSegments] = useState([]);
    const [getFuelTypesData, setFuelTypes] = useState([]);
    const [getCustomerGendersData, setCustomerGenders] = useState([]);
    const [getCustomerIncomeGroupsData, setCustomerIncomeGroups] = useState([]);
    const [getCustomerRegionsData, setCustomerRegions] = useState([]);
    const [getBoolValuesData, setBoolValues] = useState([]);

    const [getSelectedPolicyData, setSelectedPolicyData] = useState([]);

    const [getSelectedVehicleSegment, setSelectedVehicleSegment] = useState('');
    const [getSelectedFuelType, setSelectedFuelType] = useState('');
    const [getSelectedCustomerGender, setSelectedCustomerGender] = useState('');
    const [getSelectedCustomerIncomeGroups, setSelectedCustomerIncomeGroups] = useState('');
    const [getSelectedCustomerRegions, setSelectedCustomerRegions] = useState('');
    const [getSelectedBodilyInjuryLiability, setSelectedBodilyInjuryLiability] = useState('');
    const [getSelectedPersonalInjuryProtection, setSelectedPersonalInjuryProtection] = useState('');
    const [getSelectedPropertyDamageLiability, setSelectedPropertyDamageLiability] = useState('');
    const [getSelectedCollision, setSelectedCollision] = useState('');
    const [getSelectedComprehensive, setSelectedComprehensive] = useState('');
    const [getSelectedCustomerMaritalStatus, setSelectedCustomerMaritalStatus] = useState('');
    const [getPremiumValue, setPremiumValue] = useState('');


    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [premiumValidationMessage, setPremiumValidationMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVehicleSegment('');
        setSelectedFuelType('');
        setSelectedCustomerGender('');
        setSelectedCustomerIncomeGroups('');
        setSelectedCustomerRegions('');
        setSelectedBodilyInjuryLiability('');
        setSelectedPersonalInjuryProtection('');
        setSelectedPropertyDamageLiability('');
        setSelectedCollision('');
        setSelectedComprehensive('');
        setSelectedCustomerMaritalStatus('');
        setPremiumValue('');
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const validatePremiumField = (premiumValue) => {
        if (premiumValue > 1000000) {
            setPremiumValidationMessage('Premium value should not be greater than 1,000,000(1 million)');
            setValidationError(true);
        }
        else {
            setPremiumValidationMessage('');
            setValidationError(false);
        }
    };

    const getAllPoliciesDetails = async () => {
        try {
            const response = await axios.get('/api/getPoliciesDetails/');
            setPolicyDetailsData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getAllVehicleSegments = async () => {
        try {
            const response = await axios.get('/api/getAllVehicleSegments/');
            setVehicleSegments(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getFuelType = async () => {
        try {
            const response = await axios.get('/api/getFuelType/');
            setFuelTypes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getCustomerGender = async () => {
        try {
            const response = await axios.get('/api/getCustomerGender/');
            setCustomerGenders(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getCustomerIncomeGroups = async () => {
        try {
            const response = await axios.get('/api/getCustomerIncomeGroups/');
            setCustomerIncomeGroups(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getCustomerRegions = async () => {
        try {
            const response = await axios.get('/api/getCustomerRegions/');
            setCustomerRegions(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getBoolValues = async () => {
        try {
            const response = await axios.get('/api/getBoolValues/');
            setBoolValues(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const saveUpdatedPolicyDetails = async () => {
        try {

            const response = await
                axios.post('/api/updatePolicyDetails/', {
                    PolicyId: getSelectedPolicyData.POLICY_ID,
                    Premium: getPremiumValue === '' ? getSelectedPolicyData.PREMIUM : getPremiumValue,
                    VehicleSegment: getSelectedVehicleSegment === '' ? getSelectedPolicyData.VEHICLE_SEGMENT : getSelectedVehicleSegment,
                    FuelType: getSelectedFuelType === '' ? getSelectedPolicyData.FUEL : getSelectedFuelType,
                    BodyInjuryLiability: getSelectedBodilyInjuryLiability === '' ? getSelectedPolicyData.BODILY_INJURY_LIABILITY : getSelectedBodilyInjuryLiability,
                    PersonalInjuryProtection: getSelectedPersonalInjuryProtection === '' ? getSelectedPolicyData.PERSONAL_INJURY_PROTECTION : getSelectedPersonalInjuryProtection,
                    PropertyDamageLiability: getSelectedPropertyDamageLiability === '' ? getSelectedPolicyData.PROPERTY_DAMAGE_LIABILITY : getSelectedPropertyDamageLiability,
                    Collision: getSelectedCollision === '' ? getSelectedPolicyData.COLLISION : getSelectedCollision,
                    Comprehensive: getSelectedComprehensive === '' ? getSelectedPolicyData.COMPREHENSIVE : getSelectedComprehensive,
                    Gender: getSelectedCustomerGender === '' ? getSelectedPolicyData.CUSTOMER_GENDER : getSelectedCustomerGender,
                    IncomeGroup: getSelectedCustomerIncomeGroups === '' ? getSelectedPolicyData.CUSTOMER_INCOME_GROUP : getSelectedCustomerIncomeGroups,
                    Region: getSelectedCustomerRegions === '' ? getSelectedPolicyData.CUSTOMER_REGION : getSelectedCustomerRegions,
                    MaritalStatus: getSelectedCustomerMaritalStatus === '' ? getSelectedPolicyData.CUSTOMER_MARITAL_STATUS : getSelectedCustomerMaritalStatus
                });

            if (response.status === 200) {
                handleClose();
                setAlertOpen(true);
                getAllPoliciesDetails();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllPoliciesDetails();
        getAllVehicleSegments();
        getFuelType();
        getCustomerGender();
        getCustomerIncomeGroups();
        getCustomerRegions();
        getBoolValues();
    }, [])

    const options = {
        searchPlaceholder: 'Search Policy',
        filterType: 'multiselect',
        fixedHeader: true,
        fixedSelectColumn: true,
        print: false,
        tableBodyHeight: '400px',
        selectableRows: 'none',
        onRowClick: (rowData) => {
            {
                handleClickOpen();
                setSelectedPolicyData(getPolicyDetailsData.find(id => id.POLICY_ID === rowData[0]));
            }
        }
    }

    return (
        <Fragment>
            <MUIDataTable
                title={"Policy Details"}
                data={getPolicyDetailsData}
                columns={PolicyDetailsColumns}
                options={options}
            />

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
                maxWidth="xl">
                <DialogTitle id="form-dialog-title">Add New Shift Allowance</DialogTitle>
                <DialogContent className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="policyid"
                                label="Policy Id"
                                disabled
                                fullWidth
                                value={getSelectedPolicyData.POLICY_ID}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField
                                    error={validationError}
                                    type="number"
                                    margin="dense"
                                    id="premium"
                                    label="Premium"
                                    fullWidth
                                    value={getPremiumValue === '' ? getSelectedPolicyData.PREMIUM : getPremiumValue}
                                    onChange={(event) => { setPremiumValue(event.target.value); validatePremiumField(event.target.value) }}
                                    helperText={premiumValidationMessage}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="dateofpurchase"
                                label="Date of Purchase"
                                disabled
                                fullWidth
                                value={getSelectedPolicyData.DATE_OF_PURCHASE}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Vehicle Segment</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedVehicleSegment === '' ? getSelectedPolicyData.VEHICLE_SEGMENT : getSelectedVehicleSegment}
                                    onChange={(event) => setSelectedVehicleSegment(event.target.value)}
                                >
                                    {getVehicleSegmentsData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.VEHICLE_SEGMENT}>{option.VEHICLE_SEGMENT}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Fuel Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedFuelType === '' ? getSelectedPolicyData.FUEL : getSelectedFuelType}
                                    onChange={(event) => setSelectedFuelType(event.target.value)}
                                >
                                    {getFuelTypesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.FUEL}>{option.FUEL}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Bodily Injury Liability</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedBodilyInjuryLiability === '' ? getSelectedPolicyData.BODILY_INJURY_LIABILITY : getSelectedBodilyInjuryLiability}
                                    onChange={(event) => setSelectedBodilyInjuryLiability(event.target.value)}
                                >
                                    {getBoolValuesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Personal Injury Protection</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedPersonalInjuryProtection === '' ? getSelectedPolicyData.PERSONAL_INJURY_PROTECTION : getSelectedPersonalInjuryProtection}
                                    onChange={(event) => setSelectedPersonalInjuryProtection(event.target.value)}
                                >
                                    {getBoolValuesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Property Damage Liability</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedPropertyDamageLiability === '' ? getSelectedPolicyData.PROPERTY_DAMAGE_LIABILITY : getSelectedPropertyDamageLiability}
                                    onChange={(event) => setSelectedPropertyDamageLiability(event.target.value)}
                                >
                                    {getBoolValuesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Collision</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedCollision === '' ? getSelectedPolicyData.COLLISION : getSelectedCollision}
                                    onChange={(event) => setSelectedCollision(event.target.value)}
                                >
                                    {getBoolValuesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Comprehensive</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedComprehensive === '' ? getSelectedPolicyData.COMPREHENSIVE : getSelectedComprehensive}
                                    onChange={(event) => setSelectedComprehensive(event.target.value)}
                                >
                                    {getBoolValuesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                margin="dense"
                                id="customerid"
                                label="Customer Id"
                                disabled
                                fullWidth
                                value={getSelectedPolicyData.CUSTOMER_ID}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Customer Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedCustomerGender === '' ? getSelectedPolicyData.CUSTOMER_GENDER : getSelectedCustomerGender}
                                    onChange={(event) => setSelectedCustomerGender(event.target.value)}
                                >
                                    {getCustomerGendersData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.CUSTOMER_GENDER}>{option.CUSTOMER_GENDER}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Customer Income Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedCustomerIncomeGroups === '' ? getSelectedPolicyData.CUSTOMER_INCOME_GROUP : getSelectedCustomerIncomeGroups}
                                    onChange={(event) => setSelectedCustomerIncomeGroups(event.target.value)}
                                >
                                    {getCustomerIncomeGroupsData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.INCOME_GROUP}>{option.INCOME_GROUP}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Customer Region</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedCustomerRegions === '' ? getSelectedPolicyData.CUSTOMER_REGION : getSelectedCustomerRegions}
                                    onChange={(event) => setSelectedCustomerRegions(event.target.value)}
                                >
                                    {getCustomerRegionsData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.CUSTOMER_REGION}>{option.CUSTOMER_REGION}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">Customer Marital Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={getSelectedCustomerMaritalStatus === '' ? getSelectedPolicyData.CUSTOMER_MARITAL_STATUS : getSelectedCustomerMaritalStatus}
                                    onChange={(event) => setSelectedCustomerMaritalStatus(event.target.value)}
                                >
                                    {getBoolValuesData.map((option, index) => {
                                        return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveUpdatedPolicyDetails} variant="contained" color="primary"
                        disabled={validationError === true}>
                        Submit
                    </Button>
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
                <Alert onClose={handleClose} severity="success">
                    Saved Successfully!
             </Alert>
            </Snackbar>
        </Fragment >
    );
}