const boom = require('@hapi/boom');
const {faker} = require('@faker-js/faker');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }
  
  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
    
  }

  async find(){
    return this.products;
  }
  
  async findOne(id){
    const product =  this.products.find(item => item.id === id);
    if (!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlocked){
      throw boom.conflict('product is blocked')
    }
    return product;
  }
  
  async update(id, changes){
    const index = this.products.findIndex(item => item.id ===id);

    if(index === -1){
      throw boom.notFound('product not found');
    } 

    const product = this.products[index];
    this.products[index] = {
      ...product, //asi logramos persistir los datos que existen solo modifico los datos diferentes
      ...changes
    };
    
    return this.products[index];
  }

  async delete(id){
     const index = this.products.findIndex(item => item.id ===id);

    if(index === -1){
      throw boom.notFound('product not found');
    } 

    this.products.splice(index, 1);
    return {id}
  }
  
}

module.exports = ProductsService;