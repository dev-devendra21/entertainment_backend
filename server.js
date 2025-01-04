import http from "http";
import app from "./index.js";


const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.on("error", (error) => console.log(`Server Error: ${error}`));

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
