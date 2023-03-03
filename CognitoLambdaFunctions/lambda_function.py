import json
import os
import boto3




client = boto3.client("cognito-idp", region_name="us-east-1")



def lambda_handler(event, context):
    print(event)
    # print(event['body']['actionType'])
    actionType = json.loads(event['body'])['actionType']
    if actionType == "sign_up":
        username = json.loads(event['body'])['Username']
        password = json.loads(event['body'])['Password']
        response = client.sign_up(
            ClientId=json.loads(event['body'])['ClientId'],
            Username=username,
            Password=password,
            UserAttributes=[{"Name": "email", "Value": username}],
        )
        return response
    
    elif actionType == "confirm_sign_up":
        username = json.loads(event['body'])['Username']
        confirmation_code = json.loads(event['body'])['ConfirmationCode']
        response = client.confirm_sign_up(
            ClientId=json.loads(event['body'])['ClientId'],
            Username=username,
            ConfirmationCode= confirmation_code
        )
        return response
        
    elif actionType == "initiate_auth": 
        username = json.loads(event['body'])['Username']
        password = json.loads(event['body'])['Password']
        
        response = client.initiate_auth(
        ClientId=json.loads(event['body'])['ClientId'],
        AuthFlow="USER_PASSWORD_AUTH",
        AuthParameters={"USERNAME": username, "PASSWORD": password},
        )
        return response
    
    elif actionType == "refresh_token": 
        # username = json.loads(event['body'])['Username']
        refresh_token = json.loads(event['body'])['refresh_token']
        
        response = client.initiate_auth(
        ClientId=json.loads(event['body'])['ClientId'],
        AuthFlow="REFRESH_TOKEN_AUTH",
        AuthParameters={"REFRESH_TOKEN": refresh_token},
        )
        return response
    
    elif actionType == "sign_out":
        access_token = json.loads(event['body'])['access_token']
        response = client.global_sign_out(AccessToken=access_token)
        return response
        
    else: 
        message = "No case is matched"
        return message
    
    
    
