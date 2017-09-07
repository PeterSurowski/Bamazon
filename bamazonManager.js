//Require npms:
var mysql = require('mysql');
var inquirer = require('inquirer');
//Set some global vars:
var inputA = process.argv[2];
var inputB = process.argv[3];

//Create a connection using mysql npm:
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});
//Run a method on the connection var to connect to DB:
connection.connect(function(err) {
    if (err) throw err;
});

function readDB() {
    connection.query(
        'SELECT * FROM products',
        function(err, response) {
            if (err) throw err;
            console.log('HERE IS WHAT YOU HAVE IN STOCK.')
            for (i = 0; i < response.length; i++) {
                if (response[i].stock_quantity > 0) {
                    console.log('--------------');
                    console.log('Product name: ' + response[i].product_name);
                    console.log('Product ID: ' + response[i].id);
                    console.log('Price: $' + response[i].price);
                    console.log('Number in stock: ' + response[i].stock_quantity);
                }
            }
        }
    )    
};
//Call readDB if user inputs "read":
if (inputA === 'view products for sale') {
    readDB();
}
//Declare function to read low inventory:
function lowInventory() {
    connection.query(
        'SELECT * FROM products',
        function(err, response) {
            if (err) throw err;
            console.log('LOW INVENTORY ITEMS');
            for (i=0; i<response.length; i++) {
                if (response[i].stock_quantity < 5) {
                    console.log('----------------');
                    console.log('Product name: ' + response[i].product_name);
                    console.log('Product ID: ' + response[i].id);
                    console.log('Department: ' + response[i].department_name);
                    console.log('Price: $' + response[i].price);
                    console.log('Quantity in stock: ' + response[i].stock_quantity);
                }
            }
        }
    )
}
//Call the function if inputA is lowinventory
if (inputA === 'view low inventory') {
    lowInventory();
}
//Declare a function that will prompt user to add inventory:
function addInventory() {
    var indexNumber;
    connection.query(
        'SELECT * FROM products',
        function(err, response) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'name',
                    type: 'list',
                    message: 'Which item would you like to restock?',
                    choices: function() {
                        var itemsArray = [];
                        for (i=0; i<response.length; i++) {
                            itemsArray.push(response[i].product_name);
                        }
                        return itemsArray;
                    }
                }, {
                    name: 'quantity',
                    message: 'How many would you like to be in stock?'
                }
            ]).then(function(answers) {
                //Get the right index number for the product by subtracting one from its ID:
                for (i=0; i<response.length; i++) {
                    if (response[i].product_name === answers.name) {
                        indexNumber = response[i].id - 1;
                    }
                }
                connection.query(
                    'UPDATE products SET ? WHERE ?',
                    [
                        {
                            stock_quantity: parseInt(response[indexNumber].stock_quantity) + parseInt(answers.quantity)
                        }, {
                            product_name: answers.name
                        }
                    ], function(error, data) {
                        if (err) throw err;
                        console.log(answers.quantity);
                        console.log(answers.name);
                        console.log(response);
                    }
                )
            })
        }
    )
}
//Call addInventory() when user inputs "add to inventory":
if (inputA === 'add to inventory') {
    addInventory();
}