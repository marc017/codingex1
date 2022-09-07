## Coding Exam
### Database Set up: POSTGRESQL
To crete the database, run the following sql commands found on <code>database/postgres_schema</code> into your postgresql.

### Backend Set up
After cloning/downloading the codes for the first time, run an <code>npm install</code> command to install all dependencies.

You can also modify the <code>.env</code> to match your configurations.

Once the set up is complete, you can now run the server by running the <code>npm start</code> command.

### Frontend Set up
Not much set up needed here, you just need to adjust the API url called on the script.js to match your configrations.

### Testing
#### Creating an Admin Account
You need to create an admin account to be able to access some of the API service. 

You can do this by accessing the postman collections from <code>CODINGEXAM.postman_collection.json</code>

#### Passing authorization token to header
Once you created an admin, you will need to login to the system using the login_admin ROUTE and retrieve the generated token to set to your headers