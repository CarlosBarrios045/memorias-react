import React from 'react';
import './Carta.css';

const Carta = ({ seleccionarCarta, clase, icono }) => ( 

    <div className="carta flip-card" onClick={seleccionarCarta}>
        <div className={`flip-card-inner ${clase}`}>
          <div className="portada"></div>
          <div className="contenido">
            <i className={`fa ${icono} fa-5x`}></i>
          </div>
        </div>
    </div>

)

 
export default Carta;