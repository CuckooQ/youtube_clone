import app from "./app";

const PORT = 4000; 

const initListen = () => {
    console.log(`Listening on localhost:${PORT}`);
}

app.listen(PORT, initListen);