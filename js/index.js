function cambiarColor(){
    document.getElementById("Hola").style.color = "blue";
}
let tablero = document.querySelector(".tablero")

//let matriz = mezclarMatriz();

let matriz =[
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '']
];


dibujarPuzzle();
//addEventListeners();

function empezarJuego(){
    matriz = mezclarMatriz();
    dibujarPuzzle();
    addEventListeners();
    document.getElementById("botonEmpezar").style.display = 'none';
}

function dibujarPuzzle(){
    tablero.innerHTML = '';
    matriz.forEach(fila => {
        fila.forEach(pieza =>{
            var div = document.createElement("div");

            if(pieza != '' ){
                div.classList.add("pieza")

                var img = document.createElement("img");
                img.src = "img/p"+ pieza + ".jpg";
                
                div.appendChild(img);
    
                tablero.innerHTML += div.outerHTML 
            }
            else{
                div.classList.add("vacio");
                tablero.innerHTML += div.outerHTML 
            }
        })
    })
}

// function addEventListeners(){
//     let piezas = document.querySelectorAll(".pieza");

//     piezas.forEach(pieza =>{
//         pieza.addEventListener('click', () =>{
//             let posicionActual = buscarPosicion(pieza.innerHTML[15]);
//             let posicionVacia = buscarPosicion("");
//             let movimiento = siguienteMovimiento(posicionActual, posicionVacia);
            
//             if(movimiento == true){
//                 actualizarMatriz(pieza.innerHTML[15], posicionActual, posicionVacia);
//                 dibujarPuzzle();
//                 addEventListeners();
//                 if(compararMatriz()){
//                     window.location.href = 'fecha.html'
//                 }
//             }
//         })
//     })
// }

function addEventListeners() {
    let piezas = document.querySelectorAll(".pieza");
    let startX, startY;

    piezas.forEach(pieza => {
        pieza.addEventListener('touchstart', function(event) {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        }, false);

        pieza.addEventListener('touchend', function(event) {
            var endX = event.changedTouches[0].clientX;
            var endY = event.changedTouches[0].clientY;

            var deltaX = endX - startX;
            var deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        // Right swipe
                        movePiece(pieza, 'right');
                    } else {
                        // Left swipe
                        movePiece(pieza, 'left');
                    }
                }
            } else {
                // Vertical swipe
                if (Math.abs(deltaY) > 50) {
                    if (deltaY > 0) {
                        // Down swipe
                        movePiece(pieza, 'down');
                    } else {
                        // Up swipe
                        movePiece(pieza, 'up');
                    }
                }
            }
        }, false);
    });
}

// Modify the movePiece function to accept the puzzle piece element and the direction
function movePiece(pieza, direction) {
    let posicionActual = buscarPosicion(pieza.innerHTML[15]);
    let posicionVacia = buscarPosicion("");
    let movimiento = siguienteMovimiento(posicionActual, posicionVacia);

    if (movimiento == true) {
        actualizarMatriz(pieza.innerHTML[15], posicionActual, posicionVacia);
        dibujarPuzzle();
        addEventListeners();
        if (compararMatriz()) {
            window.location.href = 'fecha.html'
        }
    }
}

function buscarPosicion(numeroPieza){
    let posicionX;
    let posicionY;
    matriz.forEach((fila, index) => {
      let elemento = fila.findIndex(item => item == numeroPieza);
        if(elemento !== -1){
            posicionX = elemento;
            posicionY = index;
        }
    })
    return [posicionY, posicionX]
}

function siguienteMovimiento(posicionActual, posicionVacia){

    let movimiento = false;

    let diferenciaY = posicionActual[0] - posicionVacia[0]
    let diferenciaX = posicionActual[1] - posicionVacia[1]

    if(diferenciaX == 0){
        if((posicionActual[0] - posicionVacia[0]) == -1){
            movimiento = true;
        }else if((posicionActual[0] - posicionVacia[0]) == 1){
            movimiento = true;
        }
    }else if(diferenciaY == 0){
        if((posicionActual[1] - posicionVacia[1]) == -1){
            movimiento = true;    
        }else if((posicionActual[1] - posicionVacia[1]) == 1){
            movimiento = true;
        }
    }

    return movimiento;
}

function actualizarMatriz(elemento, posicionActual, posicionVacia){
    matriz[posicionActual[0]][posicionActual[1]] = '';
    matriz[posicionVacia[0]][posicionVacia[1]] = elemento;
}

function mezclarMatriz(){
    let matrizMezclada = [
        [],
        [],
        []
    ]
    let array = ['1','2','3','4','5','6','7','8',''];
    let arrayMezclado = array.sort(() => Math.random() - 0.5)
    let fila = 0;
    let columna = 0;

    arrayMezclado.forEach(numero => {
        matrizMezclada[fila].push(numero);
        if(columna < 2){
            columna++
        }else{
            fila++
            columna = 0
        }
    })
    return matrizMezclada;
}

function compararMatriz(){
    let matrizCorrecta =  [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '']
    ];
    let ganaste = false;
    let contadorCorrectos = 0;

    matriz.forEach((fila, indexFila) => {
        fila.forEach((columna, indexColumna) =>{
            if(columna == matrizCorrecta[indexFila][indexColumna]){
                contadorCorrectos++;
            }
        })
    })

    if(contadorCorrectos == 9){
        ganaste = true; 
    }

    return ganaste
}