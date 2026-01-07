1. How do I get access to Admin APIs?

    *You must be assigned the `MO_Admin` role manually by an existing admin in the database.*

2. Can I onboard users with non-Maximus emails?

    *No, only Maximus email domains are allowed.*

3. What is the maximum number of credentials a tenant can have?
    
    *A tenant can have a maximum of 5 credentials.*

4. Can I update only one field in the tenant configuration?

    *Yes, all fields in the PATCH request are conditional.*

5. What happens when I deboard a tenant?

    *The tenant is marked inactive, but backend resources remain recoverable for 15 days.*

6. Can I rotate and revoke credentials in the same request?
    *No, only one action is allowed per request.*

7. Can I onboard multiple new models at once?

    *No, each model must be onboarded individually.*