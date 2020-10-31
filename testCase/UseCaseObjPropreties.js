let yourobject = { a: 12, b: 344, x: 33, y: 54 };
for (let key in yourobject) {
    console.log(key, yourobject[key]);
}
//With ES6, if you need both keys and values simultaneously, do

for (let [key, value] of Object.entries(yourobject)) {
    console.log(key, value);
}
//To avoid logging inherited properties, check with hasOwnProperty :

for (let key in yourobject) {
    if (yourobject.hasOwnProperty(key)) {
        console.log(key, yourobject[key]);
    }
}
// You don't need to check hasOwnProperty when iterating on keys if you're using a simple object (for example one you made yourself with {}).
// This MDN documentation explains more generally how to deal with objects and their properties.
// If you want to do it "in chunks", the best is to extract the keys in an array. As the order isn't guaranteed, this is the proper way. In modern browsers, you can use
let keys1 = Object.keys(yourobject);
//  To be more compatible, you'd better do this :
let keys2 = [];
for (let key in yourobject) {
    if (yourobject.hasOwnProperty(key)) keys2.push(key);
}