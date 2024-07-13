export const slotmachine = () => {
    const colors = ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
    const selected = [];

    for (let index = 0; index < 3; index++) {
        selected.push(colors[Math.floor(Math.random() * (colors.length))]);
    }

    const response = {
        result: selected.join(' '),
        status: todosIguais(selected)
    }

    return response;
}


function todosIguais(arr) {
    if (arr.length === 0) {
        return true; 
    }
    
    const primeiroItem = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== primeiroItem) {
            return false;
        }
    }
    
    return true;
}

// console.log(slotmachine());