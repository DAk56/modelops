In ModelOps, each model invocation is treated as a discrete job. Upon submission, the system returns a unique job ID, which can be used to monitor, retrieve, or cancel the job using the following APIs.

> ### Get Jobs API

   **Purpose**:

   Retrieve a list of jobs created by the authenticated user or client. Supports optional query parameters for filtering by model type, job status, and more.

**Endpoint**:

`/v1/jobs`

**Request**:

Send a GET request to the end point given. Include the following in the request. 

   - Headers:
     - `Authorization`: Bearer token or Basic Auth credentials
     - `tenant_Id`: Identifier for the project or client (User do not need this header if the token is generated via client credentials API)

   - Query Parameters (optional):
!!! Tips
    Use query parameters to filter the response. Append ? followed by key-value pairs to the endpoint.

    **Example**:
    `?model=amazon-titan-text-lite`

**Response**:

   Returns a paginated list of job objects with metadata for each job.
   
```json
   {
       "jobs": [
           {
               "jobId": "anthropic.claude-3-sonnet-20240229-v1:0_xxxxx",
              "jobStatus": "Served",
               "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
               "inputSize": 251.0,
               "outputSize": 913.0,
               "createdTS": "2025-07-23T11:06:35.297Z",
               "completionTS": "2025-07-23T11:06:42.714Z",
               "queuedTS": "2025-07-23T11:06:35.461Z",
               "processingTS": "2025-07-23T11:06:42.607Z",
               "cancellationTS": null,
               "inputTokens": 17,
               "outputTokens": 197,
               "pageCount": null,
               "textractType": null,
               "createdAt": "2025-07-23T11:06:35.297000",
               "completedAt": "2025-07-23T11:06:42.714000",
               "servedAt": "2025-07-24T05:57:06.857000",
               "cancellationStatus": null,
               "errorMessage": null
           },
           {
               "jobId": "meta.llama3-8b-instruct-v1:0_xxxxxx",
               "jobStatus": "Served",
               "modelId": "meta.llama3-8b-instruct-v1:0",
               "inputSize": 312.0,
               "outputSize": 1770.0,
               "createdTS": "2025-07-23T11:07:45.898Z",
               "completionTS": "2025-07-23T11:07:52.264Z",
               "queuedTS": "2025-07-23T11:07:46.095Z",
               "processingTS": "2025-07-23T11:07:52.172Z",
               "cancellationTS": null,
               "inputTokens": 27,
               "outputTokens": 296,
               "pageCount": null,
               "textractType": null,
               "createdAt": "2025-07-23T11:07:45.898000",
               "completedAt": "2025-07-23T11:07:52.264000",
               "servedAt": "2025-07-23T11:11:12.550000",
               "cancellationStatus": null,
               "errorMessage": null
           }
   // Additional job entries...
       ],
       "pagination_metadata": {
           "pageNum": 1,
           "pageSize": 10,
           "totalCount": 49
       }
   }
```

> ### Get Job by Job ID API

**Purpose**:

Retrieve detailed status and metadata for a specific job using its jobId.

**Endpoint**:

`/v1/jobs/{{jobId}}`

**Request**:

   Send a GET request to the endpoint given. Include the following in the request.

   - Header:
     - `Authorization`: Bearer token or Basic Auth credentials
     - `tenant_Id`: Identifier for the project or client (User do not need this header if the token is generated via client credentials API)
   - Path parameter:
     - `jobId`: The job id for which the status is needed.

**Response**:

```json
   {
       "jobId": "textract_xxxxx",
       "jobStatus": "Completed",
       "tenantId": "qwerty12345",
       "modelId": "textract",
       "createdTS": "2025-08-18T13:50:50.079Z",
       "completionTS": "2025-08-18T13:51:06.677Z",
       "queuedTS": "2025-08-18T13:50:50.950Z",
       "processingTS": "2025-08-18T13:50:54.453Z",
       "cancellationTS": null,
       "inputSize": "1540960.0kb",
       "outputSize": "102007.0kb",
       "inputTokens": null,
       "outputTokens": null,
       "pageCount": 1,
       "textractType": "FORMS,TABLES,SIGNATURES,LAYOUT,QUERIES",
       "cancellation_status": null,
       "errorMessage": null,
       "servedAt": null
   }
```

