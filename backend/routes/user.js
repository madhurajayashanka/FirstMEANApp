const express = require('express');

const router = express.Router();

router.post("/signup",(req, res, next)=>{
  console.log("hi")
});

module.exports=router;
