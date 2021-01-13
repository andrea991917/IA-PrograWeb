import gameObject from "./game_object.js"


let data = {
    objects: [],
    options: {
        speedPlayer: 3,
        columns: 12,
        rows: 5,
        areaWidth: 800,
        areaHeight: 600,
        speedBall: 5,
        separation: 30

    }

};

let ball_moving = false;
let lifes = 3;

const restartAll = () =>{
    data.objects.forEach(e => {
        e.element.remove();
    });

    data.objects = [];
    addPlayer();
    addBall();
    addBlocks();
    addGameZone();
    lifes = 3;
    ball_moving = false;
}


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

let ArrayBlocks = []

//Crear bloques
const addBlocks = () => {

    for (let x = 0; x < game.data.options.columns; x++) {
        for (let y = 0; y < game.data.options.rows; y++) {
            let op = game.data.options;
            //bloques
            let ancho = (op.areaWidth - game.data.options.separation * 2) / op.columns;
            let alto = (op.areaHeight * 0.2) / op.rows;

            let block = game.methods.addObject(new game.gameObject(x * ancho + game.data.options.separation, y * alto + game.data.options.separation, ancho, alto));
            //agregamos cada bloque al array
            ArrayBlocks.push(block);
        }
    }
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

let keyLeft = false;
let keyRight = false;
let playerDirection = 0;

const keyDown = (event) => {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 37: //Izquierda
            keyLeft = true;
            break;
        case 39: //Derecha
            keyRight = true;
            break;
        case 32: //Espacio
            if(lifes > 0){
                ball_moving = true;
            }
            console.log(window.game);
            break;
        case 82: 
        restartAll();
        break;  
        default:
            break;
    }
}

const keyUp = (event) => {
    switch (event.keyCode) {
        case 37: //Izquierda
            keyLeft = false;
            break;
        case 39: //Derecha
            keyRight = false;
            break;
        case 32: //Espacio
            console.log(window.game);
            break;
        default:
            break;
    }
}

const getAngle = () => {
    var angle = Math.atan2(this.y, this.x); //radians
    // you need to devide by PI, and MULTIPLY by 180:
    var degrees = 180 * angle / Math.PI; //degrees
    return (360 + Math.round(degrees)) % 360; //round number, avoid decimal fragments
}

const calcVectorFromAngle = (angle) => {
    let rad = angle * Math.PI / 180;
    let x = Math.cos(rad);
    let y = Math.sin(rad);

    return {
        x,
        y
    }

}

const collisionDetection = (obj1, obj2) => {
    return (obj1.go.x < obj2.go.x + obj2.go.width && obj1.go.x + obj1.go.width > obj2.go.x &&
        obj1.go.y < obj2.go.y + obj2.go.height && obj1.go.height + obj1.go.y > obj2.go.y)
}

const update = () => {
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
    if (collision_left || collision_right) {
        ball.go.speed.x = -ball.go.speed.x;
    }
    if (collision_up || collision_down) {
        ball.go.speed.y = -ball.go.speed.y;
    }

    if(collision_down){
        ball_moving = false;
        lifes--;
        console.log(lifes);
    }

    ArrayBlocks.forEach(obj => {
        if (collisionDetection(obj, ball)) {
            console.log(obj.go);
            ArrayBlocks.splice(ArrayBlocks.indexOf(obj), 1);
            obj.element.style.visibility = 'hidden';

            let y_height = obj.go.y + obj.go.height;
            let y = obj.go.y;
            let x_width = obj.go.x + obj.go.width;
            let x = obj.go.x;
            let ball_center_x = ball.go.x + 5;
            let ball_center_y = ball.go.y + 5;
            //arriba
            if (ball_center_y > y && ball_center_y > y_height) {
                ball.go.speed.y = -ball.go.speed.y;

                //Abajo
            } else if (ball_center_y < y && ball_center_y < y_height) {
                ball.go.speed.y = -ball.go.speed.y;
                //izquierda
            } else if (ball_center_x < y && ball_center_x < x_width) {
                ball.go.speed.x = -ball.go.speed.x;
                //derecha
            } else if (ball_center_x > y && ball_center_x > x_width) {
                ball.go.speed.x = -ball.go.speed.x;
            }


        }

    })


    if (collisionDetection(ball, player)) {
        let player_x = player.go.x + (player.go.width / 2);
        let player_y = player.go.y;
        let ball_x = ball.go.x + 5;
        let ball_y = ball.go.y;

        let player_l = player_x - player.go.width / 2;
        let player_r = player_x + player.go.width / 2
        //Distancia entre la pelota y el jugador
        let distance_P_B = ball_x - player_l;
        //pasamos la distancia a porcentaje en base al tamaño del jugador
        let angle = (180 * distance_P_B) / player.go.width;

        //ponemos la nueva velocidad de nuestra pelota despues de chocar con nuestro player
        let newSpeedX = calcVectorFromAngle(angle).x * -1 * data.options.speedBall;
        let newSpeedY = calcVectorFromAngle(angle).y * -1 * data.options.speedBall;
        ball.go.speed.x = newSpeedX;
        ball.go.speed.y = newSpeedY;
    }

    //moviemiento constante player 
    if (player.go.x > 0 && keyLeft) {
        data.objects[0].go.moveX(-1 * data.options.speedPlayer)
    }
    if (player.go.x < (data.options.areaWidth - player.go.width) && keyRight) {
        data.objects[0].go.moveX(1 * data.options.speedPlayer)
    }





    //movimiento de la bola
    if (ball_moving)  {
        ball.go.x += ball.go.speed.x;
        ball.go.y += ball.go.speed.y;
    }else{
        //para que pelota se mueva junto a player 
        let w_ball = 10;
        let h_ball = 10;
        let x_ball = (player.go.x + (player.go.width / 2)) - (w_ball / 2);
        let y_ball = player.go.y - h_ball * 1.25;
        ball.go.x = x_ball;
        ball.go.y = y_ball;
    }

    document.getElementById('lifes').innerHTML = lifes;
}

const game = {
    gameObject,
    data,
    methods: {
        update,
        addObject,
        keyDown,
        keyUp,
        getPlayerDim,
        addPlayer,
        addGameZone,
        addBall,
        addBlocks,
        restartAll

    }
};

export default game;