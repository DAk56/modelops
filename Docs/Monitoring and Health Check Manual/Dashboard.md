The Model Comparison tab provides a side-by-side view of how different AI/ML models are performing across tenants. It helps users evaluate model effectiveness, usage patterns, and operational efficiency.

This is the default page that opens once the user is logged in inside the ModelOps QuickSight Dashboard.

#### Navigate to *Model Comparision* tab:

Click **Model Comparision** located in the top banner of the QuickSight dashboard.

![Model Comparison](Images/Model%20Comparision.png)

> ### Definitions

- **Overall Status**: Indicates the current health status of the system or tenant based on predefined thresholds.
    - **Green**:
        - ***Error Rate***: Less than 5%
        - ***Average Response Time***: Less than 5 seconds
        - ***Average Queue Time***: Less than 1 second

        *All three condition must met for green.*

    - **Amber**:
        - ***Error Rate***: Between 5% and 10%

        OR

        - ***Average Response Time***: Between 5s and 8s
        
        OR

        - ***Average Queue Time***: Between 1s and 3s

        *Any one of these conditions being true qualifies for Amber.*
    
    - **Red**:
        - ***Error Rate***: More than 10%

        OR

        - ***Average Response Time***: More than 8s

        OR

        - ***Average Queue Time***: More than 3s

        *Any one of these conditions being true qualifies for Red.*

- **Total calls**: Represents the total number of API calls made to all models within the selected filters (tenant, model, date range).

- **Success %**: The percentage of API calls that were successfully processed without errors. A higher value indicates better model reliability.

- **Avg. Response Time [SS]**: The average time (in seconds) taken by the system to respond to model invocation requests.

- **Avg. Queue Time [SS]**: The average time (in seconds) a request spent in the processing queue before execution. High queue times may indicate system load or resource constraints.

- **No. of users**: The number of unique users who invoked models during the selected time period.

- **Cancelled calls**: The number of API calls that were cancelled either by the user or due to system-level interruptions.

- **Processed Page Count**: The total number of pages processed by document-based models (e.g., Textract) during the selected period.

> ### Actions in Model Comparision tab

??? info "To filter by **Top Models (API Calls)**"
    
    1. Click the input box below **Top Models (API Calls)**.
    2. Enter the required number of top models to include, based on the highest API call counts.

<!--!!!note
    - If any filter is applied by selecting the bars in the diagram, the **Overall Status** tile shows which filter is applied in the dashboard.
        - To view the applied filters, click ![filter](Images/Icons/filter.png) in the top right corner of the **Overall Status** tile.
        - To remove a filter, click the **X** next to the filter name.-->


> ### Charts in Model Comparision tab

The Model Comparison tab provides a visual analysis of model performance, usage, and efficiency metrics. It helps users compare multiple AI models based on API usage, success rates, response times, and token consumption over time.

#### **Model Usage (API Calls)**:

Model Usage (API Calls) is a bar chart comparing the number of API calls made to each model.

![Model Usage](Images/Model%20Usage.png)

- Reveals usage trends and guiding lifecycle decisions.

#### **Model Success Rate**:

Model Success Rate is a bar chart that displays percentage of successful API calls per model.

![Model Success Rate](Images/Model%20Success%20rate.png)

- Help teams monitor stability and address issues proactively.

#### **Model Usage by Timeline**:

Model Usage by Timeline displays daily API call trends for each model.

![Model Usage by Timeline](Images/Model%20Usage%20by%20Timeline.png)
    
- Identifies usage trends and peak activity periods.

- To the top right corner of the tile:

    - Click ![to the top](Images/Icons/drill%20up%20to%20the%20top.png) to Drill up to the top (Return directly to the highest level of the hierarchy. Example: From Day → Year).

    - Click ![drill up](Images/Icons/drill%20up.png) to Drill up(Move one level up in the hierarchy to view aggregated data. Example: From Month → Quarter).

    - Click ![drill down](Images/Icons/drill%20down.png) to Drill down(Navigate from a higher-level summary to a more detailed level within a data hierarchy. Example: From Year → Quarter → Month).


<!--
    - Hover over any bar in the chart to view the exact number of calls for that day.
    - Drag the navigation bar above the Timeline (Day) axis to display data for other days not currently shown.

    ![Model Usage by Timeline(Details)](Images/Model%20Usage%20by%20Timeline(Details).png)
    -->

#### **Model Calls by Status**

Model Calls by Status displays distribution of calls by status (Completed, Error, Processing).

![Model Calls by Status](Images/Model%20Calls%20by%20Status.png)

- Helps monitor operational health and troubleshoot failures.

#### **Model Response Time vs Queue Time**

Model Response Time vs Queue Time bar chart compares average response time and queue time for each model.

![Model Response Time vs Queue Time](Images/Model%20Response%20Time%20vs%20Queue%20Time.png)

- Help teams optimize performance and reduce bottlenecks.

#### **Processed Pages by Timeline**

Processed Pages by Timeline displays the number of pages processed over time for Textract models.

![Processed Pages by Timeline](Images/Processed%20Pages%20by%20Timeline.png)

- Help teams monitor throughput, workload trends, and scaling needs.

#### **Token Count by Timeline by Model**

Token Count by Timeline by Model displays token usage (input and output) over time for each model.

![Token Count by Timeline by Model](Images/Token%20Count%20by%20Timeline%20by%20Model.png)

- Help teams manage costs, optimize efficiency, and plan resources.