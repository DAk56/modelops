
ModelOps Admin APIs provide essential capabilities for managing users within the platform. These APIs enable administrators to onboard new users and associate models to users.

>### Onboarding a User 

**Purpose**:

Allows ModelOps administrators to onboard a user.

**Prerequisites**

Before invoking this API, the administrator must complete one of the following steps to create the user's credentials in the AWS Cognito user pool:

- **Manual creation**: The admin manually creates a username and password for the user in the AWS Cognito user pool. Refer [AWS documentation](https://docs.aws.amazon.com/cognito/latest/developerguide/how-to-create-user-accounts.html) for more information.

- **Maximus SSO integration**: Alternatively, users can be provisioned in the Cognito pool via Maximus Single Sign-On (SSO), if configured. This allows seamless user creation based on enterprise identity management. Refer [ModelOps User pool SSO](../Operations%20Manual/Documents/Modelops%20SSO-User%20pool%20config.pdf) for detailed information.

**Endpoint**:

`/v1/admin/user`

**Request**:

Send a POST request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

```json
{
    "emailId": "xxxxx@maximus.com",
    "firstName": "xxxx",
    "lastName": "xxxxx"
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:-|:-|:-|:-|
|emailId|Email ID of the user|string|Required|
|firstName|First name of the user|string|Required|
|lastName|Surname of user|string|Optional|

**Response**:

```json
{
   "message" :"User onboarded",
   "active": True
}
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|400|Invalid email domain. Email must be from the domain @maximus.com|The email address must be of maximus|
|400|User with email xxxx@maximus.com already exists.|the provided email address already exist for a user|
|400|firstName: must be of string type.|The first name field given in the request body must be of string data type.|
|400|firstName: missing required field.|The first name field is a required parameter inside the request body while onboarding a user.|


>###  Associating or Disassociating a User with a Tenant API

**Purpose**:

This API allows ModelOps administrators to associate or disassociate a user with a tenant.

**Endpoint**:

`/v1/admin/user/{user_email}/tenant`

**Request**:

Send a POST request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

   - Path Parameter:
     - `user email`: Associated Maximus email Address of the user .

```json
{
    "emailId":"xxxxxx@maximus.com",
    "tenantIds":"xxxxxxxx",
    "accessType":"xxxxx"
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:-|:-|:-|:-|
|emailId|Maximus email address of the user**information needed**|string|Required|
|tenantId|ID of the tenant to which the user is being onboarded or deboarded.|string|Required|
|accessType|Access type. Use "grant" to allow the user to associate with the `tenantId`, use "revoke" to disassociate the user from the mentioned `tenantId`|string|Required|

**Response**:

***Response 1***: In the request body the `accessType` field is mentioned as "grant". (Associating a tenant to the user)

```json
{
  "message" :"User access granted",
  "active": True
}
```
***Response 2***: In the request body the `accessType` field is mentioned as "revoke". (Dissassociating a tenant from the user)

```json
{
  "message" : "User access revoked",
  "active": False
}
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|400|Invalid email domain. Email must be from the domain @maximus.com|The email address must be of maximus|
|400|User not found for the provided email - xxxx@maximus.com| The email ID provided do not exist for a user. Check if the user is onboarded or not.|
|400|The user xxxx@maximus.com with tenant ID xxxxxx is already in a revoked state. No further action is required|the provided email address is already revoked for the provided tenant ID.|
|400|Tenant not found for the provided id - xxxx|The tenant ID provided is incorrect.|
|400|xxxx@maximus.com and xxxxxx not found. Cannot revoke access.|The provided details do not exist, check the email address and tenant ID. Check the combination if it is correct.|
|400|xxxx@maximus.com and xxxxxx already exists with access {GRANT_ACCESS}|The provided email ID and tenant ID already exist with grant access.|
|400|accessType: Missing required field.| The access type field is missing in the request body.|

!!!note
    Deboarding does not delete the backend resources immediately. Admin can onboard a deboarded resource within 15 days.