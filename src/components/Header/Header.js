import React from 'react';
import './Header.css';

import shuffle from 'lodash.shuffle';
import FontAwesomeClasses from '../../utils/fontAwesomeClasses';
import Swal from 'sweetalert2';

const Header = ({ resetearPartida, numeroDeIntentos, guardarBaraja}) => {

  const reiniciar = async () => {
    const { value: numeroDeCartas } = await Swal.fire({
      title: 'Introduce el número de cartas',
      input: 'number',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return '¡Necesitas escribir algo!'
        }
        
        if (value > 592) {
          return '¡Máximo 100 Cartas!'
        }
  
      }
    })
  
    if(!numeroDeCartas) {
      const cartas = []
      return cartas;
    }
  
    if (numeroDeCartas) {
      const fontAwesomeClasses = FontAwesomeClasses(); 
      let cartas = [];
  
      while (cartas.length < numeroDeCartas) {
        const index = Math.floor(Math.random() * fontAwesomeClasses.length);
  
        const carta = {
          icono: fontAwesomeClasses.splice(index, 1)[0],
          fueAdivinada: false
        };
  
        cartas.push(carta);
        cartas.push({...carta});
      }
  
      resetearPartida();
      return guardarBaraja(shuffle(cartas));

  }
}

  return ( 
    <header>
      <div className="titulo"> 
        <i className="fa fa-puzzle-piece"></i>
        React - Juego de Memoria
      </div>
      <div>
        <button className="boton-reiniciar" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>
      <div className="titulo">
        Intentos: {numeroDeIntentos}
      </div>
    </header>
  );
}
 
export default Header;