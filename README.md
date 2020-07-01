# gostack-desafio6-backend-db
This application was created with Typescritp in Node.js to store financial transactions, allowing them to be registered, listing and calculating the overall balance. To register a transaction, the user must inform a short description as title, its value, the information if it is an income or outcome and its category, which should be automatically created if not existent.
Negative balances are not allowed, so an outcome transaction should not exceed the balance.
The data is persisted using Postgres, and multiple transactions can be imported from .csv files.

To run this application, clone this repository and execute "yarn" command to install all dependencies.
