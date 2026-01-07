A Workflow in ModelOps is an orchestrated, event‑driven process that chains multiple AI/ML operations (e.g., document OCR → entity detection → enrichment) into a single, trackable job. Workflows let tenants submit one request and have ModelOps reliably dispatch, monitor, and complete all the required steps-while enforcing consistent logging, callbacks, and cost tracking.

The following set of APIs can be used for workflow related activities:

> ### Onboarding a Workflow API

**Purpose**:

Use this API endpoint to onboard a workflow into ModelOps. This registers the workflow name(workflow_id), dispatch type, and dispatch configuration.

!!!note
    Ensure the dispatch configuration matches the selected dispatch type (Step Function, SNS, or EventBridge).

**Endpoint**:

`/v1/admin/workflow`

**Request**:

  Send a POST request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

```json

{
    "name": "xxx",
    "dispatchType": "STEP_FUNCTION",
    "dispatchConfig": {
        "arn": "arn:aws:states:us-east-1:123456789012:stateMachine:TextractBedrockWF"
    }
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:--------|:---------|:--------|:----------------|
|name|Name of the workflow|string|Required|
|dispatchType|Type of dispatch mechanism (Step_Function, SNS, Event_Bridge)|string|Required|
|dispatchConfig|Configuration object for the chosen dispatch type|object|Required|

**Dispatch Config Examples**:

- **Step Function**

```json
{ "arn": "arn:aws:states:<region>:<account>:stateMachine:<name>" }
```

- **SNS**:

```json
{ "arn": "arn:aws:states:<region>:<account>:stateMachine:<name>" }
```

- **EventBridge**:

```json
{
  "arn": "arn:aws:events:<region>:<account>:event-bus/<bus-name>",
  "source": "modelops.workflow",
  "detail_type": "WorkflowInvoke"
}
```

**Response**:

```json
{
    "workflowId": "xxx",
    "message": "Workflow onboarded successfully"
}
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|400|Workflow name 'xxx' already exists. Please choose a unique name.|Change the `name` field.|
|400|dispatchConfig is required and must be a dictionary|Add `dispatchConfig` field in the request body.|
|400|dispatchType is required|Add `dispatchType` field in the request body.|
|400|1. dispatchType: Unallowed value 'xxxxx'. Allowed values are: sns, event_bridge, step_function|Provide a valid value for `dispatchType`.|
|400|1. dispatchConfig: Required keys for dispatchType Event_Bridge are: arn, detail_type, source|Add missing keys for `Event_Bridge` configuration.|
|400|1. dispatchConfig: Unexpected key(s): source, detail_type. Required keys for dispatchType sns are: arn|Remove invalid keys for `SNS` configuration.|
|400|1. dispatchConfig: Unexpected key(s): source, detail_type. Required keys for dispatchType step_function are: arn|Remove invalid keys for `Step_Function` configuration.|

> ### Updating a Workflow API

**Purpose**:

Use this API endpoint to update a workflow that is already onboarded to ModelOps. User can update the `dispatchType` and `dispatchConfig` using this API.

!!!note
    Ensure the new `dispatchConfig` matches the updated `dispatchType`. 

**Endpoint**:

`/v1/admin/workflow/{{workflow_id}}`

**Request**:

  Send a PATCH request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.
  
   - Path Parameter:
     - `workflow_id`: The name of the workflow to update.

