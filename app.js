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
                   host: 'smtp.mailtrap.io',
                   port: 587,
                   secure: false,
                    auth: {
                      user: '8d5430090d7c35',
                      pass: '89f5a4b7015f70', // generated ethereal password
                    },
                tls:{
                     rejectUnauthorized: false
                }});

        // send mail with defined transport object
            let mailOptions = {
                from:'"tester" <8d5430090d7c35>', // sender address
                to: "rukundoemma@gmail.com", // list of receivers
                subject: "Testing the nodemailer", // Subject line
                text: "This must yeah this one", // plain text body
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