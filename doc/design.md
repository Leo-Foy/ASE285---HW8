# Architecture Design
## makepassword.js:
- Responsibilities:
  - takes 2 file name args of a password text file and an encrypt file to be made and added to
  - hashes passwords before new file is added to
  - calls upload of hashed users to the database
- Interfaces
  - calls utility.js's write function to write to database

## utility.js
- Responsibilities:
  - holds functions for writing to and comparing to the database
  - holds functions for writing and reading files
  - function for hashing
- Interfaces:
  - exports functions for reading writing and hashing

## passwordjs.js
- Responsibilities:
  - accepts command line inputs of filename, email, and password
  - uses a checkCredentials utility.js function to compare inputs to database objects

- Interfaces:
  - calls utility.js's checkCredentials function