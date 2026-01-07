## Tenant-specific Admin APIs Overview

ModelOps Admin APIs provide essential capabilities for managing tenants within the platform. These APIs enable administrators to onboard new tenants, update tenant configurations, associate models, manage credentials, and deboard tenants when no longer needed. They form the backbone of tenant lifecycle management in ModelOps.

>### Onboarding a Tenant API

**Purpose**:

Use this API endpoint to onboard a tenant.

!!!note
    Capture the tenant and client information as soon as the response is received.

**Endpoint**:

`/v1/admin/tenant`

**Request**:

Send a POST request to the endpoint given.

   - Header:
     - `Authorization`: Insert the Bearer token.

The body of the request can be of following format.

```json
{
    "name":"**insert name of the Tenant**",
    "emailId": "email of the tenant@maximus.com",
    "dataRetentionPeriodInDays": 1,
    "credentialsCount": 2,
    "dispatchType":"**insert the dispatch type",
    "dispatchConfig":{"arn":"xxxx"}

}
```

|Parameter|Definition|Data Type|Required/Optional|
|:-|:-|:-|:-|
|name|Name of the tenant|string|Required|
|emailId|Maximus email address of the tenant|string|Required|
|dataRetentionPeriodInDays|number of days the data is stored.(default value is 1)|integer|Optional|
|credentialsCount|Number of credentials needed for the particular tenant (default value is 1)|integer|Optional|
|dispatchType|Type of dispatch mechanism (Step_Function, SNS, Event_Bridge)|string|Optional|
|dispatchConfig|Configuration object for the chosen dispatch type. Refer [Onboard Workflow](Workflow%20APIs.md#onboarding-a-workflow-api) for more information.|object|Optional|

**Response**
```Json
{
    "tenantId": "xxxxxxxx",
    "apiKey": "xxxxxx",
    "credentials": [
        {
            "clientId": "xxxxxx",
            "clientSecret": "xxxxxx"
        },
        {
            "clientId": "xxxxx",
            "clientSecret": "xxxxx"
        }
    ]
}
```

**Error Responses**

| HTTP Status | Message | Description |
|-------------|---------|-------------|
| 400         |  "An error occured while onboarding tenant : xxxx already exists" | Tenant name already exists |
|400|An error occured while onboarding tenant : `dataRetentionPeriodInDays` Must be a Positive Integer| Make sure `dataRetentionPeriodInDays` in the request body is a positive integer value.|
|400|An error occured while onboarding tenant : dataRetentionPeriodInDays must be an integer| Make sure `dataRetentionPeriodInDays` in the request body is a positive integer value.|
|400|An error occured while onboarding tenant : `credentialsCount` Must be a Positive Integer| Make sure `credentialsCount` in the request body is a positive integer value.|
|400|An error occured while onboarding tenant : `credentialsCount` Must not exceed 5| Make sure `credentialsCount` in the request body is less than 5.|
|400|An error occured while onboarding tenant : Invalid email domain. Email must be from the domain @maximus.com|Make sure the `emailId` in the request body is a maximus email address.|
|400|An error occoured while onboarding tenant : 1. dispatchConfig: Values for key(s): arn must be non-empty strings for dispatchType: sns|
|400|An error occoured while onboarding tenant : Invalid dispatchType 'xxx'. Valid options are: sns, event_bridge, step_function, url|Provided dispatchType is incorrect, check and provide a correct dispatchType|


>### Associating a Tenant with a Model API

**Purpose**:

Use it to associate an available model with the tenant.

**Endpoint**:

`/v1/admin/tenant/models`

**Request**:

Send a POST request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

The body of the request can be of following format.

```json
{
     "modelAccess" : [
            { "modelId" : "anthropic.claude-3-haiku-20240307-v1:0", "access": "grant", "modelAccess": "shared" , "tenantId":"xxxxx"},
            { "modelId" : "meta.llama3-8b-instruct-v1:0", "access": "grant", "modelAccess": "shared" , "tenantId":"xxxxx"}
     ]
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:-|:-|:-|:-|
|modelAccess|List of model access configurations for the tenant. Each object defines access details for a specific model.|array of objects|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;modelID|Unique identifier of the AI model to be onboarded|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;access|Access control action.Use "grant" to allow access to the model. Use "revoke" to remove access to the model.|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;modelAccess|Access type. Use "shared" to indicate shared model access across tenants. Use "dedicated" to indicated dedicated model acess across tenants|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;tenantID|ID of the tenant to which the model is being onboarded or deboarded|string|Required|

**Response**:

```json
[
    {
        "tenantId": "xxxxx",
        "aiModelId": "anthropic.claude-3-haiku-20240307-v1:0",
        "access": "grant",
        "modelAccess": "shared",
        "message": "Grant successful with shared access",
        "createdAt": "2025-09-15T10:42:16.501396+00:00",
        "updatedAt": "2025-09-15T10:42:16.501396+00:00"
    },
    {
        "tenantId": "xxxxx",
        "aiModelId": "meta.llama3-8b-instruct-v1:0",
        "access": "grant",
        "modelAccess": "shared",
        "message": "Grant successful with shared access",
        "createdAt": "2025-09-15T10:42:16.501396+00:00",
        "updatedAt": "2025-09-15T10:42:16.501396+00:00"
    }
]
```

**Error Responses**:

| HTTP Status | Message | Description |
|-------------|---------|-------------|
|404|Model not exist in modelops for the give id -xxxxxx| Check the model name given in the `modelId` field.|
|400|Invalid access value xxxx . Must be one of ['grant', 'revoke']|Check the `access` field given.|
|400|Invalid modelAccess value xxxx . Must be one of ['shared', 'dedicated']|Check the `modelAccess` field given.|
|404|Tenant not found for the provided id - xxxxxx| Check the ID given in the `tenentId` field.|


>### Updating a Tenant API

**Purpose**:

This API allows ModelOps administrators to update the details of an existing tenant. Typical use cases include modifying the tenant name, updating associated models, or changing metadata.

**Endpoint**:

`/v1/admin/tenant/{{tenant_id}}`

**Request**:

Send a PATCH request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

   - Path parameter:
     - `tenant_id`: Insert the tenant ID of the client for which the updation is required.

```json
{
    "emailId": "xxxxx@maximus.com",
    "rateLimit": 120,
    "burstLimit":1000,
    "quotaLimit":1,
    "resetCount": 5,
    "quotaPeriod":"MONTH",
    "dataRetentionPeriodInDays": 1,
    "dispatchType":"**insert the dispatch type**",
    "dispatchConfig":{"arn":"xxxx"}
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:-|:-|:-|:-|
|emailId|Email address that is going to show after updation|string|Conditional|
|rateLimit|Rate limit that is needed for the tenant|integer(also accepts numeric strings, e.g., "1000")|Conditional|
|burstLimit|Burst limit that is needed for the tenant|integer (also accepts numeric strings, e.g., "1000")|Conditional|
|quotaLimit| Quota limit that is needed for the tenant|integer (also accepts numeric strings, e.g., "1000")|Conditional|
|resetCount| Additional quota required for the tenant for the current day|integer (also accepts numeric strings, e.g., "1000")|Conditional|
|quotaPeriod|Quota period that is needed for the tenant. can be DAY, WEEK, and MONTH.|string|Conditional|
|dataRetentionPeriodInDays| Data retaintion needed for the tenant in days.|integer|Conditional|
|dispatchType|Type of dispatch mechanism (Step_Function, SNS, Event_Bridge)|string|Conditional|
|dispatchConfig|Configuration object for the chosen dispatch type. Refer [Onboard Workflow](Workflow%20APIs.md#onboarding-a-workflow-api) for more information.|object|Conditional|


**Response**:

```json
{
    "tenantId": "xxxxx",
    "emailId": "xxxxx@maximus.com",
    "rateLimit": 120,
    "burstLimit": 1000,
    "quotaLimit": 1,
    "quotaPeriod": "MONTH",
    "updatedTs": "2025-09-16T06:12:18.476Z",
    "dispatchType": "xxxx",
    "dispatchConfig": {
        "arn":"xxxx"
    }
}
```


**Error Responses**:

| HTTP Status | Message | Description |
|-------------|---------|-------------|
|400|An error occured while updating tenant details : Period should be one of DAY,MONTH, or WEEK|Check the `quotaPeriod` given in the request body.|
|400|An error occured while updating tenant details : Invalid email domain. Email must be from the domain @maximus.com|Check the email address domain give, It should be one of maximus|
|400|An error occured while updating tenant details : `dataRetentionPeriodInDays` must be an integer| Check the `dataRetentionPeriodInDays` field, it should be an integer value.|
|404|An error occured while updating tenant details : xxxxx does not exist|Check the tenent ID given in the path parameter in the endpoint|
|400|An error occured while updating tenant details : DispatchConfig must be a non-empty dictionary.|The `dispatchType` in the request body must be a non-empty dictionary.| 

>### Change the Tenant Credentials API

**Purpose**:

This API allows ModelOps administrators to rotate client secrets or revoke credentials for a tenant. It is essential for maintaining security when credentials are compromised, lost, or need to be refreshed.

**Endpoint**:

`/v1/admin/tenant/credentials`

**Request and Response**:

Send a PATCH request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

***Request 1***: Rotate Client Secret
```json
{
    "tenantId":"xxxxxx",
    "clientIds":["xxxxxx"],
    "rotateClientSecret":true
}
```

***Response 1***:

```json
{
    "tenantId": "xxxxxx",
    "credentials": [
        {
            "clientId": "xxxxxxxx",
            "clientSecret": "xxxxxxxxxx"
        }
    ]
}
```

***Request 2***: Revoke Credentials
```json
{
    "tenantId":"xxxxxx",
    "clientIds":["xxxxxx"],
    "revokeCredentials":true
}
```

***Response 2***

```json
{
    "tenantId": "xxxxxx",
    "revokedCredentials": [
        "xxxxxx"
    ]
}
```
**Request parameters**:

|Parameter|Definition|Data Type|Required/Optional|
|:-|:-|:-|:-|
|tenantId|Unique identifier of the tenant whose credentials are being updated.|string|Required|
|clientIds|List of client IDs whose credentials are to be rotated or revoked|array of strings|Required|
|rotateClientSecret|Set to true to rotate the client secret for the specified client IDs.|boolean|Conditional|
|revokeCredentials|Set to true to revoke credentials for the specified client IDs.|boolean|Conditional|

!!!note
    Admin must not include both `rotateClientSecret` and `revokeCredentials` in the same request. Doing so will result in an error.

**Error Responses**:

| HTTP Status | Message | Description |
|-------------|---------|-------------|
|404|An error occured while updating tenant credentials : The following clientId(s) = ['xxxxxxx'] are not associated with tenantId=xxxxx|The tenant ID and client ID provided do not belong together or the provided data is incorrect.|
|404|An error occured while updating tenant credentials : No credentials found for tenantId=xxxxx|The tenant ID and client ID provided do not belong together or the provided data is incorrect.|
|400|An error occured while updating tenant credentials : Either rotateClientSecret or revokeCredentials must be provided.|Make sure either rotateClientSecret or revokeCredentialsis provided, not both.|
|400|An error occured while updating tenant credentials : clientIds must be a list|Make sure the clientIds provided in the request body is inside a list.|
|400|An error occured while updating tenant credentials : tenantId and clientIds are required when performing credential operations.|Make sure both tenantId and clientId are provided in the request body.|


>### Get Tenant details API

**Purpose**:

This API allows ModelOps administrators to know the details of an existing tenant. 

**Endpoint**:

`/v1/admin/tenant/{{tenant_id}}`

**Request**:

Send a GET request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

   - Path parameter:
     - `tenant_id`: Insert the tenant ID of the client for which data geathering is required.


**Response**:
```json
{
    "tenantId": "xxxxx",
    "name": "xxxxx",
    "active": true,
    "emailId": "xxxxx@maximus.com",
    "createdAt": "2025-09-15T08:58:02.000Z",
    "rateLimit": 12000,
    "burstLimit": 1000,
    "quotaLimit": 10000,
    "quotaPeriod": "MONTH",
    "modelAccess": [
        {
            "modelId": "anthropic.claude-3-haiku-20240307-v1:0",
            "modelIdentifier": "anthropic-claude-3-haiku",
            "accessType": "SHARED"
        },
        {
            "modelId": "meta.llama3-8b-instruct-v1:0",
            "modelIdentifier": "meta-llama3-8b-instruct",
            "accessType": "SHARED"
        }
    ]
}
```
**Error Responses**:

| HTTP Status | Message | Description |
|-------------|---------|-------------|
|404|Tenant does not exist for given Id - xxxx|Check the tenant ID provided.|

>### Deboarding a Tenant API

**Purpose**:

This API allows ModelOps administrators to deboard an existing tenant.

**Endpoint**:

`/v1/admin/tenant/{{tenant_id}}`

**Request**:

Send a DELETE request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

   - Path parameter:
     - `tenant_id`: Insert the tenant ID of the client for which the deletion is required.


**Response**:

```json
{
    "active": false,
    "tenantId": "xxxxx"
}
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|404|An error occured while deboarding tenant : xxxxx does not exist|Check the tenant ID provided.|

!!!note
    Deboarding does not delete the backend resources immediately. Admin can onboard a deboarded resource within 15 days.