```json
{
    "dispatchType":"sns",
    "dispatchConfig":{"arn": "arn:aws:events:<region>:<account>:event-bus/<bus-name>"}
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:--------|:---------|:--------|:----------------|
|dispatchType|New dispatch mechanism (sns, event_bridge, step_function)|string|Required|
|dispatchConfig|Configuration object for the chosen dispatch type|object|Required|

Dispatch Config Rules:

- For step_function: Required key → arn
- For sns: Required key → arn
- For event_bridge: Required keys → arn, detail_type, source

**Response**:

```json
{
    "dispatchType": "sns",
    "dispatchConfig": {
        "arn": "arn:aws:events:<region>:<account>:event-bus/<bus-name>"
    },
    "updatedAt": "2025-10-09T05:49:00.493177+00:00"
}
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|400|No workflow found for workflowId: xxxx|Check the `workflow_id` provided in the path parameter|
|400|Both 'dispatchType' and 'dispatchConfig' must be provided together and dispatchConfig must be a dictionary.|Provide both `dispatchType` and `dispatchConfig` in the request boday.|
|400|1. dispatchType: Unallowed value 'xxxxx'. Allowed values are: sns, event_bridge, step_function|Provide a valid value for `dispatchType`.|
|400|1. dispatchConfig: Required keys for dispatchType Event_Bridge are: arn, detail_type, source|Add missing keys for `Event_Bridge` configuration.|
|400|1. dispatchConfig: Unexpected key(s): source, detail_type. Required keys for dispatchType sns are: arn|Remove invalid keys for `SNS` configuration.|
|400|1. dispatchConfig: Unexpected key(s): source, detail_type. Required keys for dispatchType step_function are: arn|Remove invalid keys for `Step_Function` configuration.|

> ### Associating and disassociating tenants with a Workflow API

**Purpose**:

Use this API to grant or revoke access between tenants and workflows in ModelOps. This endpoint supports bulk operations, allowing you to associate or disassociate multiple tenants and workflows in a single request.

**Endpoint**:

`/v1/admin/tenant/workflow`

**Request**:

  Send a POST request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

```json
{
     "workflowAccess" : [
            { "workflowId" : "xxx", "access": "grant", "tenantId":"xxxxxxx"},
            { "workflowId" : "xxxxxx", "access": "grant", "tenantId":"xxxxxxxxxxxx"},
            { "workflowId" : "xx", "access": "grant", "tenantId":"xxx"}
                        
     ]
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:--------|:---------|:--------|:----------------|
|workflowAccess|Array of access directives for (workflow, tenant) pairs.|array|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;workflowId|Name of the workflow|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;access|Action to perform for this pair. Supported value: "grant", "revoke".|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;tenantId| Tenant ID to which the mentioned workflow will be associated or disassociated.|string|Required|

**Response**:

```json
[
    {
        "tenantId": "xxxxxxx",
        "workflowId": "xxx",
        "access": "grant",
        "message": "Grant successful with shared access",
        "createdAt": "2025-10-09T14:19:46.670562+00:00",
        "updatedAt": "2025-10-09T14:19:46.670562+00:00"
    },
    {
        "tenantId": "xxxxxxxxxxxx",
        "workflowId": "xxxxxx",
        "access": "grant",
        "message": "Grant successful with shared access",
        "createdAt": "2025-10-09T14:19:46.670562+00:00",
        "updatedAt": "2025-10-09T14:19:46.670562+00:00"
    },
    {
        "tenantId": "xxx",
        "workflowId": "xx",
        "access": "grant",
        "message": "Grant successful with shared access",
        "createdAt": "2025-10-09T14:19:46.670562+00:00",
        "updatedAt": "2025-10-09T14:19:46.670562+00:00"
    }
]
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|400|xxxxxxxx and xxx already exists| the workflow id and tenant id provided already exists.|
|400|Conflict: Cannot both grant and revoke access for workflow 'xxx' and tenant 'xxxxx'|Both Revoke and grant access can not be given for the same workflow id and tenant.|
|400|Invalid access value 'xxxx'. Must be one of ['grant', 'revoke']|Allowed values for `access` is 'grant' and 'revoke'|
|500|Failed to insert tenant workflow access details - xxxxxx|The workflow id given do not exist, onboard and try again.|
|404|Tenant not found for the provided id - xxxxx|The provided tenant ID is incorrect.|
|400|Access type is missing|`access` is missing in the request body.|
|400|Workflow Id is missing|Check the missing field in the request body.|
|400|Tenant Id is missing|Tenant ID is missing in the request body.|

