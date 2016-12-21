function quickSort(data,result) {
    var left = [],
        right = [],
        mid = data[0],
        isExist = false;

    if (data.length === 0) { return []; }
    for (let i = 1; i < data.length; i++) {
        if(data[i].email === mid.email) {
            isExist = true;
            let tmp = {},
                j = (data[i].status===1) ? data[i] : mid;
                k = (data[i].status===1) ? mid : data[i];
            if (data[i].ext !== mid.ext) { tmp.ext_old = k.ext; tmp.ext = j.ext; }
            if (data[i].cell !== mid.cell) { tmp.cell_old = k.cell; tmp.cell = j.cell; }
            if (data[i].alt !== mid.alt) { tmp.alt_old = k.alt; tmp.alt = j.alt; }
            if (data[i].title !== mid.title) { tmp.title_old = k.title; tmp.title = j.title; }
            if (Object.getOwnPropertyNames(tmp).length !== 0) {
                tmp.firstName = mid.firstName;
                tmp.lastName = mid.lastName;
                result.modified.push(tmp);
            }
        }
        else if(data[i].email < mid.email) { left.push(data[i]); }
        else { right.push(data[i]); }
    }
    if (!isExist) {
        if (mid.status === 1) { result.added.push(mid); }
        else { result.deleted.push(mid); }
    }

    return quickSort(left,result).concat(quickSort(right,result));
}

module.exports = function compare(oldData, newData){
    var result = { added:[],deleted:[],modified:[] },
        mergeData = [];

    oldData.forEach(o => o.status = 0);
    newData.forEach(n => n.status = 1);
    mergeData = oldData.concat(newData);

    quickSort(mergeData, result);

   return result;
};