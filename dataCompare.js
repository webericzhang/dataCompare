/**
 * Created by Eric on 2016/12/16.
 */

var rf=require("fs");
//var oldData=JSON.parse(rf.readFileSync("data/oldData.json","utf-8"));
//var newData=JSON.parse(rf.readFileSync("data/newData.json","utf-8"));

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
        "firstName": "Simon",
        "lastName": "Lee",
        "ext": "1004",
        "cell": "647-111-1111",
        "alt": "416-1111-1111",
        "title": "QA",
        "email": "simonl@jsrocks.com"
    }
];
var newData = [
    {
        "firstName": "Tom",
        "lastName": "Zhang",
        "ext": "1006",
        "cell": "416-000-0002",
        "alt": "416-456-4566",
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
        "firstName": "Kate",
        "lastName": "Wang",
        "ext": "1004",
        "cell": "647-111-1111",
        "alt": "",
        "title": "Developer",
        "email": "katew@jsrocks.com"
    }
];

function compare(oldData, newData){
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
}

var result = compare(oldData, newData);
console.log(result);