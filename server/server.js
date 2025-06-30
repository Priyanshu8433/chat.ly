require("dotenv").config();
const app = require("./app");

const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_URI.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
