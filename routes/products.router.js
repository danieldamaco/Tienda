const express = require('express');
const ProductsService = require('./../services/product.service.js')
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schema/product.shema')

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Los endpoints fijos deben ir antes de los dinamicos 
//filter antes de :id para que no piense que fitler es un id 
router.get('/filter', (res, req) => {
  res.send('Yo soy un filter')
});

// get parametros 
//concateno middlewares para la validación
// el next de validationHandler es la función asíncrona del get.
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params; //Desestructuracion de Emascript
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

//post para recibir informacion
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct)
  });

//Usando patch para actualizar datos parcialmente
//Para hacer actualizaciones totales se usa put
//Cuando se necesiten varias validaciones las concatenamos 
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  });

module.exports = router; 
