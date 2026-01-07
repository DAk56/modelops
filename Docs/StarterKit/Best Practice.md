


<!--### Rate Limits Overview
   |Limit Type	|Value|	Description|
   |:-|:-|:-|
   |Rate Limit	|1000|	Max number of requests allowed per second (steady rate).|
   |Burst Limit|	1000|	Max number of requests allowed in a short burst (e.g., sudden spike).|
   |Quota Limit|	1000|	Total number of requests allowed in the quota period.|
   |Quota Period|	DAY	|Time window for the quota limit. It can be DAY, WEEK, or MONTH.|
-->

- **Reuse authentication tokens**: Tokens are valid for 60 minutes. Avoid generating a new token for every API call to reduce overhead and improve performance.
- **Protect credentials**: Never share your Client ID or Client Secret. Treat them as sensitive credentials and store them securely.
- **Avoid excessive polling**: AI response generation may take 1–10 seconds. Poll the `/jobs` endpoint judiciously to prevent unnecessary load.
- **Monitor usage**: Track request volume and performance metrics. Avoid sending rapid or excessive requests that may lead to throttling or degraded service.
- **Choose the right model**: Select models based on task requirements. Avoid defaulting to the most advanced model if a simpler one suffices.
- **Validate outputs**: Always review AI-generated responses before using them in critical decisions. Do not rely on them blindly.
- **Follow input schema strictly**: Adhering to the defined schema ensures consistent results and minimizes errors.
- **Handle errors gracefully**: Check API response status codes and implement appropriate retry logic. Avoid blind retries on failures.
- **Avoid sending sensitive data**: Unless the model and gateway are certified for handling confidential information, refrain from transmitting sensitive content.
- **Refer to API documentation**: Always consult the official documentation for model capabilities, input formats, and usage examples to ensure correct implementation.

