import React from 'react';
import './Tablero.css';
import Carta from '../Carta/Carta';


const Tablero = ({ baraja, parejaSeleccionada, seleccionarCarta }) => {

  return (
  <div className="tablero">
    {
      baraja.length > -1 ? 
        baraja.map((carta, index) => {

          let clase = null;

          const estaSiendoComparada = parejaSeleccionada.indexOf(carta) > -1 && parejaSeleccionada.indexOf(carta) < 2

          // Validar Rotar
          if(estaSiendoComparada || carta.fueAdivinada ) {
              clase = "rotate";
            
          } else {
            clase = null;

          }

          return <Carta 
                  key={index} 
                  icono={carta.icono} 
                  estaSiendoComparada={estaSiendoComparada}
                  seleccionarCarta={() => seleccionarCarta(carta)}
                  fueAdivinada={carta.fueAdivinada}
                  clase={clase}
                />
        })
      : null
    }
  </div>
  )
}

 
export default Tablero;