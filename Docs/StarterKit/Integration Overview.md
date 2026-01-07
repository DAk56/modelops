




<!-- already avaialable in onboarding
## Prerequisites
Before proceeding to use the APIs a user must have the following details:

- **Model Identifier**: what models the users are going to use. To know more about it, refer the [Models Supported](Appendix.md#appendix-supported-models-and-input-file-types) section.
- **Tenant ID**: ModelOps team will provide the details to the client. This needs to be included while invoking the model.
- **User/Client credentials**: Obtain credentials from the ModelOps team to authenticate and access services.
- **Model Entitlement**: the user must be entitled to the models that are being requested to get the information.
-->
## Integration Overview


All API requests follow a consistent structure, including:

- HTTP method (e.g., GET, POST)
- Endpoint path
- Request headers
- Authentication tokens
- Query and body parameters (as applicable)

### Authentication
ModelOps uses Amazon Cognito User Pools for secure, token-based authentication.

The process involves:

1. Submitting a username and password to the authentication endpoint.
2. Receiving a JWT access token upon successful authentication.

Include the access token and tenant ID in all subsequent API requests. For detailed implementation, refer to the [Authentication APIs](Authentication APIs.md) section. 

### API Endpoint structure
ModelOps APIs are organized into functional endpoints. Each endpoint serves a specific purpose and may require path parameters.

Example endpoint:

`/v1/models/bedrock/{{model_identifier}}`

Curly brackets `{}` denote required path parameters that must be replaced with actual values.

**Path parameters**

|Path Parameter|	Description|
|:-|:-|
|{{model_identifier}}	|Name of the model to invoke|
|{{model_id}}|	Unique ID of the model|
|{{jobId}}	|ID of the job being tracked|
|{{userAccessToken}}|	JWT token obtained during authentication|


### Body Parameters
Body parameters are used to pass additional data to the API. These may be required or optional depending on the endpoint. 

Example:

In the Bedrock convenience API, users must include a prompt in the request body. Additional parameters such as type and attachments may also be included. Refer to the [swagger documentation](Swagger/Swagger.md) for a complete list of body parameters.
 
### Headers
Headers provide metadata about the request and are essential for authentication and routing. 

**Required Headers**: 

- `Authorization`
Include the JWT access token in all API requests (except for User Credentials and Client Credentials endpoints).

- `tenant_id`
Required in all POST requests that invoke models when using a token obtained via the User Credentials API.
