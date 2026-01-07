### Tenant

A tenant in ModelOps represents a logically isolated workspace assigned to a specific project, team, or department. Tenants help enforce boundaries across resources, users, and usage tracking.

  **Access Control**

   Each tenant is entitled to a specific set of AI models and services. Access to these resources is governed by entitlement policies, and only authorized users within the tenant can invoke or retrieve results from the assigned models.

  **User Management**

   Tenants can have multiple users assigned to them. These users may include developers, analysts, or project leads, each with role-based permissions. User roles determine access to APIs, job submission capabilities, and visibility into usage metrics.

  **Billing and Usage Matrics**

   All API activity is tracked using the tenant’s unique `tenant_Id`. This identifier ensures that resource consumption is accurately attributed to the correct project. Usage data is used to generate billing reports, support internal cost allocation, and maintain financial accountability across departments.

### User

A user in ModelOps represents an individual identity that interacts with the system to access AI services, submit jobs, and manage resources. Users are authenticated and authorized based on their credentials and assigned roles within one or more tenants.

  **Identity and Association**

  - Each user is uniquely identified by a User ID
  - A user can be associated with multiple tenants, allowing flexible participation across teams and departments
  - User access is scoped by tenant-level entitlements

  **Authentication**

  - Users authenticate via the User Credentials API, which requires:
    - User ID
    - Password
    - Client ID (associated with the tenant)
    - AuthFlow (defines the authentication strategy)
  - Upon successful authentication, users receive a time-bound access token (valid for 60 minutes) to interact with ModelOps APIs.