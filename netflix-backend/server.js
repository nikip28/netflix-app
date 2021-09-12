require("@babel/register");

const app = require("./app");
app.listen(process.env.APP_PORT || 3010, () => {
  console.log(`Process ${process.pid} is listening to all incoming requests`);
});
