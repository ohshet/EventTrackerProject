# REST API Project  
This project is a simple REST API that allows a user to store, retrieve, and modify information about their last gasoline fill up.  It performs create, read, udpate and delete (CRUD) operations on mySQL database named fuel.  The fill up table contains columns for an auto-incremented ID, date, odometer reading, gallons, and price per gallon.  The user may search the database by ID, or by ranges (min - max) of dates, odometer entries, prices, or gallons.  This information may be used to track a vehicle's fuel efficiency or the price of fuel across time.

## REST API endpoints:  
```Retrieve all records:             GET api/fillups  
Find record by ID:                GET api/fillups/{id}  
Find records by date range:       GET api/fillups/date/{min: yyyy-mm-dd}/  
                                      {max: yyyy-mm-dd}  
Find records by odometer range:   GET api/fillups/odometer/{min}/{max}  
Find records by price range:      GET api/fillups/price/{min}/{max}  
Find records by gallons range:    GET api/fillups/gallons/{min}/{max}  
Delete record by ID:              DELETE api/fillups/{id}  
Replace record by ID:             PUT api/fillups/{id}  
Add new record:                   POST api/fillups/{id}```
