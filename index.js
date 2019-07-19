require('dotenv').config()
const cors = require('cors');
const express = require('express');
const newCert = require('./newCert')
const sendCert = require('./sendCert')

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.post('/postCertData', (req, res) => {
  res.send(req.body)
  const namesArray = req.body.personCert.namesCert;
  const emailsArray = req.body.personCert.emailsCert;
  const eventName = req.body.eventName;
  const data = req.body;
  delete data['personCert'];
  namesArray.forEach(async (name, i) => {
    const newData = { ...data, fullNameCert: name }
    await newCert.newCert(newData);
    //! Fazer um tratamento de erro
    await sendCert.sendCert(emailsArray[i], `${name.split(' ').join('_')}_${eventName.split(' ').join('_')}`)
  });
});

app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);