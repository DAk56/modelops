> ### Get Public key API

**Purpose**:

Use this API to retrieve the latest public key used by ModelOps for verifying the authenticity of callback signatures. This key is essential for validating signatures in secure communication workflows.

**Endpoint**:

  `/v1/public/key`

**Request**:

Send a GET request to the given endpoint.

  - Header:
       - `Authorization`: Insert the Bearer token.

!!!note
    The public key is used to verify the signature of callbacks sent by ModelOps. Ensure your service validates the signature using the provided key and algorithm to maintain trust and integrity.

**Response**:

```json
{
    "keySpecification": "ECC_NIST_P256",
    "publicKey": "-----BEGIN PUBLIC KEY-----\nxxxxxxxxxxxx\n-----END PUBLIC KEY-----",
    "signingAlgorithms": [
        "ECDSA_SHA_256"
    ]
}
```
***Signature Verification Example***:

To verify the authenticity of callbacks sent by ModelOps, use the public key retrieved from the Get Public Key API and the following Python script. This ensures the payload was signed by ModelOps and has not been tampered with.

**Python Script**:

```py
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec, utils
from cryptography.exceptions import InvalidSignature
import base64
import json
import hashlib
 
# Replace with the actual public key string from /v1/public/key
public_key = """-----BEGIN PUBLIC KEY-----
<insert-public-key-here>
-----END PUBLIC KEY-----"""

# Load the public key
public_key = serialization.load_pem_public_key(public_key.encode("utf-8")

# Replace with the actual payload received in the callback
payload_body={}

# Prepare the message and hash it
message = json.dumps(payload_body, separators=(',', ':')).encode('utf-8')
message = hashlib.sha256(message).digest()


# Replace with the base64-encoded signature from the callback header
signature_b64 = ""
signature = base64.b64decode(signature_b64)

# Verify the signature
try:
    public_key.verify(
        signature,
        message,
        ec.ECDSA(utils.Prehashed(hashes.SHA256()))
    )
    print("Signature is valid")
except InvalidSignature:
    print("Signature is invalid")

```
!!!Notes
    - Ensure the payload_body matches the exact structure and content of the callback payload.
    - The signature_b64 should be extracted from the callback header (e.g., x-signature).
    - This script uses ECDSA with SHA-256, as specified in the public key metadata.

> ### Get Health details API

**Purpose**:

Provides a quick way to check if the ModelOps APIs and services are operational.

**Endpoint**:

  `/v1/health`

**Request**:

Send a GET request to the given endpoint.

**Response**:

```
ok
```
