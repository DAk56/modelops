<!--## Appendix: Supported Models and Input File Types

 will move to swagger

**Input file formats**

ModelOps APIs support the following input file formats:

|Service	|Supported File Types|
|:-|:-|
|Textract|	png, jpeg, jpg, tiff, tif, pdf|
|Bedrock (type: Converse)|	pdf, csv, doc, docx, xls, xlsx, html, txt, md|
|Bedrock (type: Invoke)|	jepg, png, gif, webp|


 
**Textract Method Types**

Textract supports following extraction methods:

- **forms** – Extracts key-value pairs from structured documents.
- **tables** – Detects and extracts tabular data.
- **signatures** – Identifies signatures.
- **layout** – Captures document layout and structure.
- **queries** – Allows custom queries to extract specific information.

**Attachment Requirements**

- **Encoding**: All attachments must be sent as Base64-encoded strings within the attachments field of the request payload.
- **Size Limits**: Refer to the AWS documentation for model-specific restrictions on image and PDF file sizes.
-->


