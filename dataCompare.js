
module.exports = function compare(oldData, newData){
    var result = {added:[],deleted:[],modified:[]},
        sortData = newData.sort((a,b) => {
            if(a.email>b.email){return 1;}
            else if(a.email<b.email){return -1;}
            else {return 0;}
            });

    oldData.forEach((oItem) => {
        var h = sortData.length - 1,
            l = 0;
        while(l <= h) {
            var m = Math.floor((h + l) / 2);
            if (oItem.email > sortData[m].email) {l = m + 1;}
            else if (oItem.email < sortData[m].email) {h = m - 1;}
            else {
                let temp = {};
                for(let i in sortData[m]) {
                    if(sortData[m][i] !== oItem[i]) {
                        temp[i+"_old"] = oItem[i];
                        temp[i] = sortData[m][i];
                    }
                }
                if (Object.getOwnPropertyNames(temp).length !== 0) {
                    temp.firstName = sortData[m].firstName;
                    temp.lastName = sortData[m].lastName;
                    result.modified.push(temp);
                }
                sortData.splice(m,1);
                break;
            }
        }
        if (l > h) {result.deleted.push(oItem)};
    });

    result.added = sortData;

    return result;
}