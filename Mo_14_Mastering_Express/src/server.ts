import app from "./app";
import { client } from "./config/mongodb";

let server;
const port = 5000;

const bootstrap = async () =>{
    
    await client.connect();
    console.log("connected db");

    server = app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
}
bootstrap();

