"""
API calls method for the HR Central app flask react application.
"""
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from Insurance_Client_App import app
import Insurance_Client_App.flask_app.dbModels as dbModel
import pyodbc
import urllib
import requests
import os


print('Trying to connect to database..')  	
conn_string = urllib.parse.quote_plus('Driver={SQL Server};''Server=KGS-VDI-00415\SQLEXPRESS;''Database=InsuranceClient;''Trusted_Connection=yes;')
sql_engine = create_engine("mssql+pyodbc:///?odbc_connect=%s" % conn_string)
print('Connection to database has been established succesfully..')



@app.route('/api/getPoliciesDetails/',methods=['GET'])
def getClientPolicyDetails():
    getPoliciesData = "Select * from [dbo].[VW_POLICY_AND_CUSTOMER_DETAILS_DATA]"
    policies_list = sql_engine.execute(getPoliciesData)
    jsonPoliciesData = dbModel.get_tbl_client_insurance_data_schema.dump(policies_list)
    return jsonify(jsonPoliciesData)

@app.route('/api/getAllVehicleSegments/',methods=['GET'])
def getAllVehicleSegments():
    getVehicleSegments = "Select * from [dbo].[TBL_VEHICLE_SEGMENT]"
    segments_list = sql_engine.execute(getVehicleSegments)
    jsonSegmentsData = dbModel.get_tbl_vehicle_segment_schema.dump(segments_list)
    return jsonify(jsonSegmentsData)

@app.route('/api/getFuelType/',methods=['GET'])
def getFuelType():
    getFuelTypes = "Select * from [dbo].[TBL_FUEL_TYPE]"
    fuel_type_list = sql_engine.execute(getFuelTypes)
    jsonFuelData = dbModel.get_tbl_fuel_type_schema.dump(fuel_type_list)
    return jsonify(jsonFuelData)

@app.route('/api/getCustomerGender/',methods=['GET'])
def getCustomerGender():
    getAllGenders = "Select * from [dbo].[TBL_CUSTOMER_GENDER]"
    genders_list = sql_engine.execute(getAllGenders)
    jsonGendersData = dbModel.get_tbl_customer_gender_schema.dump(genders_list)
    return jsonify(jsonGendersData)

@app.route('/api/getCustomerIncomeGroups/',methods=['GET'])
def getCustomerIncomeGroups():
    getIncomeGroups = "Select * from [dbo].[TBL_CUSTOMER_INCOME_GROUP]"
    groups_list = sql_engine.execute(getIncomeGroups)
    jsonGroupsData = dbModel.get_tbl_customer_income_group_schema.dump(groups_list)
    return jsonify(jsonGroupsData)

@app.route('/api/getCustomerRegions/',methods=['GET'])
def getCustomerRegions():
    getRegions = "Select * from [dbo].[TBL_CUSTOMER_REGION]"
    regions_list = sql_engine.execute(getRegions)
    jsonRegionsData = dbModel.get_tbl_customer_region_schema.dump(regions_list)
    return jsonify(jsonRegionsData)

@app.route('/api/getBoolValues/',methods=['GET'])
def getBoolValues():
    getValues = "Select * from [dbo].[TBL_BOOL_VALUES]"
    values_list = sql_engine.execute(getValues)
    jsonBoolValuesData = dbModel.get_tbl_bool_values_schema.dump(values_list)
    return jsonify(jsonBoolValuesData)

@app.route('/api/updatePolicyDetails/',methods=['PATCH'])
def saveUpdatedPolicyDetails():
    extractQuerParams = request.get_json()
    policyId = extractQuerParams['PolicyId']
    premium = extractQuerParams['Premium']
    fuelType = extractQuerParams['FuelType']
    bodyInjuryLiability = extractQuerParams['BodyInjuryLiability']
    personalInjuryProtection = extractQuerParams['PersonalInjuryProtection']
    propertyDamageLiability = extractQuerParams['PropertyDamageLiability'] 
    collision = extractQuerParams['Collision']
    comprehensive = extractQuerParams['Comprehensive']

    jsonChartData = updatePolicyDetails(fuelType,premium,bodyInjuryLiability,personalInjuryProtection,propertyDamageLiability,
                                       collision,comprehensive,policyId)
    return jsonChartData

def updatePolicyDetails(fuelType,premium,bodyInjuryLiability,personalInjuryProtection,propertyDamageLiability,
                                       collision,comprehensive,policyId):
    updateDetails = '''
   UPDATE [dbo].[TBL_CLIENT_POLICIES_DATA]
   SET [FUEL] = ?
      ,[PREMIUM] = ?
      ,[BODILY_INJURY_LIABILITY] = ?
      ,[PERSONAL_INJURY_PROTECTION] = ?
      ,[PROPERTY_DAMAGE_LIABILITY] = ?
      ,[COLLISION] = ?
      ,[COMPREHENSIVE] = ?
   WHERE  [POLICY_ID] = ? '''
    try:
        chartData = sql_engine.execute(updateDetails,fuelType,premium,bodyInjuryLiability,personalInjuryProtection,propertyDamageLiability,
                                       collision,comprehensive,policyId)
        return 'Policy details updated successfully'
    except:
        return 'An error occured'

@app.route('/api/updateCustomerDetails/',methods=['PATCH'])
def saveUpdatedCustomerDetails():
    extractQuerParams = request.get_json()
    customerId = extractQuerParams['CustomerId']
    incomeGroup = extractQuerParams['IncomeGroup']
    region = extractQuerParams['Region']
    maritalStatus = extractQuerParams['MaritalStatus']

    jsonChartData = updateCustomerDetails(incomeGroup,region,maritalStatus,customerId)
    return jsonChartData

def updateCustomerDetails(incomeGroup,region,maritalStatus,customerId):
    updateDetails = '''
   UPDATE [dbo].[TBL_CLIENT_PERSONAL_DATA]
   SET [CUSTOMER_INCOME_GROUP] = ?
      ,[CUSTOMER_REGION] = ?
      ,[CUSTOMER_MARITAL_STATUS] = ?
   WHERE  [CUSTOMER_ID] = ? '''
    try:
        chartData = sql_engine.execute(updateDetails,incomeGroup,region,maritalStatus,customerId)
        return 'Customer details updated successfully'
    except:
        return 'An error occured'

@app.route('/api/getLineChartData/',methods=['POST'])
def getLineChartData():
    extractQuerParams = request.get_json()
    region = extractQuerParams['region']
    print(region)
    getChartData = "EXEC SP_NO_OF_POLICY_BOUGHT_IN_REGION @region=?"
    chartData = sql_engine.execute(getChartData,region)
    jsonChartData = dbModel.get_no_of_policy_bought_in_region_schema.dump(chartData)
    return jsonify(jsonChartData)

@app.route('/api/getKPITilesData/',methods=['GET'])
def getKPITilesData():
    getTilesData = "Select * from [dbo].[VW_POLICY_KPIS_TILE_DATA]"
    kpi_data = sql_engine.execute(getTilesData)
    jsonKPIsData = dbModel.get_vw_policy_kpis_tile_data_schema.dump(kpi_data)
    return jsonify(jsonKPIsData)