## Use Case: Bedrock Model Invocation via Convenience and Proxy Routes
This section demonstrates how to send a prompt to a Bedrock-hosted model using either the **Convenience Route API** or the **Proxy Route API**, and retrieve the generated response. Both flows involve submitting a prompt, monitoring job status, and fetching the output once processing is complete.

### Assumptions
- The user is entitled to the model specified in the `model_identifier` or `model_id` path parameter.
- A valid access token has been obtained via the User Credentials API.

### Authentication and Authorization
To begin, authenticate using the appropriate Authentication API. Refer [Authentication APIs](Authentication APIs.md) for more information.

Once authentication completes:

- Include the access token in the `Authorization` header of all subsequent requests.
- Include the `tenant_id` header to identify the project or client context.

 For header specifications, refer [Model Invocation APIs](Model Invocation APIs.md).

> ### Use Case 1: Convenience Route API – Resume Analysis

#### Overview

This flow uses the Convenience Route API to extract insights from a resume and generate a job suitability summary.

#### Endpoints Used
For this use case we have used following endpoints.

|Action	|Endpoint|
|:-|:-|
|Submit Prompt to model	|`POST../v1/models/bedrock/{{model_identifier}}`|
|Check job status|	`GET.. /v1/jobs/{{jobId}}`|
|Retrieve output data|	`GET.. /v1/jobs/{{jobId}}/data`|


#### Request example
```json
{
  "prompt": " Extract the data from the given resume and give me a summary on what kind of job they are suitable for?",
  "type":"converse",
  "attachments":{
    "type": "pdf",
    "documentName":"resume",
    "base64EncodedData": “iVBORw0KGg ... FTkSuQmCC”
  }
  
}
```

#### Response example
```json
{
    "content": [
        {
            "type": "text",
            "text": " Based on the information provided in the various resume samples, the candidate appears to be suitable for the following types of positions:\n\n1. Functional/Experienced Resume (IM A. SAMPLE I):\n   - Accounting and financial management roles, such as accountant, financial analyst, or bookkeeper\n   - Positions that require strong analytical and problem-solving skills, as well as proficiency in information systems and technology\n\n2. Chronological/Internship Resume (IM A. SAMPLE II):\n   - Marketing, public relations, or other business-related internships or entry-level positions\n   - Roles that require excellent communication skills, including customer service, sales, or administrative support\n\n3. Chronological Resume (IM A. SAMPLE III):\n   - Customer service, client relations, or supervisory roles in a business or corporate setting\n   - Human resources or management positions that involve staffing, training, and performance management\n\n4. Functional Resume (IM A. SAMPLE IV):\n   - Market research, financial analysis, or other data-driven roles that require strong analytical and technical skills\n   - Positions that involve problem-solving, data analysis, and the use of statistical software and programming languages\n\n5. Functional/Military Resume (IM A. SAMPLE V):\n   - Management, leadership, or training positions in a corporate or military environment\n   - Roles that require excellent communication, interpersonal, and problem-solving skills\n\n6. Chronological/Managerial Resume (IM A. SAMPLE VI):\n   - Supervisory or managerial roles in information systems, operations, or project management\n   - Technical or IT positions that involve systems analysis, software development, and customer support\n\n7. Chronological/Graduate Assistantship (IM A. SAMPLE VII):\n   - Graduate assistantship or research assistant positions in the fields of psychology, counseling, or social services\n   - Roles that involve tutoring, testing, or providing support to college students\n\n8. Chronological/Computer-Technical Resume (IM A. SAMPLE VIII):\n   - IT support, computer technician, or systems administration roles\n   - Positions that require proficiency in programming languages, database management, and technical troubleshooting\n\n9. Functional Resume (IM A. SAMPLE IX):\n   - Human resources, employee relations, or customer service positions\n   - Roles that involve analysis, problem-solving, and effective communication with clients or customers\n\n10. Chronological/Human-Social Service Resume (IM A. SAMPLE X):\n    - Social service, human services, or healthcare-related positions, such as case manager, rehabilitation specialist, or activities coordinator\n    - Roles that involve working directly with clients, facilitating group activities, and providing support and advocacy\n\nOverall, the candidates appear to have a diverse range of skills and experience that could be tailored to various professional fields, including accounting, finance, marketing, human resources, information technology, and human/social services."
        }
    ]
}
```

> ### Use Case 2: Proxy Route API – Resume Analysis with Custom Parameters

#### Overview

This flow uses the Proxy Route API to invoke a specific Bedrock model with custom configuration, allowing more control over the prompt and model behavior.

#### Endpoints Used
For this use case we have used following endpoints.

