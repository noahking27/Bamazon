var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "nissan11",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);

});


var products = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("\n" + "ITEM ID: " + res[i].item_id + "\n" + "Product Name: " + res[i].product_name + "\n" + "Price: $" + res[i].price + "\n");
        };
    });
};
//function to find the item id and then be plugged in to if statement below
var order = function() {
    connection.query("SELECT item_id FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([

            {
                name: "action",
                message: "What is the ID of the product you would like to buy?",
                type: "input"
            }

        ]).then(function(answer) {
            for (i = 0; i < res.length; i++) {
                var ID = [];
                ID.push(res[i].item_id);
                if (answer.action == res[i].item_id) {
                    console.log("FINALLY!");
                    connection.query("UPDATE products SET ? WHERE ?"), {
                        //item_id: res[i].item_id - answer.action;
                        // not sure the above code will work
                    }
                }

            }

        });
    });
};
// var units = function() {
//         connection.query("UPDATE products SET stock_quantity=? WHERE item_id = ?", function(err, res) {
//         	stock_quantity: answer.units,
//         	item_id: answer.action
//         }
//             inquirer.prompt([{
//                 name: "units",
//                 message: "How many units would you like to buy?",
//                 type: "input"
//             }]).then(function(answer) {

//             })
//         });


products();
order();
connection.end();
//runs the function to display to console
// start();
// products();
