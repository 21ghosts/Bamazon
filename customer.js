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


// 
var productListing = () =>
{
    //Conection to database
    connection.connect((err) =>
    {
        if (err) throw err;
        
        connection.query('SELECT * FROM products', function (err, res) {
            if (err) throw err;
            
            for (j = 0; j < res.length; j++) {
                console.log("ID#:" + res[j].item_id + " | " +
                    "Product Name: " + res[j].product_name + " | " +
                    "Price: " + "$" + res[j].price + " | " +
                    "Stock Count: " + res[j].stock_count);
                console.log("_____________________")
            }
        });
    }
    
    );

}

productListing();

var purchasePrompt = () =>
{
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the id of the item you would like to buy?'
            
        },
        {
            name: 'Amount',
            type: 'input',
            message: 'What is the amount you wish to buy?'
        },
    ]).then((answer) => 
        {
            var amountWanted = answer.Amount;
            var wantedId = answer.id;

        })
}

purchasePrompt();

