require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const origUrl =[];
const shortUrl = [];

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url
  const indexFound = origUrl.indexOf(url)

  if(!url.includes("https://") && !url.includes("http://")) {
    return res.json({ error: 'invalid url' })
  }

  if(indexFound < 0) {
    origUrl.push(url)
    shortUrl.push(shortUrl.length)

    return res.json({
      original_url: url,
      short_url: shortUrl.length - 1
      
    })
  }

  return res.json({
    original_url: url,
    short_url: shortUrl[indexFound]
  })
})

app.get("/api/shorturl/:shorturl", (req, res) => {
  const shorturl = parseInt(req.params.shorturl)
  const indexFound = shortUrl.indexOf(shorturl)

  if(indexFound < 0) {
    return res.json({
      "error": "No short URL found for the given input"
    })
  }

  res.redirect(origUrl[indexFound])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
