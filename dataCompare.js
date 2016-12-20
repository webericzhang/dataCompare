/**
 * Created by Eric on 2016/12/16.
 */

var rf=require("fs");
var oldData=JSON.parse(rf.readFileSync("data/oldData.json","utf-8"));
var newData=JSON.parse(rf.readFileSync("data/newData.json","utf-8"));
/*
var oldData = [
        {
            "firstName": "Tom",
            "lastName": "Zhang",
            "ext": "1001",
            "cell": "416-000-0000",
            "alt": "",
            "title": "Manager",
            "email": "tomz@jsrocks.com"
        },
        {
            "firstName": "Peter",
            "lastName": "Wang",
            "ext": "1003",
            "cell": "647-222-2222",
            "alt": "416-333-3333",
            "title": "QA",
            "email": "peterw@jsrocks.com"
        },
        {
            "firstName": "Jessica",
            "lastName": "Zhai",
            "ext": "1003",
            "cell": "647-222-2222",
            "alt": "416-333-3333",
            "title": "QA",
            "email": "jessicaz@jsrocks.com"
        }
    ],
    newData = [
        {
            "firstName": "Tom",
            "lastName": "Zhang",
            "ext": "1002",
            "cell": "416-000-0000",
            "alt": "416-456-4567",
            "title": "Manager",
            "email": "tomz@jsrocks.com"
        },
        {
            "firstName": "Eric",
            "lastName": "Zhang",
            "ext": "1003",
            "cell": "647-222-2222",
            "alt": "416-333-3333",
            "title": "Developer",
            "email": "webericzhang@gmail.com"
        },
        {
            "firstName": "Peter",
            "lastName": "Wang",
            "ext": "1003",
            "cell": "647-222-2222",
            "alt": "416-333-3333",
            "title": "QA",
            "email": "peterw@jsrocks.com"
        },
        {
            "firstName": "Jennifer",
            "lastName": "Zhu",
            "ext": "1009",
            "cell": "416-555-4579",
            "alt": "416-456-4567",
            "title": "Accountant",
            "email": "Jenniferz@jsrocks.com"
        }
    ];
*/
/*function compare(oldData, newData){
    var result={added:[],deleted:[],modified:[]};

    oldData.forEach(function(oItem) {
        for(var i=0; i<newData.length; i++) {
            if(oItem.email === newData[i].email) {
                var temp = {};
                for(var j in newData[i]) {
                    if(newData[i][j] !== oItem[j]) {
                        temp[j] = newData[i][j];
                    }
                }
                if (Object.getOwnPropertyNames(temp).length !== 0) {
                    temp.firstName = newData[i].firstName;
                    temp.lastName = newData[i].lastName;
                    result.modified.push(temp);
                }
                newData.splice(i, 1);
                break;
            }
            else if(i===newData.length - 1) {result.deleted.push(oItem);}
        }
    });

    result.added = newData;

    return result;
}*/

function compare(oldData, newData){
    var result={added:[],deleted:[],modified:[]};
    var sortData = newData.sort(function(a,b){return a.email > b.email});

    oldData.forEach(function(oItem) {
        var h = sortData.length - 1,
            l = 0;
        while(l <= h){
            var m = Math.floor((h + l) / 2);
            if(oItem.email == sortData[m].email) {
                var temp = {};
                for(var i in sortData[m]) {
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
            else if(oItem.email > sortData[m].email) {l = m + 1;}
            else {h = m - 1;}
        }
        if (l > h) {result.deleted.push(oItem)};
    });

    result.added = sortData;

    return result;
}

var result = compare(oldData, newData);
console.log(result);