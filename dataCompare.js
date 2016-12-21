
module.exports = function compare(oldData, newData){
    var result = {added:[],deleted:[],modified:[]},
        sortData = [],
        len = 0;

    oldData.forEach(o => o.status = 0);
    newData.forEach(n => n.status = 1);
    sortData = oldData.concat(newData).sort((a,b) => a.email.localeCompare(b.email));
    len = sortData.length - 1;
    for (let i=0; i<len; i++) {
        if (sortData[i].email === sortData[i+1].email) {
            let tmp = {};
            let j = (sortData[i].status===1) ? i : i+1;
            if (sortData[i].ext !== sortData[i+1].ext) { tmp.ext = sortData[j].ext; }
            if (sortData[i].cell !== sortData[i+1].cell) { tmp.cell = sortData[j].cell; }
            if (sortData[i].alt !== sortData[i+1].alt) { tmp.alt = sortData[j].alt; }
            if (sortData[i].title !== sortData[i+1].title) { tmp.title = sortData[j].title; }
            if (Object.getOwnPropertyNames(tmp).length !== 0) {
                tmp.firstName = sortData[i].firstName;
                tmp.lastName = sortData[i].lastName;
                result.modified.push(tmp);
            }
            i++;
        }
        else if (sortData[i].status === 1) {
            result.added.push(sortData[i]);
        }
        else {result.deleted.push(sortData[i]);}
    }
    //for last data
    if (sortData[len].email!==sortData[len-1].email) {
        if (sortData[sortData.length-1].status === 1) {
            result.added.push(sortData[len]);
        }
        else {result.deleted.push(sortData[len]);}
    }

   return result;
};
