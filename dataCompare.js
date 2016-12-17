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
            "email": "peterw@jsrocks.com"
        }
    ],
    newData = [
        {
            "firstName": "Tom",
            "lastName": "Zhang",
            "ext": "1001",
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
            "email": "Jennifer@jsrocks.com"
        }
    ];
*/

function compare(oldData, newData){
    var result={added:[],deleted:[],modified:[]};
    var oldNames = "",
        newNames = [];

    oldData.forEach(function(oItem,index) {
        var isExist = false;
        var oldFullname = oItem.firstName + oItem.lastName;
        oldNames += oItem.firstName + oItem.lastName;
        newData.forEach(function(nItem){
            var newFullname = nItem.firstName+nItem.lastName;
            if(index==0){newNames.push(newFullname);}
            if (JSON.stringify(oItem)==JSON.stringify(nItem)) {
                isExist = true;
            }
            else if(oldFullname == newFullname) {
                isExist = true;
                var temp = {};
                temp.firstName = nItem.firstName;
                temp.lastName = nItem.lastName;
                for(var i in nItem) {
                    if(nItem[i]!=oItem[i]) {
                        temp[i] = nItem[i];
                    }
                }
                result.modified.push(temp);
            }
            else {
            }
        });
        if (!isExist){result.deleted.push(oldFullname);}
    });

    newNames.forEach(function(item){
        if(oldNames.indexOf(item) == -1){
            result.added.push(item);
        }
    });
    return result;
}

var result = compare(oldData, newData);
console.log(result);


