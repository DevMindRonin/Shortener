const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

// Mongoose connecting
mongoose.connect('mongodb://localhost:27017/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// Loads url links from Mongoose
app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

// writes short url in Mongoose
app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/')
})

// Delete _id record
app.delete('/delete/:id', async (req, res) => {
    const idToDelete = req.params.id;
    const deletedRecord = await ShortUrl.findByIdAndDelete(idToDelete);
    return res.status(200).json({});
});

// Count no. of clicks after click on short ulr
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);
