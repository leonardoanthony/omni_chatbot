export const slotmachine = () => {
    const colors = ['🟥','🟫','🟪','🟦','🟩','🟨','🟧','⬛','⬜'];
    const selected = [];

    for (let index = 0; index < 3; index++) {
        selected.push(colors[Math.floor(Math.random() * (colors.length))]);
    }

    const response = {
        result: selected.join(),
        status: todosIguais(selected)
    }

    return response;
}


function todosIguais(arr) {
    if (arr.length === 0) {
        return true; // Arrays vazios são considerados como tendo todos os elementos iguais
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