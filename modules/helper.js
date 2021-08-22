export function currency(num){
    return input.map(num => {
        return Math.round((num + Number.EPSILON) * 100) / 100;
    });    
}