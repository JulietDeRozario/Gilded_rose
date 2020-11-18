class Shop {
    constructor(items=[]){
      this.items = items;
    }
    
    updateQuality() {
      this.items.forEach(product => {
        product.getStatus();
        product.countADay();
      } )
  
      return this.items;
    }
  }

  module.exports = {
    Shop
  }