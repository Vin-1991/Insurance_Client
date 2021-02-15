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
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import { trackPromise } from 'react-promise-tracker';
import { getApiCall, patchApiCall } from '../utils/axiosApis';

const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    section1: {
        paddingBottom: '5px'
    },
    section2: {
        paddingTop: '5px'
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PolicyDetailsDataTable() {

    const classes = useStyles();

    //Variable Declartion Section
    const [getPolicyDetailsData, setPolicyDetailsData] = useState([]);
    const [getVehicleSegmentsData, setVehicleSegments] = useState([]);
    const [getFuelTypesData, setFuelTypes] = useState([]);
    const [getCustomerGendersData, setCustomerGenders] = useState([]);
    const [getCustomerIncomeGroupsData, setCustomerIncomeGroups] = useState([]);
    const [getCustomerRegionsData, setCustomerRegions] = useState([]);
    const [getBoolValuesData, setBoolValues] = useState([]);

    const [getSelectedPolicyData, setSelectedPolicyData] = useState([]);

    const [getSelectedFuelType, setSelectedFuelType] = useState('');
    const [getSelectedCustomerIncomeGroups, setSelectedCustomerIncomeGroups] = useState('');
    const [getSelectedCustomerRegions, setSelectedCustomerRegions] = useState('');
    const [getSelectedBodilyInjuryLiability, setSelectedBodilyInjuryLiability] = useState('');
    const [getSelectedPersonalInjuryProtection, setSelectedPersonalInjuryProtection] = useState('');
    const [getSelectedPropertyDamageLiability, setSelectedPropertyDamageLiability] = useState('');
    const [getSelectedCollision, setSelectedCollision] = useState('');
    const [getSelectedComprehensive, setSelectedComprehensive] = useState('');
    const [getSelectedCustomerMaritalStatus, setSelectedCustomerMaritalStatus] = useState('');
    const [getPremiumValue, setPremiumValue] = useState(0);


    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [premiumValidationMessage, setPremiumValidationMessage] = useState('');

    //Handle Open for Dialog pop up
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Handle Close for Dialog pop up
    const handleClose = () => {
        setOpen(false);
        setDisableButton(true);
        setValidationError(false);
        setPremiumValidationMessage('');
        setSelectedFuelType('');
        setSelectedCustomerIncomeGroups('');
        setSelectedCustomerRegions('');
        setSelectedBodilyInjuryLiability('');
        setSelectedPersonalInjuryProtection('');
        setSelectedPropertyDamageLiability('');
        setSelectedCollision('');
        setSelectedComprehensive('');
        setSelectedCustomerMaritalStatus('');
        setPremiumValue(0);
    };

    //Handle Close for Alert pop up
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    //Validates Premium value Field
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

    //Get All policies api call
    const getAllPoliciesDetails = async () => {
        const response = await getApiCall('/api/getPoliciesDetails/');
        setPolicyDetailsData(response);
    };

    //Get All vehicle segments api call
    const getAllVehicleSegments = async () => {
        const response = await getApiCall('/api/getAllVehicleSegments/');
        setVehicleSegments(response);
    };

    //Get All fuel types api call
    const getFuelType = async () => {
        const response = await getApiCall('/api/getFuelType/');
        setFuelTypes(response);
    };

    //Get All customer gender api call
    const getCustomerGender = async () => {
        const response = await getApiCall('/api/getCustomerGender/');
        setCustomerGenders(response);
    };

    //Get All customer income group api call
    const getCustomerIncomeGroups = async () => {
        const response = await getApiCall('/api/getCustomerIncomeGroups/');
        setCustomerIncomeGroups(response);
    };

    //Get All customer region api call
    const getCustomerRegions = async () => {
        const response = await getApiCall('/api/getCustomerRegions/');
        setCustomerRegions(response);
    };

    //Get All common bool values api call
    const getBoolValues = async () => {
        const response = await getApiCall('/api/getBoolValues/');
        setBoolValues(response);
    };

    //Handle operations after Updating the values
    const handleOperationsAfterUpdate = () => {
        handleClose();
        setAlertOpen(true);
        getAllPoliciesDetails();
    }

    //Validate Selected values
    const checkForSelectedValues = (condition) => {
        if (condition === 'policy' && (getPremiumValue !== 0 || getSelectedFuelType !== '' || getSelectedBodilyInjuryLiability !== '' || getSelectedPersonalInjuryProtection !== '' ||
            getSelectedPropertyDamageLiability !== '' || getSelectedCollision !== '' || getSelectedComprehensive !== '')) {
            return true;
        }
        else if (condition === 'customer' && (getSelectedCustomerIncomeGroups !== '' || getSelectedCustomerRegions !== '' || getSelectedCustomerMaritalStatus !== '')) {
            return true;
        }
        return false;
    }

    //Update policy related changes by doing a PATCH Api call.
    const saveUpdatedPolicyDetails = async () => {
        const validateAndExecute = checkForSelectedValues('policy');
        if (validateAndExecute) {
            const response = await
                patchApiCall('/api/updatePolicyDetails/', {
                    PolicyId: getSelectedPolicyData.POLICY_ID,
                    Premium: getPremiumValue === 0 ? getSelectedPolicyData.PREMIUM : getPremiumValue,
                    FuelType: getSelectedFuelType === '' ? getSelectedPolicyData.FUEL : getSelectedFuelType,
                    BodyInjuryLiability: getSelectedBodilyInjuryLiability === '' ? getSelectedPolicyData.BODILY_INJURY_LIABILITY : getSelectedBodilyInjuryLiability,
                    PersonalInjuryProtection: getSelectedPersonalInjuryProtection === '' ? getSelectedPolicyData.PERSONAL_INJURY_PROTECTION : getSelectedPersonalInjuryProtection,
                    PropertyDamageLiability: getSelectedPropertyDamageLiability === '' ? getSelectedPolicyData.PROPERTY_DAMAGE_LIABILITY : getSelectedPropertyDamageLiability,
                    Collision: getSelectedCollision === '' ? getSelectedPolicyData.COLLISION : getSelectedCollision,
                    Comprehensive: getSelectedComprehensive === '' ? getSelectedPolicyData.COMPREHENSIVE : getSelectedComprehensive,
                });

            if (response.status === 200) {
                handleOperationsAfterUpdate();
            }
        }
    };

    //Update customer related changes by doing a PATCH Api call.
    const saveUpdatedCustomerDetails = async () => {
        const validateAndExecute = checkForSelectedValues('customer');
        if (validateAndExecute) {
            const response = await
                patchApiCall('/api/updateCustomerDetails/', {
                    CustomerId: getSelectedPolicyData.CUSTOMER_ID,
                    IncomeGroup: getSelectedCustomerIncomeGroups === '' ? getSelectedPolicyData.CUSTOMER_INCOME_GROUP : getSelectedCustomerIncomeGroups,
                    Region: getSelectedCustomerRegions === '' ? getSelectedPolicyData.CUSTOMER_REGION : getSelectedCustomerRegions,
                    MaritalStatus: getSelectedCustomerMaritalStatus === '' ? getSelectedPolicyData.CUSTOMER_MARITAL_STATUS : getSelectedCustomerMaritalStatus
                });
            if (response.status === 200) {
                handleOperationsAfterUpdate();
            }
        }
    };

    useEffect(() => {
        //Call all the API function async on page load
        trackPromise(getAllPoliciesDetails());
        getAllVehicleSegments();
        getFuelType();
        getCustomerGender();
        getCustomerIncomeGroups();
        getCustomerRegions();
        getBoolValues();
    }, [])

    //Datatable options
    const options = {
        searchPlaceholder: 'Search Policy',
        filterType: 'multiselect',
        fixedHeader: true,
        fixedSelectColumn: true,
        print: false,
        tableBodyHeight: '69vh',
        selectableRows: 'none',
        onRowClick: (rowData) => {
            {
                handleClickOpen();//Open the dialog pop up
                setSelectedPolicyData(getPolicyDetailsData.find(id => id.POLICY_ID === rowData[0])); //Render the selected row values with all the inputs and dropdowns
            }
        }
    }

    return (
        <Fragment>
            {getPolicyDetailsData.length > 0 &&
                <div>
                    /*MUI data table*/
                    <MUIDataTable
                        title={"Policy Details"}
                        data={getPolicyDetailsData}
                        columns={PolicyDetailsColumns}
                        options={options}
                    />

                    /*Dialog contains all the input fields and dropdowns*/
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth
                        maxWidth="xl">
                        <DialogTitle id="form-dialog-title">Update Policy Details</DialogTitle>

                        <DialogContent className={classes.root}>
                            <Grid container spacing={3} className={classes.section1}>
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
                                            value={getPremiumValue === 0 ? getSelectedPolicyData.PREMIUM : getPremiumValue}
                                            onChange={(event) => { setPremiumValue(event.target.value); validatePremiumField(event.target.value); setDisableButton(false); }}
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
                                    <TextField
                                        margin="dense"
                                        id="vehicleSegment"
                                        label="Vehicle Segment"
                                        disabled
                                        fullWidth
                                        value={getSelectedPolicyData.VEHICLE_SEGMENT}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-simple-select-helper-label">Fuel Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={getSelectedFuelType === '' ? getSelectedPolicyData.FUEL : getSelectedFuelType}
                                            onChange={(event) => { setSelectedFuelType(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedBodilyInjuryLiability(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedPersonalInjuryProtection(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedPropertyDamageLiability(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedCollision(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedComprehensive(event.target.value); setDisableButton(false); }}
                                        >
                                            {getBoolValuesData.map((option, index) => {
                                                return <MenuItem key={option.MASTER_ID} value={option.BOOL_VALUES}>{option.BOOL_VALUES}</MenuItem>;
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Divider variant="middle" />
                            <Grid container spacing={3} className={classes.section2}>
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
                                    <TextField
                                        margin="dense"
                                        id="gender"
                                        label="Customer Gender"
                                        disabled
                                        fullWidth
                                        value={getSelectedPolicyData.CUSTOMER_GENDER}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-simple-select-helper-label">Customer Income Group</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={getSelectedCustomerIncomeGroups === '' ? getSelectedPolicyData.CUSTOMER_INCOME_GROUP : getSelectedCustomerIncomeGroups}
                                            onChange={(event) => { setSelectedCustomerIncomeGroups(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedCustomerRegions(event.target.value); setDisableButton(false); }}
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
                                            onChange={(event) => { setSelectedCustomerMaritalStatus(event.target.value); setDisableButton(false); }}
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
                            <Button onClick={() => { saveUpdatedPolicyDetails(); saveUpdatedCustomerDetails(); }} variant="contained" color="primary"
                                disabled={validationError || disableButton}>
                                Submit
                    </Button>
                            <Button onClick={handleClose} variant="outlined" color="secondary">
                                Close
                    </Button>
                        </DialogActions>
                    </Dialog >

                    /*Alert popup */
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alertOpen} autoHideDuration={2000} onClose={handleAlertClose}>
                        <Alert onClose={handleClose} severity="success">
                            Updated Successfully!
                        </Alert>
                    </Snackbar>
                </div>
            }
        </Fragment >
    );
}