const app = require('./app');
const connectDatabase = require('./database');
const http = require('http');
const Messanger = require("./models/messanger/messange");
//Handling Uncaught Exception 
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shuting down the server due to Uncaught Exception");
  process.exit(1);
})

const PORT = process.env.PORT || 3000;

//Connecting to Database
connectDatabase();

const server = http.createServer(app);

// Create a Socket.IO instance
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  // console.log(`⚡: ${socket.id} user just connected!`);
  // Listen to socket event emitted by the client with new voice note data
  socket.on("new-voice-note-sent", async (data) => {
    const { personID, messageID } = data;
    // Retrieve latest voice note from the database
    const latestVoiceNote = await getLatestVoiceNote(personID, messageID);
    // Emit a socket event back to the client with the new voice note data
    io.to(socket.id).emit("new-voice-note-received", latestVoiceNote);
  });

  async function getLatestVoiceNote(personID, messageID) {
    // Retrieve latest voice note from the database
    const latestVoiceNote = await Messanger.findOne({ messangeID: messageID })
      .sort({ createdAt: -1 })
      .limit(1)
      .select({ chat: { $elemMatch: { sender: personID } } });
    return latestVoiceNote.chat[0];
  }


  socket.on('disconnect', () => {
    // console.log(`User with socket ID ${socket.id} disconnected`);
    const username = socket.username;
    io.emit("userOffline", username);
  });
  socket.on("message", ({ sendId, messageText }) => {
    // const user = getUser(senderId);
    io.emit("getMessage", {
      sendId,
      messageText,
    });
  });
  socket.on('join', (data) => {
    fullName = data.username;
    console.log(`User ${fullName} joined the chat.`);
    io.emit("userOnline", fullName);
  });

});



server.listen(PORT, () => {
  console.log('Server is running on PORT', PORT)
});

//Unhandle Promise Rejection
process.on("unhandledRejection", err => {
  console.log(`Error:${err.message}`);
  console.log("Shutting Down the Server due to Unhandle Promise Rejection");
  server.close(() => {
    process.exit();
  });
});
