"""
Database models for the HR Central app flask react application.
"""

from flask import Flask
from flask_marshmallow import Marshmallow
from Insurance_Client_App import app

marsh_mallow = Marshmallow(app)

class GetTBLClientInsuranceDataSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('POLICY_ID'
      ,'DATE_OF_PURCHASE'
      ,'CUSTOMER_ID'
      ,'FUEL'
      ,'VEHICLE_SEGMENT'
      ,'PREMIUM'
      ,'BODILY_INJURY_LIABILITY'
      ,'PERSONAL_INJURY_PROTECTION'
      ,'PROPERTY_DAMAGE_LIABILITY'
      ,'COLLISION'
      ,'COMPREHENSIVE'
      ,'CUSTOMER_GENDER'
      ,'CUSTOMER_INCOME_GROUP'
      ,'CUSTOMER_REGION'
      ,'CUSTOMER_MARITAL_STATUS')

get_tbl_client_insurance_data_schema = GetTBLClientInsuranceDataSchema(many=True)

class GetTBLVehicleSegmentSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('MASTER_ID'
      ,'VEHICLE_SEGMENT')

get_tbl_vehicle_segment_schema = GetTBLVehicleSegmentSchema(many=True)

class GetTBLFueltypeSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('MASTER_ID'
      ,'FUEL')

get_tbl_fuel_type_schema = GetTBLFueltypeSchema(many=True)

class GetTBLCustomerGenderSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('MASTER_ID'
      ,'CUSTOMER_GENDER')

get_tbl_customer_gender_schema = GetTBLCustomerGenderSchema(many=True)

class GetTBLCustomerIncomeGroupSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('MASTER_ID'
      ,'INCOME_GROUP')

get_tbl_customer_income_group_schema = GetTBLCustomerIncomeGroupSchema(many=True)


class GetTBLCustomerRegionsSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('MASTER_ID'
      ,'CUSTOMER_REGION')

get_tbl_customer_region_schema = GetTBLCustomerRegionsSchema(many=True)


class GetTBLBoolValuesSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('MASTER_ID'
      ,'BOOL_VALUES')

get_tbl_bool_values_schema = GetTBLBoolValuesSchema(many=True)

class GetVWNoOfPolicyBoughtInRegionSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('UNIQUE_MONTH'
      ,'CUSTOMER_REGION'
      ,'North'
      ,'South'
      ,'East'
      ,'West')

get_no_of_policy_bought_in_region_schema = GetVWNoOfPolicyBoughtInRegionSchema(many=True)

class GetVWPolicyKPIsTileDataSchema(marsh_mallow.Schema):
    class Meta:
        fields = ('CUSTOMER_REGION'
      ,'UNIQUE_MONTH'
      ,'TOTAL_POLICIES_BOUGHT'
      ,'VEHICLE_SEGMENT')

get_vw_policy_kpis_tile_data_schema = GetVWPolicyKPIsTileDataSchema(many=True)