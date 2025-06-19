import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;

async function main(){
    try {
        
        await mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.v95wjo0.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Mongodb connected");

        server = app.listen(PORT, ()=>{
            console.log(`Note Server is running on port ${PORT}`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

main();