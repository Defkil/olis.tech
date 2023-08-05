/**
 * Creates a debounced function that delays the execution of the provided function until after a delay.
 *
 * @param func The function to be debounced.
 * @param wait The delay in milliseconds before `func` is executed.
 *
 * @returns A new function that, when invoked, delays the execution of `func` until after `wait` milliseconds from the last invocation of the returned function.
 */
export function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout;

  return function executedFunction() {
    const later = () => {
      clearTimeout(timeout);
      func();
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
/*
var totalRows = 4,
itemCol = 0;
for(var rowCount = 0; rowCount < totalRows; rowCount++){
let newCol;
newCol = document.createElement('div');
newCol.className = 'col';
document.getElementsByClassName('wrapper')[0].appendChild(newCol);
}

for(var itemCount = 0; itemCount < document.getElementsByClassName('window').length; itemCount++){
document.getElementsByClassName('col')[itemCol].appendChild(document.getElementsByClassName('window')[0]);
if(itemCol < totalRows - 1){
  itemCol++;
} else {
  itemCol = 0;
}
}
*/
