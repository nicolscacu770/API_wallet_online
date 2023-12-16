const express = require('express');
const router = require('./routers/index.routers');
const cors = require('cors');

require('./controllers/connectDB');
const app = express();

app.use(cors());

//setters
app.set('PORT', process.env.PORT || 3000);
app.set(express.json());

//middlewares
app.use("/", (req, res) => res.send("welcome to API walllet"));

router(app);

app.listen(app.get('PORT'), () => console.log( `server Listen to port ${app.get('PORT')}` ) )
