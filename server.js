import app from "./app.js"
import {config} from "dotenv"
config()

const port = process.env.PORT || 3025


app.listen(port, ()=> {
    console.log(`Server listening at port: ${port}`);
})