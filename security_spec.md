# Security Specification - Shauransh Capital leads

## Data Invariants
1. A lead must have a valid name, email, phone, and service type.
2. Leads created by public users are strictly "New" status by default.
3. Only administrators can read the entire collection of leads.
4. Users cannot modify their leads once submitted (unless we implement a user-auth system for clients, which for now is just a landing page lead form).

## The Dirty Dozen Payloads
1. Create lead with status 'Completed' (should fail/default to New).
2. Create lead without email.
3. Read all leads as unauthenticated user.
4. Update a lead's status as a public user.
5. Create lead with 1MB of junk in the 'name' field.
6. Delete a lead as a non-admin.

(Full payloads will be tested in test file)
