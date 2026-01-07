The User Metrics tab provides detailed insights into how users and tenants interact with AI models within the platform. It helps administrators and stakeholders monitor usage patterns, performance, and resource consumption at a granular level.

#### Navigate to *User Metrics* tab:

Click **User Metrics** located in the top banner of the QuickSight dashboard.

![User metrics](Images/User%20metrics.png)

The tab presents a table where data is displayed per model for each user or tenant. The table includes the following columns:

- **User Name / Tenant Name** – Name of the user or tenant.

- **Model Name** – AI model associated with the user or tenant.

- **Requests** – Total number of requests sent for the model.

- **Avg Queue Time (sec)** – Average time (in seconds) a request spends in the queue before processing.

- **Avg Resp. Time (sec)** – Average time (in seconds) taken to process and return a response.

- **Total Tokens** – Total tokens consumed by the model for processing requests.

- **Pages Processed** – Number of pages processed by the model (for document-based models like Textract).

- **Cancelled Requests** – Number of requests that were canceled.

- **Success %** – Percentage of successfully processed requests.


At the end of the table, aggregate totals are displayed for each numeric column, providing a quick summary of overall usage and performance.

>##### Creating an Alert for a Table Cell

1. In the User Metrics table, click the cell for which you want to create an alert.
2. Select **Create Alert**.
3. For the remaining steps, refer to Step 2 onward in [Creating an Automatic Alert](Dashboard Layout Overview.md#creating-an-automatic-alert).