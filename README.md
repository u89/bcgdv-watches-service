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
POST /checkout
**Headers**
Accept: application/json Content-Type: application/json
**Body**
```["001", "002", "001", "004", "003"]```
##### **Response**
**Headers**
Content-Type: application/json
**Body**
```{ "price": 360 }```

## The Solution
...

## Future improvments
...