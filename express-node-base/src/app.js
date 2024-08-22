const config = require('./configs/config')
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers")
const sequelize = require("./configs/connections/postgresql");

const app = express();

sequelize.authenticate()
    .then(() => {
    console.log('Kết nối PostgreSQL thành công');
    })
    .catch((error) => {
    console.error('Lỗi kết nối PostgreSQL:', error);
    });

app.use(bodyParser.json());
app.use('/base-express', routes);

app.listen(config.PORT, () => {
  console.log(`Server đang lắng nghe tại cổng `, config.PORT);
});