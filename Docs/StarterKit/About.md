ModelOps is a managed framework designed to simplify the deployment, operation, and governance of AI/ML models across enterprise environments. It addresses common challenges in AI adoption, such as:

- Complex infrastructure setup
- Fragmented tooling and disconnected workflows
- Limited scalability across teams and projects

By abstracting operational complexity, ModelOps enables projects to accelerate AI integration while maintaining control, security, and performance.

This document serves as a technical guide for developers, system integrators, and end users responsible for implementing and interacting with ModelOps APIs. It outlines integration workflows, usage patterns, and configuration requirements to ensure successful adoption.

## Key Benefits

ModelOps serves as a foundational platform that empowers internal AI initiatives with scalable, secure, and cost-effective capabilities. By centralizing governance and streamlining lifecycle management, it enables project teams to focus on innovation rather than infrastructure. Key benefits include:

- **Reduced Operational Costs**: By consolidating infrastructure and automating backend processes, ModelOps minimizes the need for project-specific setup and maintenance.
- **Built-in Security & Privacy**: Each project operates within a secure, multitenant environment, ensuring data protection and compliance without additional setup.
- **Increased scalability**: ModelOps dynamically adjusts to the evolving needs of individual projects, supporting everything from pilot models to production-scale workflows.
- **Reusable AI Services**: Teams can access pre-integrated models—including AWS Bedrock and Textract—through a unified API, accelerating development and reducing duplication.
- **Centralized Lifecycle Management**: Centralized tools for versioning, auditing, and monitoring help maintain quality and traceability across all stages of AI development.
- **Automated Orchestration**: ModelOps handles backend orchestration, allowing project teams to integrate and deploy AI resources with minimal manual effort.


## Features
ModelOps offers a comprehensive set of features designed to support flexible, scalable, and enterprise-grade AI integration across internal projects. Its modular architecture, support for foundational services, and developer-friendly APIs make it a powerful platform for building and managing AI workflows.

### Multi-Model Support
ModelOps provides built-in support for multiple AI models and services, enabling flexible deployment across diverse use cases and domains.

**Supported Services**:

- **AWS Bedrock** – for generative AI capabilities using foundation models.
- **AWS Textract** – for optical character recognition (OCR) and document processing.

**Extensibility**:

The framework is designed to be extensible, allowing seamless integration of additional models and services as needed.

**Input Flexibility**:

ModelOps supports a wide range of file formats as input, enabling users to process structured and unstructured data efficiently across supported models.

### Asynchronous Job Processing
ModelOps supports asynchronous job submission to efficiently handle time-intensive AI tasks such as document parsing and large-scale text generation.

- **Background Execution**: Submitted jobs are queued and processed asynchronously, allowing the system to manage workloads without blocking client operations.
- **Result Delivery**: Upon completion, results are returned via configurable mechanisms, including callback URLs or polling endpoints.
- **Scalability**: This approach enables high-throughput processing and improved responsiveness for applications integrating with ModelOps.

### Project-Level Usage Tracking
ModelOps tracks each API request using a **tenant identifier**(tenant_Id), which maps the request to a specific project. This enables internal teams to:

- **Attribute usage accurately** to the correct project
- **Generate billing reports** based on job-level consumption
- **Support cost allocation** across departments or initiatives

This mechanism ensures that every job is traceable to its originating project, allowing for precise usage monitoring and financial accountability across internal systems.

### Flexible API Styles
ModelOps supports two distinct API styles to accommodate varying levels of developer control and integration complexity:

- **Convenience APIs**
Designed for ease of use, these APIs abstract low-level implementation details and streamline common operations such as text extraction and model invocation. Ideal for rapid development and simplified workflows.
- **Proxy APIs**
Provide direct access to underlying services, enabling developers to customize requests and handle responses with fine-grained control. Suitable for advanced use cases requiring detailed configuration and response handling.

## Billing Model

Each tenant is billed based on actual usage of AI models and underlying AWS infrastructure. Charges are calculated from two primary sources:

 - **Model Usage**: Includes invocation of foundation models such as AWS Bedrock and Textract, measured by the number of requests, data volume, and processing time.
 - **Infrastructure Consumption**: Covers compute, storage, and network resources provisioned during job execution, including asynchronous processing and orchestration overhead.

## How ModelOps works
![ModelOps Process](images\ModelOps process diagram.svg)

1. The application connects to the ModelOps tenant environment using an API key.
2. Input data is securely routed to the selected AI service.
3. The AI model processes the input and returns the output to the application.
4. ModelOps enforces security, usage limits, and retention policies throughout the process.

**Model selection**

Users can select a preferred model for utilization. ModelOps currently supports core Amazon Bedrock foundation models as well as Amazon Textract. For a detailed list of supported models, refer to the [Model reference table](Model Invocation APIs.md#model-reference-table) section.


**ModelOps Workflow**

The standard workflow for interacting with ModelOps APIs includes the following steps.

1. **Authenticate**: Submit user credentials (username and password) to obtain an access token.
2. **Invoke a Model**: Send input data to the selected model and receive a unique Job ID.
3. **Track the Job**: Watch its process.
4. **Retrieve Results**: Once the status is Completed, get the output.

ModelOps provides a suite of APIs to facilitate each step of this workflow.