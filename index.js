const express = require('express');
const app = express();
const path = require('path');

const navlinks = require('./public/assets/navlinks.json');
console.log(navlinks);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


for (let [key, value] of Object.entries(navlinks)) {
    app.get(value, (req, res) => {
        res.render(value, {page: key});
    });
}

// app.get('/', (req, res) => {
//     res.render('index', {page: "H Gulliver, PhD"});
// });

app.get('*', (req, res) => {
    res.send("These aren't the droids you're looking for!");
});

app.listen(3000, () => {
    console.log("listening on port 3000")
});
