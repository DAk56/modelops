1. Can I use the same token for multiple requests?
    
    *Yes. Tokens are valid for 60 minutes. Reuse them until expiry to avoid unnecessary authentication calls.*
 
2. What should I do if the model response is slow?
    
    *AI models may take 1–10 seconds depending on input complexity. Avoid retrying or polling too frequently—wait before checking job status.*
 
3. Is there a way to know which model suits my use case?
    
    *Yes. Refer to the model registry or documentation for model capabilities, ideal use cases, and performance benchmarks.*
 
4. Can I use multiple models in one request?
    
    *No. Each request should target a single model. If you need outputs from multiple models, invoke them separately.*
 
5. What happens if I send unsupported input formats?
    
    *The API will return a validation error. Ensure your input matches the expected schema (e.g., JSON, base64 for images).*
 
6. Are the AI outputs always accurate?
    
    *No. AI responses are probabilistic and may contain errors. Always validate outputs before using them in production or decision-making.*
 
7. Can I customize the model behavior or output format?
    
    *No. Model behavior and output format are predefined. Users should focus on writing better prompts to guide the model effectively*
 
8. How do I report a bug or unexpected behavior?
    
    *Contact support with the request ID, model name, input payload, and timestamp. This helps in faster debugging.*
 
9. Can I monitor my usage and performance metrics?
    
    *Yes. Usage metrics and logs are available via the monitoring dashboard or API endpoints (if enabled for your account).*
 
10. Is my data stored or logged by the gateway?
    
    *No. ModelOps does not log input or output data. All tenant data is fully segregated, ensuring privacy and isolation across users and environments.*
 
11. What should I do if I hit rate limits?
    
    *Wait and retry after some time. If you consistently hit limits, contact support to discuss quota adjustments.*

12. My Client ID and Secret are compromised. What should I do?
    
    *Immediately report the incident to admin. Only admins have the authority to revoke and regenerate credentials. Do not use the compromised credentials further.*

13. How can I get access to a new model?
    
    *Access to models is managed by the ModelOps admin team. Please contact them to request access to any additional models not currently available to you.*

14. How long is my response retained in ModelOps?
    
    *By default, responses are retained for 1 day. If you require a different retention period, please contact the ModelOps admin team to request a configuration change.*