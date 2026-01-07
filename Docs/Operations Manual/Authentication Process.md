ModelOps Admin APIs require secure access via user-level authentication. Users must first obtain an access token using the `https://cognito-idp.amazonaws.com/` endpoint.

However, access to Admin APIs is restricted to users who have been explicitly assigned the `MO_Admin` role.

!!!note
    The access token must be included in the `Authorization` header as:

    - `Authorization: Bearer <access_token>`
    - Users without the `MO_Admin` role will not be authorized to invoke Admin APIs.



1. Verify Role Assignment

    The user can use `https://cognito-idp.amazonaws.com/` endpoint to obtain a user access token. The system will validate that the token belongs to a user with the MO_Admin role.

2. Access Admin APIs

    With the valid token and assigned role, the user can now invoke ModelOps Admin APIs.