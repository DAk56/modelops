### Overview

ModelOps enables developers to build and orchestrate AI-powered workflows without managing complex integrations. It abstracts orchestration, security, and model invocation, allowing developers to focus on business logic while ensuring scalable, secure, and tenant-aware execution.

### Key Concepts

- **Workflow**: A sequence of tasks executed to achieve a business objective.
- **AI Workflow**: A workflow that includes one or more tasks leveraging AI model capabilities.
- **ModelOps SDK**: A toolkit that simplifies model invocation, callback handling, and tenant-specific data access.

### Benefits

- Centralized access to AI capabilities
- Secure, tenant-aware execution
- Asynchronous processing for scalability
- Built-in governance, logging, and error handling

### Developer Workflow Lifecycle

#### 1. Workflow Design

- Ensure modularity and reusability across use cases.
- Maintain statelessness: no workflow-specific data should persist in RDS.
- Store all inputs, outputs, and intermediate data in tenant-specific S3 buckets.
- Follow ModelOps logging and request/response standards.

#### 2. Workflow Entry Point

ModelOps initiates workflows by dispatching a **Request Object** in JSON format:

```json
{
  "jobId": "<unique-job-id>",
  "tenantId": "<tenant-id>",
  "bucketName": "<tenant-s3-bucket>",
  "objectKey": "<path-to-input-payload>",
  "responseBridge": "<eventbridge-endpoint>",
  "additionalMetadata": {}
}
```

#### 3. Workflow Invocation

- ModelOps dispatches the request to the configured orchestration engine (Step Functions, SNS, EventBridge).
- Workflow receives temporary AWS credentials to access the tenant's S3 bucket.
- Developers define custom logic and intermediate steps.

#### 4. Installation of ModelOps SDK

Download the .tar.gz file and install:

```py
pip install path\modelops-0.0.1.tar.gz
```

#### 5. Model Invocation via SDK

- Use the ModelOps SDK to invoke AI models securely:

```py
from modelops.interface import ModelOps

client = ModelOps()

response = client.invoke_ocr(
    model_id="textract",
    workflow_job_id="<workflow_job_id>",
    s3_bucket="<tenant_bucket>",
    s3_payload_location="<s3_payload_location>",
    s3_output_location="<s3_output_location>",
    dispatch_type="step_function",
    dispatch_config={
        "task_token": "<task_token>",
        "additional_information": {
            "workflow_job_id": "<workflow_job_id>"
        }
    },
    tags={
        "project": "test"
    }
)
```

- To invoke LLM models, use `invoke_llm`, which is present in the SDK.
- ModelOps handles execution and sends a callback with results.
- Supported dispatch types: **TaskToken**, **SNS**, **EventBridge**, and **URL**.
- Supported `dispatch_config` format:
    - Step Function

      ```json 
      { "task_token": "<task_token>" }
      ```
    
    - SNS
    
      ```json
      { "arn": "<sns_arn>" }
      ```
    
    - EventBridge

      ```json
      {
        "arn": "<event_bridge_arn>",
        "detail_type": "<event_bridge_detail_type>",
        "source": "<event_bridge_source>"
      }
      ```
    
    - URL

      ```json
      { "url": "<url>" }
      ```

**Parameters for `invoke_llm` and `invoke_ocr`**:

- **model_id** - ID of the AI model
- **workflow_job_id** - Workflow job ID
- **s3_bucket** - Tenant bucket name
- **s3_payload_location** - Input payload location
- **s3_output_location** - Output location for model response
- **dispatch_type** - Callback type
- **dispatch_config** - Config for selected dispatch type
- **tags** - Optional metadata

#### 6. Handling Callbacks

Upon model completion, ModelOps sends:

```json
{
  "modelJobId": "<model-job-id>",
  "status": "Completed",
  "errorCode": null,
  "errorMessage": null
}
```

- Workflow fetches results from `s3_output_location`.

#### 7 Uploading Final Result

Store final result using SDK:

```py
result_location = client.store_final_result(
    model_response=final_response,
    workflow_job_id=workflow_job_id,
    tenant_id=tenant_id
)
```

#### 8. Workflow Completion

Notify ModelOps of workflow completion:

```py
client.complete_workflow(
    status="Success",
    metrics={"processingTime": "5s"},
    messages=["Workflow completed successfully"]
)
```

Alternatively, publish directly to the ModelOps Response EventBridge.

#### 9. Error Handling

If an error occurs:

- Publish an error event to the Response EventBridge:

```json
{
  "jobId": "<workflow-job-id>",
  "status": "Error",
  "errorCode": "ModelTimeout",
  "errorMessage": "Textract did not respond in time"
}
```
ModelOps also sends error callbacks for model-level failures.


### Example: Textract + Comprehend Workflow

Goal: Extract PII and PHI entities from handwritten documents. 

**Steps**:

1. **Start Workflow**

    - Tenant invokes `POST /v1/workflow/{workflow_id}`.
    - ModelOps generates jobId and dispatches to Step Function.

2. **Invoke Textract**

    - Use SDK to call Textract with task token.
    - Wait for callback and fetch output from S3.

3. **Invoke Comprehend**

    - Pass Textract output to Comprehend via SDK.
    - Wait for callback and fetch output from S3.

4. **Post-Processing & Completion**

    - Format results and notify ModelOps of completion.

### Best Practices

- Use **TaskToken** for Step Functions to simplify callback handling.
- Keep workflows stateless and modular.
- Use SDK for all model interactions.
- Validate input/output formats rigorously.
- Log all key events and errors.

### Conclusion

ModelOps empowers developers to build robust, scalable AI workflows with minimal overhead. By following this guide, developers ensure seamless integration, secure execution, and enterprise-grade governance.

For SDK documentation and onboarding support, contact the ModelOps team or refer to the internal developer portal.
