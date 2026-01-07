
To assign a user with MO_Admin, Update the User_Tenant table in the database.

```sql 
INSERT INTO User_Tenant (User_Id,Role_Code,Active) VALUES ('1','MO_Admin','1');
```
        
!!!Note
    For security reasons this step is currently manual and must be performed directly in the database.