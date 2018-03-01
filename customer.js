// list requires
var inquirer = require('inquirer');
var mysql = require('mysql');

//link up with sql database
var connection = mysql.createConnection({

    host: "localhost",
    port: 3308,
    user:"root",
    password:"root",
    database:"bamazon_db"

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

// display the product list to choose from
productListing = () =>
{
    //Conection to database
    connection.connect((err) =>
    {
        if (err) throw err;// list errors
        
        connection.query('SELECT * FROM products', (err, res) =>
        {
            if (err) throw err;// list any errors
            
            //create loop to run through res(ults) length and dipslay sql data
            for (j = 0; j < res.length; j++) {
                console.log("ID#:" + res[j].item_id + " | " +
                    "Product Name: " + res[j].product_name + " | " + 
                    "Department: " + res[j].department_name + " | " +
                    "Price: " + "$" + res[j].price + " | " +
                    "Stock Count: " + res[j].stock_count);
                console.log("_____________________")
            }
        });
        
    });

};







buyProduct = (id, requestedAmount) => {
    connection.query("SELECT * FROM products WHERE item_id = " + id, (err, res) => {
        if (err) throw err;

        if (requestedAmount <= res[0].stock_count) {
            priceAmount = res[0].price * requestedAmount;
            console.log('The items you have requested are ready.');
            console.log('___________');
            console.log('that will be ' + '$' + priceAmount + ' for ' + requestedAmount + ' ' + res[0].product_name + '(s)');
            connection.query('UPDATE products SET stock_count = stock_count -' + requestedAmount + "WHERE item_id = " + id);
            console.log(res.length)
        }
        else {
            console.log('Not enough ' + res[0].product_name + ' in stock.');
        };
        
    });
};

cartPrompt();