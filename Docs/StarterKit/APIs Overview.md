## API Overview

ModelOps exposes a RESTful API interface with secured endpoints, accessible exclusively within the Maximus VPN. All communications are encrypted and authenticated to ensure safe interaction with AI services and resources.

## Accessing ModelOps APIs

To integrate with ModelOps services, users must utilize the following API endpoints.

> ### Base URL

 1. **Core API Endpoints**

    Use the following base URL to access the Invoke, Jobs, and AI Model APIs: 
 
     `http://prod.modelops.maximus.com/`

 2. **Authentication API Endpoints**

    Authentication applies when accessing ModelOps APIs. Based on the selected authentication method, use one of the following endpoints:

    |Authentication Type|Endpoint URL|
    |:-|:-|
    |Client Credentials API|`https://dev-modelops.auth.ap-south-1.amazoncognito.com/oauth2/token`|
    |User Credentials API|`https://cognito-idp.ap-south-1.amazonaws.com/`|



## API Usage Overview
Interaction with ModelOps functionality involves the use of the APIs listed above. These endpoints support operations such as:

- Authenticating users and clients
- Invoking AI models
- Managing job executions

Refer to the respective API documentation for details on request formats, authentication headers, and response structures.

