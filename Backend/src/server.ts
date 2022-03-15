import express,  { Request, Response } from "express";
import UserRouter from './routes/user.routers';
import { databseConnection, forceDatabse } from './config/database.config';
import dotenv from 'dotenv';
import CompanyRouter from "./routes/company.routers";

// load the environment variables from the .env file
dotenv.config({
    path: './.env'
  });

const app = express();
const port = process.env.PORT;

databseConnection();
// forceDatabse();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Test
app.get("/", (req: Request, res: Response) => {res.send("Hello server")} );

//Routing http:/domain name/api/v1/xxx  //More Route? Append here
const rootUrl = "/api/v1";
app.use(rootUrl+'/user', UserRouter);
app.use(rootUrl+'/company', CompanyRouter);

app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
})