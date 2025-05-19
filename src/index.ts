import app from "./app";
import dotenv from 'dotenv';

const port = process.env.PORT || 3000;

//For env File 
dotenv.config();
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
