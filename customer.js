// list requires
const inquirer = require('inquirer');
const mysql = require('mysql');

//link up with sql database
const connection = mysql.createConnection({

    host: "localhost",
    port: 3308,
    user: "root",
    password: "root",
    database: "bamazon_db"

});

var wantedAmount;// amount wanted by user
var wantedId;// item_id wanted by user
var price;// price of wanted item
var buyProduct;// variable for purchase of product
var productListings;// list of all products
var cartPrompt;// prompt questions for user

//utilize prompt : helpful source GreatBay assignment
cartPrompt = () => {
    inquirer.prompt([
        {   //ask user what item they would like to buy
            name: 'id',
            type: 'input',
            message: 'What is the id of the item you would like to buy?'
            /*validate: (value) =>
            {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }*/
        },
        {   //ask user what amount they would like to purchase
            name: 'Amount',
            type: 'input',
            message: 'What is the amount you would like to to buy?'
            /*validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }*/
        },

    ]).then((answer) => {
        wantedAmount = answer.Amount;
        wantedId = answer.id;
        buyProduct(wantedId, wantedAmount);
    });

    productListing();
};

// display the product list to choose from : helpful source Timothy Dusterdieck TA
productListing = () => {
    //Conection to database  
    connection.connect((err) => {
        if (err) throw err;// list errors

        connection.query('SELECT * FROM products', (err, res) => {
            if (err) throw err;// list any errors

            //create loop to run through res(ults) length and dipslay sql data
            for ( let j = 0; j < res.length; j++) {
                console.log(`ID#: ${res[j].item_id}
                    Product Name: " + ${res[j].product_name}
                    Department: " + ${res[j].department_name}
                    Price: " + "$" + ${res[j].price}
                    Stock Count: " + ${res[j].stock_count}`);
                console.log("_____________________")
            }
        });

    });

};


// set up buyProduct
buyProduct = (id, requestedAmount) => {
    //connect to qurry and select from products item_id
    connection.query("SELECT * FROM products WHERE item_id = " + id, (err, res) => {
        if (err) throw err;// list err

        //if requested amount is less than what we have in stock_count make sale
        if (requestedAmount <= res[0].stock_count) {
            priceAmount = res[0].price * requestedAmount;// multiplies price of selected product by requested amount
            console.log('The items you have requested are ready.');
            console.log('___________');
            console.log(`that will be $${priceAmount} for ${requestedAmount}  ${res[0].product_name}(s)`);// concatinated response
            
            console.log(res.length)
        }
        else {
            console.log(`Not enough ${res[0].product_name} in stock.`);
        };

    });
};

cartPrompt();

// helpful resources list:
// GreatBay assignment
// Stack Overflow
// FreeCodecamp
// Timothy Dusterdieck TA 
// Dylan Nirvana