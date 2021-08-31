export function currency(num){
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function price(num){
    return parseFloat(num).toFixed(2);
}

