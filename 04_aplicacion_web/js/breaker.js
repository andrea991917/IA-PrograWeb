import gameObject from "./game_object.js"


let data = {
    objects: [],
    options: {
        speedPlayer: 10,
        columns: 12,
        rows: 5,
        areaWidth: 800,
        areaHeight: 600,

    }

};


const getPlayerDim = () => {
    let w = data.options.areaWidth * 0.15;
    let h = data.options.areaHeight * 0.03;
    return {
        x: (data.options.areaWidth / 2) - (w / 2),
        y: (data.options.areaHeight) - h,
        w,
        h
    }
}



const addObject = (gameObject) => {
    let obj = {
        'go': gameObject,
        'element': document.createElement('div')
    };
    data.objects.push(obj);
    var g = document.getElementById('gameDiv')
    g.append(obj.element)
    return obj;
}



//Area de Juego
const addGameZone = () => {
    return addObject(new gameObject(0, 0, data.options.areaWidth, data.options.areaHeight));
}

//Crear jugador
let player = null;
const addPlayer = () => {
    let playerDim = getPlayerDim();
    player = addObject(new game.gameObject(playerDim.x, playerDim.y, playerDim.w, playerDim.h));
    return player;
}

//Crear Bola
let ball = null;
const addBall = () => {
    let w_ball = 10;
    let h_ball = 10;
    let x_ball = (player.go.x + (player.go.width / 2)) - (w_ball / 2);
    let y_ball = player.go.y - h_ball * 1.25;
    ball = addObject(new gameObject(x_ball, y_ball, w_ball, h_ball));
    //Velocidad inicial pelota
    ball.go.speed = {
        x: -3,
        y: -3
    }
    return ball;
}

const keyDown = (event) => {
    switch (event.keyCode) {
        case 37: //Izquierda
            data.objects[0].go.moveX(-1 * data.options.speedPlayer)
            break;
        case 39: //Derecha
            data.objects[0].go.moveX(1 * data.options.speedPlayer)
            break;
        case 32: //Espacio
            console.log(window.game);
            break;
        default:
            break;
    }
}

getAngle = () => {
    var angle = Math.atan2(this.y, this.x);   //radians
    // you need to devide by PI, and MULTIPLY by 180:
    var degrees = 180*angle/Math.PI;  //degrees
    return (360+Math.round(degrees))%360; //round number, avoid decimal fragments
}

const collisionDetection = (obj1, obj2) => {
    return (obj1.go.x < obj2.go.x + obj2.go.width && obj1.go.x + obj1.go.width > obj2.go.x &&
        obj1.go.y < obj2.go.y + obj2.go.height && obj1.go.height + obj1.go.y > obj2.go.y)
}

const update = () => {
    ball.go.x += ball.go.speed.x;
    ball.go.y += ball.go.speed.y;

    data.objects.forEach(e => {
        //para que pueda moverse en cualquier lado de la pantalla
        e.element.style.position = "absolute";
        e.element.style.height = e.go.height + 'px';
        e.element.style.width = e.go.width + 'px';
        e.element.style.top = e.go.y + 'px';
        e.element.style.left = e.go.x + 'px';
        e.element.style.borderStyle = 'solid';
        // e.element.style.backgroundColor = 'black';
    });

    //Colisiones x
    let collision_left = ball.go.x < 0;
    let collision_right = ball.go.x > (data.options.areaWidth - ball.go.width);
    //Collisiones y
    let collision_up = ball.go.y < 0;
    let collision_down = ball.go.y > (data.options.areaHeight - ball.go.height);

    //Condicionales para cambiar direccion de pelota
    if(collision_left || collision_right){
        ball.go.speed.x = - ball.go.speed.x;
    }
    if(collision_up || collision_down){
        ball.go.speed.y = - ball.go.speed.y;
    } 

    if(collisionDetection(ball, player))
        let player_x = player.go.x + (player.go.width / 2);
        let player_y = player.go.y;
        let ball_x = ball.go.x + 5;
        let ball_y = ball.go.y;

        {
        
    }

}

const game = {
    gameObject,
    data,
    methods: {
        update,
        addObject,
        keyDown,
        getPlayerDim,
        addPlayer,
        addGameZone,
        addBall,
        
    }
};

export default game;