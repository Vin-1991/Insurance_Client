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
    getPoliciesData = "Select * from [dbo].[TBL_CLIENT_INSURANCE_DATA]"
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

@app.route('/api/getBarChartData/',methods=['GET'])
def getBarChartData():
    extractQuerParams = request.args.get('region')
    getChartData = "Select * from [dbo].[VW_NO_OF_POLICY_BOUGHT_IN_REGION] where CUSTOMER_REGION = ?"
    chartData = sql_engine.execute(getChartData,extractQuerParams)
    jsonChartData = dbModel.get_no_of_policy_bought_in_region_schema.dump(chartData)
    return jsonify(jsonChartData)

@app.route('/api/updatePolicyDetails/',methods=['POST'])
def saveUpdatedPolicyDetails():
    extractQuerParams = request.get_json()
    print(extractQuerParams)
    policyId = extractQuerParams['PolicyId']
    premium = extractQuerParams['Premium']
    vehicleSegment = extractQuerParams['VehicleSegment']
    fuelType = extractQuerParams['FuelType']
    bodyInjuryLiability = extractQuerParams['BodyInjuryLiability']
    personalInjuryProtection = extractQuerParams['PersonalInjuryProtection']
    propertyDamageLiability = extractQuerParams['PropertyDamageLiability'] 
    collision = extractQuerParams['Collision']
    comprehensive = extractQuerParams['Comprehensive']
    gender = extractQuerParams['Gender']
    incomeGroup = extractQuerParams['IncomeGroup']
    region = extractQuerParams['Region']
    maritalStatus = extractQuerParams['MaritalStatus']

    jsonChartData = updatePolicyDetail(fuelType,vehicleSegment,premium,bodyInjuryLiability,personalInjuryProtection,propertyDamageLiability,
                                       collision,comprehensive,gender,incomeGroup,region,maritalStatus,policyId)
    return jsonChartData


def updatePolicyDetail(fuelType,vehicleSegment,premium,bodyInjuryLiability,personalInjuryProtection,propertyDamageLiability,
                                       collision,comprehensive,gender,incomeGroup,region,maritalStatus,policyId):
    updateDetails = '''
   UPDATE [dbo].[TBL_CLIENT_INSURANCE_DATA]
   SET [FUEL] = ?
      ,[VEHICLE_SEGMENT] = ?
      ,[PREMIUM] = ?
      ,[BODILY_INJURY_LIABILITY] = ?
      ,[PERSONAL_INJURY_PROTECTION] = ?
      ,[PROPERTY_DAMAGE_LIABILITY] = ?
      ,[COLLISION] = ?
      ,[COMPREHENSIVE] = ?
      ,[CUSTOMER_GENDER] = ?
      ,[CUSTOMER_INCOME_GROUP] = ?
      ,[CUSTOMER_REGION] = ?
      ,[CUSTOMER_MARITAL_STATUS] = ?
   WHERE  [POLICY_ID] = ? '''
    try:
        chartData = sql_engine.execute(updateDetails,fuelType,vehicleSegment,premium,bodyInjuryLiability,personalInjuryProtection,propertyDamageLiability,
                                       collision,comprehensive,gender,incomeGroup,region,maritalStatus,policyId)
        return 'Updated Successfully'
    except:
        return 'An error occured'