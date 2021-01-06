import gameObject from "./game_object.js"


let data = {
    objects: [],
    options: {
        speedPlayer: 10,
        columns: 12,
        rows:5,
        areaWidth: 800,
        areaHeight: 600,

    }

};


const getPlayerDim = () => {

    let w = data.options.areaWidth * 0.15;
    let h = data.options.areaHeight * 0.03;
    return {
        x: (data.options.areaWidth / 2) - (w/2),
        y: (data.options.areaHeight) - h,
        w,
        h
    }
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
}

const addObject = (gameObject) => {
    let obj = {
        'go': gameObject,
        'element': document.createElement('div')
    };
    data.objects.push(obj);
    var g = document.getElementById('gameDiv');
    g.append(obj.element)
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


const game = {
    gameObject,
    data,
    methods: {
        update,
        addObject,
        keyDown,
        getPlayerDim    
    }
};

export default game;



