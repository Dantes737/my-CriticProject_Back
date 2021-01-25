const mongoose=require("mongoose");

const Schema=mongoose.Schema;

module.exports= new Schema({
title:String,
category:String,
rating:String,
year:Number,
imgSrc:String
});

