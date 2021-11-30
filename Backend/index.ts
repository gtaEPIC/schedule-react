import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import * as WS from "ws";
import {Event} from "./classes/Event";
import {SQLEvents} from "./classes/SQLEvents";
import * as http from "http";
import {Server, Socket} from "socket.io";
import {ServerOptions} from "http";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('files')); // Host Web Servers

/*const sslServer = https.createServer({ // Load SSL
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt')),
    insecureHTTPParser: true
}, app)

 */
const sslServer = http.createServer(app)

let io = new Server(sslServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Authorization"]
    }
}); // Start Socket.io

io.on("connection", (socket: Socket) => {
    //console.log("New connection")
    socket.on("disconnect", () => {
        //console.log("Disconnected")
    })
    socket.on("list", async (callback: (data: Event[]) => void) => {
        console.log("List")
        callback(await SQLEvents.getAllEvents())
    });
    socket.on("update", async (data: Event, callback?: () => void) => {
        console.log("Update");
        SQLEvents.setEvent(data).then(async () => {
            io.emit("list", await SQLEvents.getAllEvents());
            if (callback) callback();
        }).catch((err) => console.error(err));

    });
    socket.on("delete", async (data: Event, callback?: () => void) => {
        console.log("Delete");
        SQLEvents.deleteEvent(data.title).then(async () => {
            io.emit("list", await SQLEvents.getAllEvents());
            if (callback) callback();
        }).catch((err) => console.error(err));
    });
})

sslServer.listen(8080, () => { // Start https server
    console.log("Secure Server on port 8080 is running.")
})


async function eventCheck() {
    let events: Array<Event> = await SQLEvents.getAllEvents();
    let time = Math.floor(Date.now() / 1000);
    for (let event of events) {
        if (event.end_time <= time) {
            await SQLEvents.deleteEvent(event.title);
            io.emit("list", await SQLEvents.getAllEvents());
        }
    }
}

setInterval(eventCheck, 5000);