> ### Onboarding and deboarding a model to the Workflow API

**Purpose**:

Use this API to grant or revoke access between models and workflows in ModelOps. This endpoint supports bulk operations, allowing you to associate or disassociate multiple models and workflows in a single request.

**Endpoint**:

`/v1/admin/workflow/models`

**Request**:

  Send a POST request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.

```json
{
     "aiModelAccess" : [
            { "workflowId" : "xxxxx", "access": "grant", "modelId":"amazon.titan-text-lite-v1"},
            { "workflowId" : "xxxxxxxx", "access": "grant", "modelId":"amazon.titan-text-lite-v1"}
            {"workflowId": "xxxxxx", "access": "revoke", "modelId": "amazon.titan-text-lite-v1"}
     ]
}
```

|Parameter|Definition|Data Type|Required/Optional|
|:--------|:---------|:--------|:----------------|
|aiModelAccess|Array of access directives for (workflow, model) pairs.|array|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;workflowId|Name of the workflow|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;access|Action to perform for this pair. Supported value: "grant", "revoke".|string|Required|
|&nbsp;&nbsp;&nbsp;&nbsp;modelId| Model ID to which the mentioned workflow will be associated or disassociated.|string|Required|

**Response**

```json
[
    {
        "modelId": "amazon.titan-text-lite-v1",
        "workflowId": "xxxxx",
        "access": "grant",
        "message": "GRANT",
        "createdAt": "2025-10-16T07:40:27.766429+00:00",
        "updatedAt": "2025-10-16T07:40:27.766429+00:00"
    },
    {
        "modelId": "amazon.titan-text-lite-v1",
        "workflowId": "xxxxxxxx",
        "access": "grant",
        "message": "GRANT",
        "createdAt": "2025-10-16T07:40:27.766429+00:00",
        "updatedAt": "2025-10-16T07:40:27.766429+00:00"
    },
    {
        "modelId": "amazon.titan-text-lite-v1",
        "workflowId": "xxxxxx",
        "access": "revoke",
        "message": "Revoke successful",
        "createdAt": "2025-10-16T07:40:27.766429+00:00",
        "updatedAt": "2025-10-16T07:40:27.766429+00:00"
    }
]
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|400|Workflow Id xxxx does not exists in modelops| The `workflowId` provided in the request body does not exist in the database.|
|404|model not found for the provided id - xxxx| The `modelId` provided in the request body is wrong, or the model is not onboarded to ModelOps.|
|400|xxxxx and xxxx already exists|The workflow id and model id provided already exists.|
|400|Conflict: Cannot both grant and revoke access for workflow 'xxx' and model 'xxxxx'|Both Revoke and grant access can not be given for the same workflow id and model.|
|400|Duplicate entry found: workflowID=xxxx, modelId=xxxxx, access=xxx| The entry provided is duplicated in the request body.|


> ### Deboarding a Workflow API


!!! warning "Important"
    Before deboarding a workflow, verify that no tenant is currently associated with it. Removing a workflow that is still linked to tenants can cause invocation failures and orphaned jobs.

**Purpose**:

Use this API endpoint to deboard a workflow from ModelOps.

**Endpoint**:

`/v1/admin/workflow/{{workflow_id}}`

**Request**:

  Send a DELETE request to the given endpoint.

   - Header:
     - `Authorization`: Insert the Bearer token.
  
   - Path Parameter:
     - `workflow_id`: The name of the workflow to update.


**Response**:

```json
{
    "workflowId": "xxxxx",
    "active": false,
    "message": "Workflow deboarded successfully"
}
```

**Error Responses**:

| HTTP Status | Message | Description |
|:-------------|:---------|:-------------|
|404|xxxx does not exist|The model with ID xxxx was previously created but has been deboarded successfully, so it no longer exists in the system.|
|404|No workflow found for workflow_name: xxxx|The workflow name xxxx does not exist in the database-either it was never onboarded or has been removed.|