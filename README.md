# REST API Project  
This project is a simple REST API that allows a user to store, retrieve, and modify information about their last gasoline fill up.  It performs create, read, udpate and delete (CRUD) operations on a mySQL database named fuel.  The fill up table contains columns for an auto-incremented ID, date, odometer reading, gallons, and price per gallon.  The user may search the database by ID, or by ranges (min - max) of dates, odometer entries, prices, or gallons.  This information may be used to track a vehicle's fuel efficiency or the price of fuel across time.

## REST API endpoints:  
```URL: http://3.17.248.158:8080/FillupREST/
Retrieve all records:             GET api/fillups  
Find record by ID:                GET api/fillups/{id}  
Find records by date range:       GET api/fillups/date/{min: yyyy-mm-dd}/{max: yyyy-mm-dd}  
Find records by odometer range:   GET api/fillups/odometer/{min}/{max}  
Find records by price range:      GET api/fillups/price/{min}/{max}  
Find records by gallons range:    GET api/fillups/gallons/{min}/{max}  
Delete record by ID:              DELETE api/fillups/{id}  
Replace record by ID:             PUT api/fillups/{id}  
Add new record:                   POST api/fillups/{id}
```
# UPDATE: JavaScript Front End
I have updated the API project to include a JavaScript based front end.  The main page is accessible at URL: http://3.17.248.158:8080/FillupREST.  This page allows the user to retrieve all records, or search by date, odometer entries, or price per gallon paid.  Additionally, the user can add new fillups to the DB, modify existing records, or delete records.

# UPDATE: Angular Front End
I have updated the project to include an Angular front end.  This front end provides greater functionality and a better user experience than the JS front end.  Improvements include a navigation bar, validation on forms, and overall smoother operation. 
