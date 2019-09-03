import shuffle from 'lodash.shuffle';
import FontAwesomeClasses from './fontAwesomeClasses';
import Swal from 'sweetalert2';

export default async () => {

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

    return shuffle(cartas)
  

  }
};

