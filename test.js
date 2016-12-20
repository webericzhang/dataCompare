'use strict';

//var rf=require("fs");
//var oldData=JSON.parse(rf.readFileSync("data/oldData.json","utf-8"));
//var newData=JSON.parse(rf.readFileSync("data/newData.json","utf-8"));

function generateData(num){
    let ret = [];
    for (let i=0; i<num; i++) {
        ret.push({
            'firstName': 'firstName' + i,
            'lastName': 'lastName' + i,
            'ext': 'ext' + i,
            'cell': 'cell' + i,
            'alt': 'alt' + i,
            'title': 'title' + i,
            'email': 'email' + i
        });
    }
    return ret;
}

let oldData = generateData(100000);
let newData = generateData(100000);

newData.splice(0,1);
newData.splice(8,1,{
    'firstName': 'firstName' + 'A',
    'lastName': 'lastName' + 'A',
    'ext': 'ext' + 'A',
    'cell': 'cell' + 'A',
    'alt': 'alt' + 'A',
    'title': 'title' + 'A',
    'email': 'email' + 'A'
});

newData[5].title = 'new title';

let tt = newData[3].title;
delete newData[3].title;
newData[3].title = tt;

//console.log(JSON.stringify(oldData));
//console.log(JSON.stringify(newData));

let compare = require('./dataCompare');

console.time('a');
var result = compare(oldData, newData);
console.timeEnd('a');

console.log(result);