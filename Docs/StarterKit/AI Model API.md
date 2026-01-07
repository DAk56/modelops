
The Get AI Model API enables users to retrieve comprehensive metadata about a specific AI model. This includes details such as model type, supported modalities, lifecycle status, provider information, and usage constraints. Understanding this metadata is essential for selecting and configuring models appropriately before invocation.

!!! note
    Model metadata is accessible **only to users who are entitled to the requested model**. If a user is not entitled to a model, the API will not return its metadata.

> ### Get AI Model API

   **Purpose**:

   Use this API to retrieve AI model information associated with a specific tenant. It supports two modes:

   - **Without model_identifier**: Returns all AI models available for the tenant.
   - **With model_identifier**: Returns detailed information about the specified AI model.
   
**Endpoint**:
   
  - To get all AI models for a tenant:

   `/v1/models`

  - To get details of a specific AI model:

   `/v1/models/{{model_identifier}}`

   **Request**: 

   Send a GET request to the endpoint given. Include the following in the request.

   - Header:
     - `Authorization`: Bearer token or Basic Auth credentials.
     - `tenant_Id`: Identifier for the project or client.
   - Path parameter:
     - `model_identifier`: The model identifier for which the details of parameters is requested.

**Response**:

  - **Without model_identifier**:

```json
    {
    "models": [
        {
            "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
            "service": "TEXT, IMAGE",
            "status": "Active",
            "modelIdentifier": "anthropic-claude-3-sonnet",
            "modelInfo": {
                "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
                "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
                "modelName": "Claude 3 Sonnet",
                "providerName": "Anthropic",
                "modelLifecycle": {
                    "status": "ACTIVE"
                },
                "inputModalities": [
                    "TEXT",
                    "IMAGE"
                ],
                "outputModalities": [
                    "TEXT"
                ],
                "customizationsSupported": [],
                "inferenceTypesSupported": [
                    "ON_DEMAND"
                ],
                "responseStreamingSupported": true
            }
        },
        {
            "modelId": "comprehend",
            "service": "TEXT_ANALYSIS",
            "status": "Active",
            "modelIdentifier": "comprehend",
            "modelInfo": {
                "modelId": "comprehend",
                "modelName": "Comprehend",
                "providerName": "Amazon",
                "inputModalities": [
                    "TEXT_ANALYSIS"
                ],
                "outputModalities": [
                    "TEXT"
                ]
            }
        },
        {
            "modelId": "meta.llama3-8b-instruct-v1:0",
            "service": "TEXT",
            "status": "Active",
            "modelIdentifier": "meta-llama3-8b-instruct",
            "modelInfo": {
                "modelId": "meta.llama3-8b-instruct-v1:0",
                "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/meta.llama3-8b-instruct-v1:0",
                "modelName": "Llama 3 8B Instruct",
                "providerName": "Meta",
                "modelLifecycle": {
                    "status": "ACTIVE"
                },
                "inputModalities": [
                    "TEXT"
                ],
                "outputModalities": [
                    "TEXT"
                ],
                "customizationsSupported": [],
                "inferenceTypesSupported": [
                    "ON_DEMAND"
                ],
                "responseStreamingSupported": true
            }
        },
        {
            "modelId": "snap",
            "service": "custom",
            "status": "Active",
            "modelIdentifier": "snap",
            "modelInfo": {}
        },
        {
            "modelId": "textract",
            "service": "DOCUMENT_PROCESSING",
            "status": "Active",
            "modelIdentifier": "textract",
            "modelInfo": {
                "modelId": "textract",
                "modelName": "Textract",
                "providerName": "Amazon",
                "inputModalities": [
                    "DOCUMENT_PROCESSING"
                ],
                "outputModalities": [
                    "TEXT"
                ]
            }
        }
    ]
}
```

  - **With model_identifier**:

```json
	{
    "model": {
        "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
        "service": "TEXT, IMAGE",
        "status": "Active",
        "modelIdentifier": "anthropic-claude-3-sonnet",
        "modelInfo": {
            "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
            "modelArn": "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
            "modelName": "Claude 3 Sonnet",
            "providerName": "Anthropic",
            "modelLifecycle": {
                "status": "ACTIVE"
            },
            "inputModalities": [
                "TEXT",
                "IMAGE"
            ],
            "outputModalities": [
                "TEXT"
            ],
            "customizationsSupported": [],
            "inferenceTypesSupported": [
                "ON_DEMAND"
            ],
            "responseStreamingSupported": true
        }
    }
}
```
!!!Note
    To know more about the APIs in details, refer to the [swagger documentation](Swagger/Swagger.md).