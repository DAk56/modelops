The Tenant Metrics tab provides a tenant-centric view of platform activity and performance. It helps teams track usage, reliability, and efficiency for each tenant, understand which models and users drive the workload, and quickly identify anomalies (e.g., error spikes, latency regressions, token surges). Use this tab for showback/chargeback, SLA monitoring, and operational triage at the tenant level.

#### Navigate to *Tenant Matirces* tab:

Click **Tenant Metrices** located in the top banner of the QuickSight dashboard.

![Tenant Metrics](Images/Tenant%20Metrics%20tab.png)

> ### Definitions

- **Overall Tenants**:

    The total number of tenants registered in the system, regardless of their activity status.

- **Overall Active Tenants**:

    The number of tenants that have made at least one API call or consumed resources within the selected date range. (***need info***)

- **Overall Inactive Tenants**:

    The number of tenants that have not made any API calls or consumed resources during the selected period.

- **Tenants by Selection**:

    The number of tenants included after applying filters (e.g., by model, date range).

- **Total Assigned Quota (Monthly)**:

    Total monthly quota allocated to the tenants as per the applied filters.

- **Total Consumed Quota (Monthly)**:

    The total amount of quota actually used by tenants as per the applied filters.

- **Avg. Rate Limit**:

    The average number of requests per second allowed for tenants based on their assigned rate limits.

- **Avg. Burst Limit**:

    The average maximum number of requests allowed in a short burst for tenants.

- **Processed Page Count**:

    The total number of document pages processed (e.g., via Textract) by all tenants in the selected period.


> ### Charts in Tenant Metrics tab

#### **AI Model Adoption by No. of Tenants**:

AI Model Adoption by No. of Tenants displays number of tenants that have adopted each AI model.

![AI Model Adoption by No. of Tenants](Images/AI%20Model%20Adoption%20by%20No.%20of%20Tenants.png)

- Helps identify popular models for capacity planning and support focus.

#### **Model Success Rate by Tenant**:

Model Success Rate by Tenant displays success rate (%) of API calls for each tenant.

![Model Success Rate by Tenant](Images/Model%20Success%20Rate%20by%20Tenant.png)

- Help teams monitor SLAs and troubleshoot issues proactively.

#### **Models Usage (API Calls) by Tenant**:

Models Usage (API Calls) by Tenant displays number of API calls per tenant, broken down by model.

![Models Usage (API Calls) by Tenant](Images/Models%20Usage%20(API%20calls)%20by%20Tenant.png)

- Helps on usage analysis and resource optimization.

#### **Pages Processed by Tenant**:

Pages Processed by Tenant displays number of document pages processed by each tenant for Textract model.

![Pages Processed by Tenant](Images/Pages%20Processed%20by%20Tenant.png)

- Helps track OCR workload and cost attribution.

#### **Input Tokens vs Output Tokens by Tenant**:

Input Tokens vs Output Tokens by Tenant displays input tokens and output tokens per tenant, with total tokens as a line

![Input Tokens vs Output Tokens by Tenant](Images/Input%20Tokens%20vs%20Output%20Tokens%20by%20Tenant.png)

- Helps identifying tenants with high token usage. Tenants with high token usage drive cost; output-heavy tenants may need max token limits.

#### **Bedrock Cost vs Textract Cost by Tenant**:

Bedrock Cost vs Textract Cost by Tenant displays total cost per tenant for Bedrock and Textract.

![Bedrock Cost vs Textract Cost by Tenant](Images/Bedrock%20Cost%20vs%20Textract%20Cost%20by%20Tenant.png)

- Enables cost analysis and optimization.

#### **Avg Bedrock Cost vs Avg Textract Cost by Tenant**:

Avg Bedrock Cost vs Avg Textract Cost by Tenant displays average cost per tenant for Bedrock and Textract.

![Avg Bedrock Cost vs Avg Textract Cost by Tenant](Images/Avg%20Bedrock%20Cost%20vs%20Avg%20Textract%20Cost%20by%20Tenant.png)

- Helps normalize spend across tenants with different activity levels.

#### **Avg Queue Time vs Avg Response Time by Tenant**:

Avg Queue Time vs Avg Response Time by Tenant displays average queue time and response time per tenant

![Avg Queue Time vs Avg Response Time by Tenant](Images/Avg%20Queue%20Time%20vs%20Avg%20Response%20Time%20by%20Tenant.png)


- Useful for performance tuning and SLA compliance.

#### **Call Status by Tenant**:

Call Status by Tenant displays the distribution of API call statuses for each tenant, helping identify activity levels and error patterns across tenants.
    
![Call Status by Tenant](Images/Call%20Status%20by%20Tenant.png)

- Help teams monitor reliability and troubleshoot issues proactively.


#### **Assigned Quota vs Consumed Quota by Tenant**:

Assigned Quota vs Consumed Quota by Tenant displays how much quota has been assigned to each tenant versus how much was consumed in the selected period, enabling quick assessment of under‑utilization or over‑consumption risk.

![Assigned Quota vs Consumed Quota by Tenant](Images/Assigned%20Quota%20vs%20Consumed%20Quota%20by%20Tenant.png)

- Enables proactive capacity planning and cost optimization.