|Action	|Endpoint|
|:-|:-|
|Submit Prompt to model	|`POST../v1/proxy/aws/bedrock/{{model_id}}`|
|Check job status|	`GET.. /v1/jobs/{{jobId}}`|
|Retrieve output data|	`GET.. /v1/jobs/{{jobId}}/data`|

!!!note
    `anthropic.claude-3-sonnet-20240229-v1:0` model id is used for the following request.


#### Request example
```json
{
        "methodName": "converse",
        "tags": {
            "new1":"test1"
        },
        "parameters": {
            "body": {
               "inferenceConfig":{
                "maxTokens":  4096,
                "temperature": 0.5
               },
               
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {

                                "text": "Extract the data from the given resume and give me a summary on what kind of job they are suitable for?"
                            },
                            {
                                "type":"document",
                                "document":
                                {
                                  "format":"pdf",
                                  "name":"Resume",
                                  "source":{
                                    "bytes":"JVBERi0xLjYNJeLjz9MNCjc...MTYNCiUlRU9GDQo="
                                  }  
                                }
                            }
                            
                    
                    ]
                    }
                    
                    
                ]
            }
        }
   
}
 
```

#### Response example
```json
{
    "ResponseMetadata": {
        "RequestId": "1da5df47-3946-4224-b389-6376ca29bc4a",
        "HTTPStatusCode": 200,
        "HTTPHeaders": {
            "date": "Tue, 02 Sep 2025 10:46:07 GMT",
            "content-type": "application/json",
            "content-length": "2547",
            "connection": "keep-alive",
            "x-amzn-requestid": "1da5df47-3946-4224-b389-6376ca29bc4a"
        },
        "RetryAttempts": 0
    },
    "output": {
        "message": {
            "role": "assistant",
            "content": [
                {
                    "text": "Based on the information provided in the resume samples, the candidate appears to be suitable for the following types of jobs:\n\n1. Functional (Experienced) Resume (IM A. SAMPLE I):\n   - Accounting and financial management roles, such as accountant, financial analyst, or financial manager\n   - Positions that require strong analytical and problem-solving skills, as well as expertise in information systems and technology\n\n2. Chronological (Internship) Resume (IM A. SAMPLE II):\n   - Marketing, public relations, or related positions that require excellent communication skills and a strong academic background\n\n3. Chronological Resume (IM A. SAMPLE III):\n   - Customer service, client relations, or supervisory roles that involve managing teams and ensuring high levels of customer satisfaction\n\n4. Functional Resume (IM A. SAMPLE IV):\n   - Market research, financial analysis, or other positions that require strong technical skills, mathematical/statistical expertise, and problem-solving abilities\n\n5. Functional (Military) Resume (IM A. SAMPLE V):\n   - Management, training, and employee development roles that leverage the candidate's extensive experience in leadership, administration, and communication\n\n6. Chronological (Managerial) Resume (IM A. SAMPLE VI):\n   - Supervisory or managerial positions in information systems, technology, or related fields that require a combination of technical expertise and strong management skills\n\n7. Chronological (Graduate Assistantship) Resume (IM A. SAMPLE VII):\n   - Graduate assistantship or other roles in higher education that involve providing academic support, tutoring, and research assistance to students\n\n8. Chronological (Computer/Technical) Resume (IM A. SAMPLE VIII):\n   - Information systems, technical support, or computer-related positions that leverage the candidate's strong technical skills and background\n\n9. Functional Resume (IM A. SAMPLE IX):\n   - Human resources administration, employee relations, or customer service roles that require excellent problem-solving, communication, and interpersonal skills\n\n10. Chronological (Human/Social Service) Resume (IM A. SAMPLE X):\n    - Positions in human/social service administration, case management, or related fields that utilize the candidate's academic background, experience, and strong interpersonal skills."
                }
            ]
        }
    },
    "stopReason": "end_turn",
    "usage": {
        "inputTokens": 6659,
        "outputTokens": 506,
        "totalTokens": 7165
    },
    "metrics": {
        "latencyMs": 5997
    }
}
```

### Process Flow

   1. Submit Prompt

      The user sends a prompt to the model via the invocation APIs. The response includes a `jobId`.

   2. Monitor

     Use the Get Job by Job ID API to check the status of the job. Possible statuses include `Open`, `Queued`, `Processing`, `Completed`, `Served`, or `Error`.

   3. Retrieve Output

     Once the job status is `Completed`, use the Get Data API to fetch the response. The output is returned in `JSON` format.

!!!note
    - When using the **Convenience route**, the model can be changed by just updating the `model_identifier` path parameter before sending the request.
    - When using the **Proxy route**, changing the model requires updating both the `model_id` and the request body according to the target model's specifications. If the required structure is not provided, the model returns an error.
        - For details on the expected request body, refer to the documentation specific to the selected model.