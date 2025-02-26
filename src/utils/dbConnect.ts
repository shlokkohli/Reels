import mongoose, { Connection } from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {

    // check if there is already a database connection
    if(connection.isConnected){
        console.log("Already connected to database");
        return;
    }

    // if there is not already a database connection, we need to create one
    try {

        const db = await mongoose.connect(process.env.MONGODB_URI || '', {
            maxPoolSize: 10
        });
        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")
        
    } catch (error) {

        console.log("Database conenction failed", error);
        process.exit(1)
        
    }
}

export default dbConnect;