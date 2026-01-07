ModelOps Workflow enables users to orchestrate and invoke predefined sequences of model operations through a single API call for streamlined automation.

> ### Invoking a Workflow API

**Purpose**:

Use this API endpoint to invoke a workflow as a tenant/user. The request is processed asynchronously: ModelOps returns a workflowJobId, runs the workflow as per its configured dispatch, and once completed you can retrieve results via the Get Data API (after checking job status).

**Endpoint**:

  `/v1/workflows/{{workflowId}}`

**Request**:

Send a POST request to the given endpoint.

  - Header:
       - `Authorization`: Insert the Bearer token.

!!!note
    The structure of the inputs object depends on the workflow definition. ModelOps does not enforce a schema for workflow inputs. Refer to your workflow configuration or orchestration logic for required fields.

**Response**:

```json
{
    "jobId": "xxxxxxxxxx",
    "workflowId": "xxxxxx",
    "jobStatus": "Queued",
    "createdAt": "2023-09-29T11:48:23.799Z"
}
```


> ### Get Workflow API

**Purpose**:

Use this API to retrieve workflow information associated with a specific tenant. It supports two modes:

- **Without workflow_id**: Returns the workflow ID(s) associated with the tenant.
- **With workflow_id**: Returns detailed information about the specified workflow if it is associated with the tenant.

**Endpoint**:

- To get all workflows for a tenant:

  `/v1/workflows`

- To get details of a specific workflow associated with a tenant:

  `/v1/workflows/{{workflow_id}}`

**Request**:

Send a GET request to the given endpoint.

  - Header:
       - `Authorization`: Insert the Bearer token.
       - `tenant_Id`: Tenant ID for which the workflow(s) are to be retrieved.
    
**Response**:

- Without workflow_id:

```json
{
  "workflows": [
    {
      "workflow_id": "xxxx1",
      "status": "Active",
      "model_access": [
        "amazon.titan-text-lite-v1"
      ]
    },
    {
      "workflow_id": "xxxxx2",
      "status": "Active",
      "model_access": null
    },
    {
      "workflow_id": "xxxxxx3",
      "status": "Active",
      "model_access": [
        "amazon.titan-text-lite-v1",
        "anthropic.claude-3-sonnet-20240229-v1:0",
        "textract"
      ]
    },
    ...
  ]
}
```

- With workflow_id:

```json
{
  "workflow": {
    "workflow_id": "xxxxxx1",
    "status": "Active",
    "model_access": {}
  }
}
```



