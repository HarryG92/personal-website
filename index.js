const express = require('express');
const app = express();
const path = require('path');

const navlinks = require('./public/assets/navlinks.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


for (let navlink of navlinks) {
    app.get(navlink.request, (req, res) => {
        res.render(navlink.path, {page: navlink.title});
    });
}

app.get('/.well-known/acme-challenge/2p-ol53T-ImJjGGiX8u2N-mPy4onQUWHBCKryNdXwZ0:content', function(req, res) {
  res.send('2p-ol53T-ImJjGGiX8u2N-mPy4onQUWHBCKryNdXwZ0.B2A9TQe21ESfOvwSdA7VMNqa3FHm5NlKlzh5gH7i1No')
});

// app.get('/', (req, res) => {
//     res.render('index', {page: "H Gulliver, PhD"});
// });

app.get('*', (req, res) => {
    res.send("These aren't the droids you're looking for!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
