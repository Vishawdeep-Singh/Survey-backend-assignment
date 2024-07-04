import express ,{ request, response } from "express";
import { Request,Response } from "express";
import bodyParser from 'body-parser';
import surveyroutes from './Routes/surveyroutes'

const app = express();
const PORT = 3000;
app.use(express.json())
app.use(bodyParser.json());
app.use("/api/v1/surveys",surveyroutes)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

