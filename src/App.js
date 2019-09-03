import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Tablero from './components/Tablero/Tablero';
import contruirBaraja from './utils/implementarCarta';
import Swal from 'sweetalert2'

function App(){

  // State
  const [ baraja, guardarBaraja ] = useState([]);
  const [ parejaSeleccionada, guardarParejaSeleccionada ] = useState([]);
  const [ numeroDeIntentos, guardarNumeroDeIntentos ] = useState(0);
  const [ iniciarCartas, guardarIniciarCartas ] = useState(true);


  // Inicializar State
  useEffect(() => {

    if(iniciarCartas) {
      contruirBaraja().then(barajita => guardarBaraja(barajita));

      guardarIniciarCartas(false)
    }
  
  }, [iniciarCartas])

  // Seleccionar Carta
  const seleccionarCarta = (carta) => {

    if(parejaSeleccionada.indexOf(carta) > -1 || carta.fueAdivinada) {
      return;
    }

    const parejaSeleccionadaNueva = [...parejaSeleccionada, carta];
    guardarParejaSeleccionada(parejaSeleccionadaNueva);

    if(parejaSeleccionadaNueva.length === 2) {
      compararPareja(parejaSeleccionadaNueva);
    }

  }

  // Comparar si ambas parejas con iguales
  const compararPareja = (parejaSeleccionada) => {

    setTimeout(() => {

      const [primeraCarta, segundaCarta] = parejaSeleccionada;
      let cartas = baraja;
      
      if (primeraCarta.icono  === segundaCarta.icono) {
        cartas = cartas.map( carta => {

          if(carta.icono !== primeraCarta.icono) {
            return carta;

          }

          return {
            ...carta,
            fueAdivinada: true
          };

        })
      }

      verificarSiHayGanador(cartas);

      // Guardar en el state
      guardarParejaSeleccionada([]);
      guardarBaraja(cartas);
      guardarNumeroDeIntentos(numeroDeIntentos + 1);
  }, 800)  

  }

  // Verificar Ganador
  const verificarSiHayGanador = cartas => {

    if(cartas.filter(carta => !carta.fueAdivinada).length === 0) {
      
      Swal.fire(
        '¡Felicidades!',
        '¡Haz Ganado!'
      )

    }
    
  }

  // Reiniciar Partida
  const resetearPartida = () => {

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 3000
    })
    
    Toast.fire({
      type: 'success',
      title: 'Juego Reiniciado'
    })

    // Reiniciar State
    guardarParejaSeleccionada([]);
    guardarNumeroDeIntentos(0);
  
  }



  return ( 
    <Fragment>
        <Header 
          numeroDeIntentos={numeroDeIntentos}
          resetearPartida={resetearPartida}
          guardarIniciarCartas={guardarIniciarCartas}
          guardarBaraja={guardarBaraja}
        />
        <Tablero 
          baraja={baraja}
          parejaSeleccionada={parejaSeleccionada}
          seleccionarCarta={(carta) => seleccionarCarta(carta)}
        />
      </Fragment>
  );

}
 
export default App;
