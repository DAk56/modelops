To interact with ModelOps services, users must first authenticate using one of the supported authentication APIs. ModelOps leverages AWS Cognito to issue secure access tokens for both system-level and user-level access.

> ### Client Credentials API

**Purpose**:

Enables system-to-system authentication. This method is ideal for backend services or applications that require access without user interaction.

**Request**: 

Send a POST request to the endpoint given along with client_Id and client_Secret.

**Response**:

A basic auth token gets generated.

> ### User Credentials API

**Purpose**:

Enables authentication for individual users through human interaction. This method supports scenarios where users log in using a username and password.

!!!Note
    The bearer access token is valid for 3600 seconds.

**Request**:

Send a POST request to the end point given. The body of the request will be of following format.

```json
        {
            "AuthFlow": "USER_PASSWORD_AUTH",
            "ClientId": "xxxxxxx",
            "AuthParameters": {
                "USERNAME": "xxxxxxx",
                "PASSWORD": "xxxxxxx"
            }
        }
```        
**Response**:

A Bearer token gets generated in the following format.

```json
        {
            "AuthenticationResult": {
                "AccessToken": "xxxxxxxx",
                "ExpiresIn": 3600,
                "IdToken": "xxxxxx",
                "RefreshToken": "xxxxxxx",
                "TokenType": "Bearer"
            },
            "ChallengeParameters": {}
        }
```