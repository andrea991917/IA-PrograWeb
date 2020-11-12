const events = require("events");
const net = require("net");

const server = net.createServer((socket) => {
    console.log("new connection");

    let buffer = [];
    socket.setEncoding("utf-8");
    socket.on("data", (data) => {
        buffer.push(data);
        console.log(data);

        console.log("data received");
    });

    socket.on("end", () => {
        buffer.join();
        console.log("connection ended");
        console.log(buffer);
        bufferString = buffer.toString();
        reqArray = bufferString.split('\r\n');
        console.log(reqArray);
        let flag = 0;
        const request = () => {
            reqArray.array.forEach(element => {
                if (flag === 0) {
                    this.method = element.split(' ')[0]
                }
            });
        }

    });
});

server.listen(3000);