> ### Get Data API

   **Purpose**:

   Fetch the output data of a completed job. This API should be called only after the job status is marked as "Completed".

**Endpoint**:

`/v1/jobs/{{jobId}}/data`

**Request**:

   Send a GET request to the endpoint given. Include the following in the request.

   - Header:
     - `Authorization`: Bearer token or Basic Auth credentials
     - `tenant_Id`: Identifier for the project or client (User do not need this header if the token is generated via client credentials API)
   - Path parameter:
     - `jobId`: The job id for which the status is needed.

**Response**:

```json
{
    "content": [
        {
            "type": "text",
            "text": "output text"
        }
    ],
    "additionalDetails": {
        "requestId": "f4be98dd-3077-4db2-b385-7606a2550083",
        "date": "2025-10-29T09:40:02+00:00",
        "contentType": "application/json",
        "contentLength": "1903 tokens",
        "inputToken": 16,
        "outputToken": 407,
        "type": "message",
        "role": "assistant",
        "model": "claude-3-haiku-20240307",
        "stopReason": "end_turn",
        "retryAttempts": 0,
        "invocationLatency": "4152",
        "completionReason": null
    }
}
```
> ### Cancel Job API

   **Purpose**:

   Cancel a job before the `jobStatus` enters the `Processing` state, i.e. it is either in `Open` or `Queued` state. Useful for aborting incorrect or unintended submissions.

**Endpoint**:

`/v1/jobs/{{jobId}}`

**Request**:

   Send a DELETE request to the endpoint given. Include the following in the request.

   - Header:
     - `Authorization`: Bearer token or Basic Auth credentials
   - Path parameter:
     - `jobId`: Specify the job ID associated with the cancellation request.

**Responses**:

***Response 1***: Job is Being Cancelled

  If the job is eligible for cancellation and the request is accepted, the response will indicate that the job is in the process of being cancelled.

```json
{
    "tenantId": "xxxxxxxxxxxxxxx",
    "modelId": "amazon.titan-text-lite-v1",
    "createdTS": "2025-09-02T11:45:55.099Z",
    "completionTS": null,
    "queuedTS": "2025-09-02T11:45:55.920Z",
    "processingTS": null,
    "message": "Job amazon.titan-text-lite-v1_qwerdasd is being cancelled.",
    "jobStatus": "Cancelling",
    "cancellationTS": "2025-09-02T11:46:13.612Z"
}
```

***Response 2***: Job is Already Cancelled

  If the job has already been cancelled prior to the request, the response will confirm its cancelled status.

```json
{
    "tenantId": "xxxxxxxxxxxxx",
    "modelId": "amazon.titan-text-lite-v1",
    "createdTS": "2025-09-02T11:45:55.099Z",
    "completionTS": null,
    "queuedTS": "2025-09-02T11:45:55.920Z",
    "processingTS": null,
    "message": "Job amazon.titan-text-lite-v1_xxxxxxxx is already cancelled",
    "jobStatus": "Cancelled",
    "cancellationTS": "2025-09-02T11:46:14.000Z"
}
```

***Response 3***: Job is Already Completed

  If the job has already completed processing, cancellation is not possible. The response will reflect its final status.

```json
{
    "tenantId": "xxxxxxxxxxx",
    "modelId": "anthropic.claude-3-haiku-20240307-v1:0",
    "createdTS": "2025-09-02T11:58:41.393Z",
    "completionTS": "2025-09-02T11:58:46.371Z",
    "queuedTS": "2025-09-02T11:58:42.237Z",
    "processingTS": "2025-09-02T11:58:46.285Z",
    "message": "Job anthropic.claude-3-haiku-20240307-v1:0_xxxxxxxx is already completed.",
    "jobStatus": "Completed"
}
```

!!! Notes
    - All job-related APIs require a valid access token and tenant ID.
    - Jobs can be cancelled only when in the `Open` or `Queued` state; cancellation is not supported once processing begins.
    - Use pagination metadata from the Get Jobs API to navigate large result sets.