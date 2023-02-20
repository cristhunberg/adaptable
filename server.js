const express = require("express");

const rateLimit = require("express-rate-limit");

const helmet = require('helmet');

require("dotenv").config();

const PORT = process.env.PORT || 3000

const app = express();

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.disable('x-powered-by');

app.use(limiter);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded( { extended: false } ));
app.get("/", (req, res) => {

  if(req.body) {

    console.log(req.body);

  }
  
  res.json({ error: false, data: "Api home!" });
});

app.all("*", (req, res) => {

  if(req.body) {

    console.log(req.body);

  }
  
  res.json({ error: true, status: 404, data: "Api route not found!" });
  
});


app.listen(PORT, () => {

        console.log(`Server is running at http://localhost:${PORT}.`);
});
      
       


module.exports = app

