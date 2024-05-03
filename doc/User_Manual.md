# User Manual
### Setup
- this app requires a mongodb database and a password.txt file
- create a .env file that connects to your database
- the collection that holds users will be made automatically
- To collect necessary dependencies:
  - run npm install 
  - run npm install dotenv
  - run npm install mongoose
- put emails and passwords into password.txt file, seperated by a linebreak (hitting enter), emails and passwords should be seperated by a colon (:)
### Using the App
- this app is operated with the command line
- run node src/makepassword.js to hash passwords and put user info in database and in new encrypted file
- run node src/passwordjs.js password.enc.txt YourEmail YourPassword to compare your input to the database
- the above command will return true if your input matches a user in the database, otherwise it will print false
