const mongoose = require("mongoose");
const { v4 } = require('uuid');

console.log('TCL:', v4());

const arr = [
    new mongoose.Types.ObjectId("123456789011"),
    new mongoose.Types.ObjectId("123456789012"),
    new mongoose.Types.ObjectId("123456789013"),
]

console.log('TCL:', arr[0].toString());

const res = arr.find(e => e.toString() == (new mongoose.Types.ObjectId("123456789011").toString()))
console.log('TCL:', res);
