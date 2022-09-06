array =[a,b,c]
        0,1,2

export const shuffle = (array) => {
    let current = array.length;//3
    let temp;
    let random;
    while (current > 0) {
        random = Math.floor(Math.random() * current); 
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
};