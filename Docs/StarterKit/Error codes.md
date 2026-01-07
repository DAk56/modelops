### Error Messages
This section outlines common and API-specific error codes, response behaviors, and best practices for diagnosing and resolving issues when working with ModelOps APIs.

Refer to the tables below for information related to errors.


   |HTTP Status|Message	|Resolution |
   |:----------|:-    |:-     |
   |400        |invalid_client |Incorrect client ID or password.     |Verify client credentials     |
   |400        |Incorrect username or password.  |Check username and password.   |
   |400        |User pool client xxxxx does not exist.  |Confirm client ID in request body.   |
   |403        |Token has expired.     |Re-authenticate to obtain a new token.  |
   |403        |Access Denied for the requested resource.  |Verify model name and entitlement.  |
   |400        |Headers must contain tenant_id.   |Include `tenant_id` in request headers.       |
   |404        |No jobs found for jobId: xxxxx       |Check the job ID provided in the request.          |
   |400        |{\"temperature\": [\"max value is 1\"]}.    |Ensure temperature value is ≤ 1. Refer to AWS model-specific limits.   |
   |400        |{\"temperature\": [\"must be of float type\"]}.|Ensure temperature value is a float type.|
   |400        |Temperature must be between 0 and 1 for amazon-titan-text-lite.      |Ensure `temperature` value is between 0 and 1. Refer to AWS model-specific limits.|
   |400        |Temperature must be between 0 and 1 for anthropic-claude-3-haiku. |Ensure `temperature` value is between 0 and 1. Refer to AWS model-specific limits.|
   |400        |Temperature must be between 0 and 1 for meta-llama3-8b-instruct.  |Ensure `temperature` value is between 0 and 1. Refer to AWS model-specific limits.|
   |400        |Temperature must be between 0 and 1 for anthropic-claude-3-sonnet.      |Ensure `temperature` value is between 0 and 1. Refer to AWS model-specific limits.|
   |400        |Max tokens must be between 1 and 200000.                 |Adjust `maxTokens` value. Refer to AWS model-specific documentation.  |
   |400        |Max tokens must be between 1 and 4096.                        |Adjust `maxTokens` value. Refer to AWS model-specific documentation.              |
   |400        |Max tokens must be between 1 and 1000.                         |Adjust `maxTokens` value. Refer to AWS model-specific documentation.              |
   |400        |Max tokens must be between 1 and 4096 for anthropic-claude-3-haiku.          |Adjust `maxTokens` value. Refer to AWS model-specific documentation.    |
   |400        |Max tokens must be between 1 and 2048 for meta-llama3-8b-instruct.       |Adjust `maxTokens` value. Refer to AWS model-specific documentation.   |
   |400|{maxTokens": ["must be of integer type"]}."|Ensure `maxToken` value is an integer type.|
   |400        |Top-p must be between 0 and 1.   |Ensure `Top-p` value is between 0 and 1. Refer to AWS model-specific limits.      |
   |400        |Top-p must be between 0 and 1 for anthropic-claude-3-haiku.       |Ensure `Top-p` value is between 0 and 1. Refer to AWS model-specific limits.      |
   |400        |Top-k must be between 0 and 500.               |Ensure `Top-k` value is between 0 and 500. Refer to AWS model-specific limits.    |
   |400        |Top-k must be between 0 and 500 for anthropic-claude-3-haiku.      |Ensure `Top-k` value is between 0 and 1. Refer to AWS model-specific limits.      |
   |404        |Model identifier: anthropic-claude-3-sonnet-20240229 not found in registry      |Check the model identifier path paramenter given.             |
   |400        |Encoded file data is missing.                                                             |Check the encoded field data given in the request body.             |
   |400        |Invalid type provided, Allowed types INVOKE &#124; CONVERSE          |Check the `type` given.                                                    |
   |400        |Request type must be one of forms, tables, signature, layout, queries.       |Check the request type given.            |
   |400        |Queries missing for request type queries         |Check the request type queries given.    |
   |400        |An error occurred (InvalidParameterException) when calling the StartDocumentAnalysis operation: Request has invalid parameters|Check the request type queries given.|
   |400        |Prompt is missing                 |Check the body parameter.                |
   |500        |Something went wrong , please contact admin.        |Contact the admin.              |
   |400        |Method conversee not found in bedrock client          |Check the method type in body parameter.  |
   |400        |Method invoke_model not found in bedrock client                 |Check the method type in body parameter.        |
   |400        |methodName is missing in the request body.                                                                         |Check the method name given.  |
   |400        |Method xxxxx not found in bedrock client.                            |     Check the Method given.      |
   |400        |Unknown parameter in QueriesConfig.Queries[0]: "2"       |Check the `Quesries` value in `QueriesConfig`  |
   |400        |Request types must be one of forms,tables,signature,layout,queries.             |Check the request type given.       |
   |400        |An error occurred (InvalidParameterException) when calling the StartDocumentAnalysis operation: QueriesConfig must be used with QUERIES FeatureType. | When using the `QueriesConfig` parameter, user must include "QUERIES" in the `FeatureTypes` list.    |
   |400        |Queries missing for request type queries, forms,layout                                                             |Check the request type queries given.  |
   |400|An error occurred (InvalidParameterException) when calling the StartDocumentAnalysis operation: Duplicated Query text is detected. Query text is case-insensitive and initial/trailing whitespaces will be ignored.||
   |400        |The {TEXTRACT} feature is not available for this route. Please use the Textract convenience. or proxy route instead. |Use the Textract convenience or Textract proxy route.   |
   |400        |Model throttle exception: An error occurred (ValidationException) when calling the InvokeModel operation: messages.0.content.0.image.source.base64: image cannot be empty.|Check the `base64` attachment given.|
   |400        |amazon-titan-text-lite does not support image attachments.          |Remove the image or change the model.   |
   |400        |meta-llama3-8b-instruct does not support image attachments.     |Remove the image or change the model.        |
   |400        |Attachment Type must be one of: jpeg, png, gif, webp for CONVERSE.                                                 |Check the attachment type given.   |
   |400        |Attachment Type must be one of: jpeg, png, gif, webp for INVOKE.                                                   |Check the attachment type given.     |
   |400        |Attachment Type must be one of: png, jpeg, gif, webp for CONVERSE.                                                 |Check the attachment type given.  |
   |400        |Attachment Type must be one of: image/jpeg, image/png, image/gif, image/webp for invoke.                        |Check the attachment type given.   |
   |400        |Attachment Type must be one of: png, image.       |Check the attachment type given.       |
   |400        |Attachment Type must be one of: png, jpeg, jpg, pdf, tiff, tif.       |Check the attachment type given.    |
   |400        |Attachment type must be one of png, jpeg, pdf, gif, tiff, word.                         |Check the attachment type given.                  |
   |400|Invalid payload . Expected payload format - {chatHistory": ["unknown field"]}."|Check the payload given.|
   |400|Invalid payload . Expected payload format - {attachments": [{"document-name": ["unknown field"]}]}."|Check the payload given.|
   |400|Invalid payload : {attachments": ["The parameter 'documentName' is required when attachments is of type ['pdf, 'csv', 'doc','docx', 'xls','xlsx','html','txt','md']]}'|Include `documentName` while using attachment.|
   |400|Request payload must contain a body.|Include body while requesting through the endpoint.|
   |400        |Invalid type for parameter messages[0].content[1]. |   Check the parameter in messages[0].content[1]. Ensure to give the valid parameter.|
   |400        |Parameter validation failed: Unknown parameter in messages[0].content[0]: ab"|Check the parameter in messages[0].content[0]. Ensure to give the valid parameter.|
   |400        |Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: Input is too long for requested model. |Check the input size of the particular model. |
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: 1 validation error detected: Value 'system' at 'messages.1.member.role' failed to satisfy constraint: Member must satisfy enum value set: [user, assistant]||
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: This model doesn't support system messages. Try again without a system message or use a model that supports system messages.| Try again without a system message or use a model that supports system messages.|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: The model that you are using requires the last turn in the conversation to be a user message. Add a user message to the conversation and try again.|Add a user message to the conversation.|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: The maximum tokens you requested exceeds the model limit of 2048. Try again with a maximum tokens value that is lower than 2048.|Adjust `maxTokens` value. Refer to AWS model-specific documentation.  |
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: The detected filetype is PLAIN_TEXT, but the provided filetype was PDF.|if the file type is PDF, make sure the input file type is PDF|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: A text block must be included when using documents. Add a text block and retry your request.|Add a text block and retry your request.|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: The model returned the following errors: Input is too long for requested model.|Check the input of the particular model.|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: The document file name can only contain alphanumeric characters, whitespace characters, hyphens, parentheses, and square brackets. The name can't contain more than one consecutive whitespace character. Check that the file name conforms to these restrictions and retry your request.|Ensure the naming convension is followed for the document file name.|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: This model doesn't support the image content block that you provided. Update the content block and try again.|The model doesn't support the image content block provide. Check the image content block. |
   |400|Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: messages.0.content.0.image.source.base64.media_type: Input should be 'image/jpeg', 'image/png', 'image/gif' or 'image/webp'|Check the `media_type` provided in the request body.|
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: Unsupported MIME type: image/png. Retry your request with a supported file type: xlsx, txt, pdf, csv, md, doc, html, xls, docx|Check the MIME type and file type.|
   |400|Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: Malformed input request: #: subject must not be valid against schema {required":["messages"]}#: required key [anthropic_version] not found|Check the input mrequest provided.|
   |400|Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: system.0.type: Field required'|Include the required filed while using InvokeModel operation.|
   |400|Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: messages.0.content.1: Input tag 'document' found using 'type' does not match any of the expected tags: 'text', 'image', 'tool_use', 'tool_result'|check the input tag 'type'. it shpuld include the valid types.|
   |400|Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: messages: roles must alternate between user" and "assistant"||
   |400|Client exception: An error occurred (ValidationException) when calling the Converse operation: A conversation must start with a user message. Try again with a conversation that starts with a user message.|Include a user message while starting a conversation.|
   |400|Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: Malformed input request: extraneous key [messages] is not permitted, please reformat your input and try again.|Check the input provided.|
   |400|Parameter validation failed:Invalid number of parameters set for tagged union structure messages[0].content[0]. Can only set one of the following keys: text, image, document, toolUse, toolResult, guardContent. Unknown parameter in messages[0].content[0]:|Check the content in message field.| 
   |400|Parameter validation failed: Unknown parameter in input: anthropic_version"|Check the anthropic version given.|
   |400|Parameter validation failed: Unknown parameter in input: max_tokens"|Check the input given.|
   |400|Invalid type for parameter inferenceConfig.stopSequences|Check the parameter in inferenceConfig.stopSequences.|
   |400|Parameter validation failed: Missing required parameter in messages[0].content[1].document: name""|Include the document name in the request body.|
   |400|Parameter validation failed: Unknown parameter in input: featureTypes"|Check the input parameter given.|
   |400|Unknown parameter in input: ""|Check the input parameter given.|





			
### Error Handling
Even when an invalid file format is submitted, the system may return a `200 OK` HTTP status, indicating that the request was received and processed. However, the actual error details will be present in the response body.

**Best Practices**:

- Always inspect the jobStatus field for `"Error"` status.
- Review the errorMessage field for detailed failure reasons.
- Fields such as completionTS, processingTS, and outputSize may be null in error scenarios.

> **Example Response**:
```json
{
    "jobId": "anthropic.claude-3-haiku-20240307-v1:0_******",
    "jobStatus": "Error",
    "tenantId": "12345678",
    "modelId": "anthropic.claude-3-haiku-20240307-v1:0",
    "createdTS": "2025-08-11T07:20:50.273Z",
    "completionTS": null,
    "queuedTS": "2025-08-11T07:20:50.540Z",
    "processingTS": null,
    "cancellationTS": null,
    "inputSize": null,
    "outputSize": null,
    "inputTokens": null,
    "outputTokens": null,
    "pageCount": null,
    "textractType": null,
    "cancellation_status": null,
    "errorMessage": "Client exception: An error occurred (ValidationException) when calling the InvokeModel operation: messages.0.content.0.image.source.base64.media_type: Input should be 'image/jpeg', 'image/png', 'image/gif' or 'image/webp'",
    "servedAt": null
}
```
!!!note "**What to check:**"
    - `jobStatus`: will be `"Error"` for invalid file format.
    - `errorMessage`: Contains the reason for failure and the expected formats.
    - `completionTS`, `processingTS`, and other fields may be null in error cases.