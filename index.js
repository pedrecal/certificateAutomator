require('dotenv').config()
const cors = require('cors');
const express = require('express');
const newCert = require('./newCert')
const sendCert = require('./sendCert')
const multer = require('multer')

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.post('/postCertData', async (req, res) => {
  // res.send(req.body)
  const namesArray = req.body.personCert.namesCert;
  const emailsArray = req.body.personCert.emailsCert;
  const CPFArray = req.body.personCert.CPFCert;
  const eventName = req.body.eventName;
  const data = req.body;
  delete data['personCert'];
  await namesArray.forEach(async (name, i) => {
    const newData = { ...data, fullNameCert: name, CPFCert: CPFArray[i], certNumber: i }
    //Cria os certificados
    await newCert.newCert(newData);

    await sendCert.sendCert(emailsArray[i], `${name.split(' ').join('_')}_${eventName.split(' ').join('_')}`, newData.subject, newData.text)
  });
  return res.send("Sending Emails");
});

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './public/images/tmp/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'){
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
})

app.post('/postSignatureImage', upload.single('myImage'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
})

app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})


app.listen(process.env.PORT, () =>
  console.log(`App listening on port ${process.env.PORT}!`),
);