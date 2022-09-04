# **Watches Service**: A Simplified eCommerce API
##### _(with a single endpoint that performs a checkout action)_
## Requirements
- npm v8.3.0
- Node v16.13.0
- Git
## Commands

To start the express server, run:
```
npm start
```
To start the express server in dev mode, run:
```
npm run dev
```
To test the application, run:
```
npm test
```

## The Task
Build a simplified e-commerce API with a single endpoint that performs a checkout action. The single endpoint should take a list of watches and return the total cost.

#### **Watch catalogue**
Below is a catalogue of four watches and their associated prices:
| Watch ID        | Watch Name           | Unit Price  | Discount  |
| ------------- |:-------------:| -----:| -----:|
| 001     | Rolex | 100 | 3 for 200 |
| 002     | Michael Kors | 80 | 2 for 120 |
| 003     | Swatch | 50 |
| 004     | Casio | 30 |

There are a few requirements worth noting here:
- The first two products have a possible discount. As an example, if the user attempts to check out three or six Rolex watches then they will receive the discount price once or twice, respectively.
- There is no limit to the number of items or combinations of watches a user can checkout.
- There is no limit to the number of times a discount can be used.
- Similarly, a user can checkout a single item if they wish.

#### **Expected Result**
A service with a single API endpoint **POST /checkout** that accepts requests of type application/json and return application/json in response.


##### **Request**
POST /checkout <br/>
**Headers**
Accept: application/json <br/>
Content-Type: application/json <br/><br/>
**Body**<br/>
```["001", "002", "001", "004", "003"]```<br/>

##### **Response**

**Headers**<br/>
Content-Type: application/json<br/><br/>
**Body**<br/>
```{ "price": 360 }```

## The Solution
1. For simplicity, I used here a simulated database instead of an actual one so anyone can simply run the app on their machine and test it. The list of watches is saved as an array of objects inside the database.js file.
2. To work with discounts, I defined a sub schema for discounts: {type: string, value: string} and embedded it within the watch schema. Each discount type, requires a different implementation in the code. In this example, I'll only use one type which is  x-for-y discounts (buy x items for y price).
3. Watch schema is: <br/>
```{watchId: string, watchName: string, unitPrice: number, discount: {type: string, value: string}}```
4. The solution follows an MVC pattern where the controller is responsible for handling and responding to the client's requests and the model gets the data and performs actions on it from the database.
5. The checkout process goes as follows:
- The controller (store.js) receives the request and validate the request body.
- If the ids are in the request body, the controller will calculate the quantities of each item based on the frequency of the id in the body request.
- Then, for each id, the controller will get the watch details with discounts applied from the watches model.
- The watch model gets the watch info from the database, check if the item has a discount, apply the discount on the item and return the details along with the discount amount.
- The controller calculates the total and returns it to the client.

## Future Improvments
This is just a quick implementation of the task above. The production solution should have some improvements such as:
1. Use an actual database instead of a hard coded array of data (replace database.js content with the related database code). For the format of objectes used in this example (json and embedded json), I'd recommend mongoDB as a database.
2. Implement "jest mock" tests to test the system with mock functions. For this, you will need to follow dependency injection principle first by injecting the database to the app (to be passed to the controller then to the model). This will allow you to test the app with your own test data as the database may change at any point of time and the prices and discounts won't be the same so the tests will fail.
3. Use TypeScript instead of JavaScript so you get strong type checking and better compiler warnings.
4. Dockerize it so you can deploy easly to any machine. No matter what OS you're running on, you'll have consisten environment every time.