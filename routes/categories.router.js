const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();


router.get('/:category_id/products/:product_id', (req, res)=>{
  const {category_id, product_id} = req.params;
  res.json({
    category_id,
    product_id
  });
});


module.exports = router; 

