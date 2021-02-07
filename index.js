// creamos la variable de los cuadrados
const cantidadTarjetas = 10;
const data = new Array(cantidadTarjetas).fill('').map((data, index) => index);

// datos para generar los pares de los cuadros
const squares = shuffle([...data, ...data]);

parSeleccionado = [];

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function removeCard(tarjetaSeleccionada, tarjetaAnterior) {


    tarjetaSeleccionada.addEventListener('transitionend', () => {
        tarjetaSeleccionada.innerHTML = '';
        tarjetaAnterior.innerHTML = '';
        isWinner();
    })
}

function isWinner() {
    const tarjeta = document.getElementsByClassName('cardForRemove');
    if (tarjeta.length === 0) {
        alert("Ganaste!")
    }


}

//funcion Onclick
function onClick(tarjetaId, imagenId) {

    const tarjetaSeleccionada = document.getElementById(tarjetaId);



    if (tarjetaSeleccionada.classList.contains('hover')) {
        return;
    }

    tarjetaSeleccionada.classList.add('hover');
    //si par seleccionado esta vacio
    //si par seleccionado tiene un solo elemento
    //si par seleccionado esta lleno(2 elementos)
    if (parSeleccionado.length === 0) {
        parSeleccionado[0] = { imagenId, tarjetaId };

    } else if (parSeleccionado.length === 1) {
        parSeleccionado[1] = { imagenId, tarjetaId };
        if (parSeleccionado[0].imagenId === parSeleccionado[1].imagenId) {
            console.log("good luck match cards!")
            const tarjetaAnterior = document.getElementById(parSeleccionado[0].tarjetaId)

            removeCard(tarjetaSeleccionada, tarjetaAnterior);

            parSeleccionado = []

        }

    } else if (parSeleccionado.length === 2) {
        const card1 = document.getElementById(parSeleccionado[0].tarjetaId);
        const card2 = document.getElementById(parSeleccionado[1].tarjetaId);

        card1.classList.remove('hover');
        card2.classList.remove('hover');

        parSeleccionado = []
        parSeleccionado[0] = { imagenId, tarjetaId };

    }

}

//hacemos un recorrido del array 
const html = squares.map((imagen, index) =>
    `<div id="tarjeta-${index}" class="flip-container" onclick="onClick('tarjeta-${index}', ${imagen})" data-tilt data-tilt data-tilt-glare="true" data-tilt-max-glare="0.5" data-tilt-speed="400"
    data-tilt-scale="1.1" data-tilt-perspective="500" data-tilt-max="15" data-tilt-scale="1.1">
        <div class="flipper cardForRemove">
            <div class="front">
            <div class="back-icon">
                    <img class="icon" src="./icons/front.svg" alt="icono" />          
                </div>
            </div>
            <div class="back">
                <div class="back-icon">
                    <img class="icon" src="./icons/${imagen}.svg" alt="icono" />          
                </div>
            </div>            
        </div>
    </div>`).join('');

const gameContainer = document.getElementById('juegoMemoria');
gameContainer.innerHTML = html;
gameContainer.style.width = `${140 * Math.sqrt(cantidadTarjetas *2)}px`
gameContainer.style.height = `${110 * Math.sqrt(cantidadTarjetas *2)}px`