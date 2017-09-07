//Requiring modules:
var mysql = require('mysql');
var inquirer = require('inquirer');
//Global variables:
var inputA = process.argv[2];
var inputB = process.argv[3];

//Creating a connection:
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});
connection.connect(function(err) {
    if (err) throw err;
});

//Declares a function to read the DB:
function readDB() {
    console.log("INVENTORY");
    console.log("---------");
    connection.query(
        'SELECT * FROM products',
        function(err, response) {
            if (err) throw err;
            for (i = 0; i < response.length; i++) {
                console.log('NAME: ' + response[i].product_name);
                console.log('DEPARTMENT: ' + response[i].department_name);
                console.log('PRICE: ' + response[i].price);
                console.log('IN STOCK: ' + response[i].stock_quantity);
                console.log('ID: ' + response[i].id)
                console.log('-_-_-_-_-_-');
            }
        }
    )
};
//Call readDB() on load.
readDB();

//Declares a function to prompt the user:
function buyPrompt() {
    inquirer.prompt([
        {
            name: 'orderID',
            message: "ID of item you'd like to order: "
        }, {
            name: 'howMany',
            message: "How many units would you like to buy?"
        }
    ]).then(function(answers) {
        //Returns answers.orderID, answers.howmany.
        connection.query(
            'SELECT * FROM products',
            function(err, response) {
                if (err) throw err;
                var chosenNumber = (answers.orderID - 1);
                //Then if there's not enough in stock, give error message:
                if (response[chosenNumber].stock_quantity < answers.howMany) {
                    console.log("We don't have that many! We have only " + response[chosenNumber].stock_quantity + " in stock today.");
                    console.log('Please choose another item or quantity.');
                    buyPrompt();
                } else {
                    //Gives the user her total:
                    console.log('-_-_-_-_-_-')
                    console.log('We have received your order!')
                    console.log('Your total is: $' + response[chosenNumber].price * answers.howMany)
                    //If there is enough of the item, subtract the desired amount from the in-stock quantity:
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity:response[chosenNumber].stock_quantity - answers.howMany
                            }, {
                                id: answers.orderID
                            }
                        ],
                        function(error, data) {
                            if (error) throw error;
                            //Data will return an object saying how many rows affected, other data.
                        }
                    )
                }
            
                
            }
        )
        
    })
}
//Calls buyPrompt():
buyPrompt();