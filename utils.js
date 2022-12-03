function splitData(obj){
    const n = Object.values(obj[0]).length;
    const labels = obj.map(o => Object.values(o).pop()); 
    const attributes = obj.map(o => Object.values(o).slice(0,n-1)) 
    return {labels,attributes}
}

function unique(y){
    return [...new Set(y)];
}



function probability(arr){
    const unik = unique(arr)
    const unikMap = unik.map(u => arr.filter(a => a===u).length/arr.length);
    const result = {};
    unik.forEach((u,i)=>{
        result[u] = +unikMap[i].toFixed(2);
    })
    return result;
    
}

module.exports = {splitData,unique,probability}