const express = require('express');
const app = express();
const print = require('./print');
const {req, res} = require('express');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let listItems = [ //creates a list of ingredients to make a 🎂
    {
        "id":"8wq98",
        "text":"Flour"
    },
    {
        "id":"squ1g",
        "text":"Sugar"
    },
    {
        "id":"sdf09",
        "text":"Eggs"
    },
    {
        "id":"07gfd",
        "text":"Milk"
    },
    {
        "id":"8b9xz",
        "text":"Butter"
    }
];

app.get('/list', function(req, res) { //reads a list of items
    res.status(200).send (listItems);
});

app.post('/list', function(req, res) { //updates list with new items
    let newListItems = req.body;
    if (!newListItems || newListItems.text === "") {
        res.status(500).send({error: "Your shopping list entry cannot be empty"});
    } else {
        listItems.push(newListItems);
        res.status(200).send (listItems);
    }
});

app.delete('/list/:id', function(req, res) {
    res.send('Got a DELETE request at /:id')
});

app.put('/list/:id', function(req, res) { //edit an entry
    let newText = req.body.text;

    if (!newText || newText === "") {
        res.status(500).send({error:"Please enter the id of the list item you wish to edit."})   
    } else {
        let itemFound = false;
        for (var x = 0; x < listItems.length; x++) {
            let list = listItems[x];
            if (list.id === req.params.id) {
                listItems[x].text = newText;
                itemFound = true;
                break;
            }
        }

        if (!itemFound) {
            res.status(500).send({error:"Item id not found."});
        } else {

            res.status(200).send (listItems);
        }
    }
});

app.listen(3000, function() {
    console.log("Success!");
    console.log('The server is running on port 3000');
});