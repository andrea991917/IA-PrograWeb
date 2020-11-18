const events = require("events");
const net = require("net");

const server = net.createServer((socket) => {
    console.log("new connection");

    let buffer = [];
    socket.setEncoding("utf-8");
    socket.on("data", (data) => {
        buffer.push(data);
        console.log(data);
        bufferString = buffer.toString();
        const request = {   
            method: '',
            path: '',
            headers: {},
            body: '',
        }
        
        reqArray = bufferString.split('\r\n');
        console.log(reqArray);
        let hasAllHeaders=false;
        let hasBody = false
        reqArray.map((element,index) => {
            let lastIndex = reqArray.length - 1;
            
            if(element==='' && hasAllHeaders===false){hasAllHeaders=true}
            if(index === 0){
                request.method = element.split(' ')[0]
                request.path = element.split(' ')[1]
            }
            else if(!hasAllHeaders){
                const headersSplited = element.split(': ');
                const [first,...rest] = headersSplited;
                request.headers[first.toLowerCase()] = rest.join();
            }
            else if(request.headers["content-length"]!=0 && element !==''){
                if(index!==lastIndex) {
                    request.body = request.body+element+'\r\n';
                }
                else {
                    request.body = request.body+element
                }
            }
        });
        console.log("METODO "+request.method);
        console.log("PATH "+request.path);
        console.log("HEADERS "+JSON.stringify(request.headers));
        console.log("BODY "+request.body);
        

       
        console.log("data received");
    });

    socket.on("end", () => {
        buffer.join();
        console.log("connection ended");
        console.log(buffer);
    });
});

server.listen(3000);