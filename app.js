const express = require('express');
require('dotenv').config();
const {routerV1}=require('./routes/handleRoutesV1');
const {routerV2}=require('./routes/handleRoutesV2');
const {defaultRoute}=require('./routes/users/middleware/middleware');

const app = express();
app.use(express.json());
app.use(routerV1);
app.use(routerV2);

app.get('*',defaultRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
