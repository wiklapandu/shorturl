const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { validationResult, check } = require('express-validator');
const path = require('path');
const validator = require('validator').default;

const app = express();
const port = 3000;

// * function url
const fullUrl = (req) => {
    return req.protocol + '://' + req.get('host');
};

app.set('view engine', 'ejs');
app.use(expressLayouts);

// ! static file (img,css,js)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// ? Databases
require('./src/db/connection');

const Url = require('./src/db/models/urlModel');

app.get('/', (req, res) => {
    return res.render('index', {
        layout: 'layouts/default'
    })
});

app.get('/try-make', (req, res) => {
    return res.render('try-make', {
        layout: 'layouts/default'
    });
});
app.post('/try-make', [
    check('url', 'format url salah! harap tulis atau ubah dengan contoh format benar: http://example.com.').isURL()
],
    async (req, res) => {
        const urlReq = String(req.body.url);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('try-make', {
                layout: 'layouts/default',
                errors: errors.array()
            })
        }
        const duplikat = await Url.findOne({ original_url: urlReq });
        if (duplikat) {
            return res.render('try-make', {
                layout: 'layouts/default',
                location: fullUrl(req),
                urls: duplikat,
            })
        }
        const counts = await Url.countDocuments();
        Url.create({
            original_url: urlReq,
            short_url: counts + 1
        }).then((result) => {
            return res.render('try-make', {
                layout: 'layouts/default',
                location: fullUrl(req),
                urls: result,
            })
        })
    });
app.get('/shorturl/:shorturl', (req, res) => {
    const short_url = req.params.shorturl;
    if (!validator.isInt(short_url)) {
        return res.render('try-make', {
            layout: 'layouts/default',
            location: fullUrl(req),
            errors: [
                {
                    msg: `format short url salah, gunakan integer pada path akhir. url yang anda masukan tadi ${fullUrl(req)}/${short_url}`
                }
            ]
        })
    }
    Url.findOne({ short_url }).then(({ original_url }) => {
        return res.redirect(original_url);
    }).catch(err => console.log('findOne() error'))
})
app.listen(process.env.PORT || port, (req, res) => {
    console.log(`listening on port ${port}`)
});