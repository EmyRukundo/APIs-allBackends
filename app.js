// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();


//View engine setup
app.engine('hbs', exphbs({
    defaultLayout: 'contact',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//Static folder
app.use('/public', express.static(path.join(__dirname, '/public')));


//Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('layouts/contact');
});

app.post('/send', (req, res) => {
 const output = `<p> You have a new contact request </p>
                  <h3>Contact Details</h3>
                  <ul> 
                  <li>Name: ${req.body.name}</li>
                  <li>Company: ${req.body.company}</li>
                  <li>Email: ${req.body.email}</li>
                  <li>Phone: ${req.body.phone}</li>
                  </ul>
                  <h3>Message</h3>
                  <p>${req.body.message}</p>
                  `;

             // create reusable transporter object using the default SMTP transport
                  let transporter = nodemailer.createTransport({
                   service: 'gmail',
                    auth: {
                      type: "OAuth2", // default
                      email: 'emylegit@gmail.com', // generated ethereal user
                      pass: 'Kigali@5AM', // generated ethereal password
                    }});

        // send mail with defined transport object
            let mailOptions = {
                from:'emylegit@gmail.com', // sender address
                to: "rukundoemma@gmail.com", // list of receivers
                subject: "Testing the nodemailer ✔", // Subject line
                text: "This must wor ", // plain text body
                // html: output, // html body
            };

           transporter.sendMail(mailOptions, function(err,data){
               if(err){
                   console.log('Error Occurs', err);
               }else {
                   console.log('Email!!!');
               }
           });
})

app.listen(3000, () => console.log('Server started on 3000'));