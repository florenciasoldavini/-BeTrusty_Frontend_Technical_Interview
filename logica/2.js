/*
  Los primeros dispositivos móviles tenían un teclado llamado T9
  con el que se podía escribir texto utilizando únicamente su
  teclado numérico (del 0 al 9).

  Crea una función que transforme las pulsaciones del T9 a su representación con letras.
    - Debes buscar cuál era su correspondencia original
    - Cada bloque de pulsaciones va separado por un guión.
    - Si un bloque tiene más de un número, debe ser siempre el mismo.
    - Ejemplo:
      Entrada: 6-666-88-777-33-3-33-888
      Salida: MOUREDEV
 */

const t9Keyboard = value => {
  const t9Map = {
    '2': ['A', 'B', 'C'],
    '3': ['D', 'E', 'F'],
    '4': ['G', 'H', 'I'],
    '5': ['J', 'K', 'L'],
    '6': ['M', 'N', 'O'],
    '7': ['P', 'Q', 'R', 'S'],
    '8': ['T', 'U', 'V'],
    '9': ['W', 'X', 'Y', 'Z']
  };

  let blocks = value.split('-');
  let result = '';

  blocks.forEach(block => { 
    let number = block[0];
    let timesPressed = block.length;
    let index = timesPressed - 1;

    result += t9Map[number][index % t9Map[number].length];
  });

  return result;
}

console.log(t9Keyboard('6-666-88-777-33-3-33-888'));
