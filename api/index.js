require("dotenv").config();
const server = require("./src/app");
const { conn } = require("./src/db");
const port = process.env.PORT || 3001;
const { getAllCategories } = require("./src/controllers/categoryController");
const { getAllPhones } = require("./src/controllers/phoneController");
const { getAllUsers } = require("./src/controllers/userController");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(port, async () => {
    console.log(`Server raised in port ${port}`); // eslint-disable-line no-console
    await getAllCategories();
    await getAllPhones();
    await getAllUsers();
  });
});
