
const PORT = process.env.PORT || 3000;
const server = require('./server');
let db = require('./models');
server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
  db.sequelize.sync();
});