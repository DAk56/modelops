1. How do I access the ModelOps monitoring dashboard?

    *To access the dashboard, log in to Amazon QuickSight, navigate to the Dashboards tab, and select TenantBased Metrics.*

2. What does the “Model Usage (API Calls)” chart tell me?

    *It shows which models are most frequently used across tenants. This helps identify popular models and informs decisions about onboarding or deboarding models.*

3. How can I monitor model reliability?

    *Use the ***Model Success Rate*** and ***Call Status by Tenant*** charts to track success vs. error rates. These help identify tenants or models with frequent failures and support SLA monitoring.*

4. How do I identify cost-heavy tenants or models?

    *Charts like ***Cost by Model***, ***Cost by Tenant by Model***, and ***Bedrock vs Textract Cost Distribution*** help attribute costs and identify high-cost areas for budgeting and optimization.*

5. What should I do if a tenant has low success rates?

    *Investigate using the ***Model Success Rate by Tenant*** and ***Call Status by Tenant*** charts. Check for integration issues, model compatibility, or data quality problems.*

6. How do I know if a tenant needs a quota adjustment?

    *Refer to the ***Assigned Quota vs Consumed Quota by Tenant*** chart. If a tenant consistently hits or exceeds their quota, consider increasing it. If usage is low, reduce excess quota.*

7. Which models are most widely adopted?

    *The ***AI Model Adoption by No. of Tenants*** chart shows which models are used by the most tenants. This helps prioritize support and capacity planning.*

8. Can I correlate cost with tenant revenue?

    *Yes. Use ***Bedrock vs Textract Cost by Tenant*** to compare costs across tenants. This can help assess ROI and guide decisions on resource allocation.*