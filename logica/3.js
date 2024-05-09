/*
  Dado un array de números enteros positivos, donde cada uno
  representa unidades de bloques apilados, debemos calcular cuantas unidades
  de agua quedarán atrapadas entre ellos.

  - Ejemplo: Dado el array [4, 0, 3, 6, 1, 3].

  💧💧💧🪣💧💧
  💧💧💧🪣💧💧
  🪣💧💧🪣💧💧
  🪣💧🪣🪣💧🪣
  🪣💧🪣🪣💧🪣
  🪣💧🪣🪣🪣🪣

  Representando bloque con 🪣︎ y agua con 💧, quedarán atrapadas 7 unidades
  de agua. Suponemos que existe un suelo impermeable en la parte inferior
  que retiene el agua.
 */

const waterBlocks = value => {
  let left = 0
  let right = value.length - 1;
  let maxLeft = 0;
  let maxRight = 0;
  let trappedWater = 0;

  while (left < right) {
    if (value[left] < value[right]) {
      if (value[left] > maxLeft) {
        maxLeft = value[left];
      } else {
        trappedWater += maxLeft - value[left];
      }
      left++;
    } else {
      if (value[right] > maxRight) {
        maxRight = value[right];
      } else {
        trappedWater += maxRight - value[right];
      }
      right--;
    }
  };
  
  return trappedWater;
};

console.log(waterBlocks([4, 0, 3, 6, 1, 3]));