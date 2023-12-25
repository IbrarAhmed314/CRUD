import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from "./routes/user.js";


const app = express();
const PORT = 80;

app.use(bodyParser.json());

app.use('/users', usersRoutes);
app.get('/', (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("The route does not exit"));

app.listen(PORT, () =>console.log(`Server running on port: http://192.168.12.98:${PORT}`));