User uploads a CSV file and ask question in the request. The service profiles the data (columns, types), performs the needed aggregations/filters, and returns an answer with supporting evidence (aggregations, columns used, assumptions).

## When to Use

Use this when:

- The project involves multiple similar records (e.g., claims, transactions, logs) and the user wants to derive aggregated outcomes like averages, trends, or rankings.


## Prerequisites

- Python 3.9+
- Tenant access: Tenant is onboarded and models access is granted.
- Sample CSV file that contains the data and is available in Base64 format.