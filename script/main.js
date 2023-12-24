
let productsmainContainer = document.querySelectorAll('.pro-container0');
let productsShopContainer = document.querySelector('.pro-container');
let singleProductImgContainer = document.querySelector('.singleProductImage');
let singleProductDetailsContainer = document.querySelector('.singleProductDetails');

// getting the products
class Products {  
  async getProducts() {
    try {
      let result = await fetch('script/products.json');
      let data = await result.json();
      let products = data.items;
      products = products.map(items => {
        let {title, price, rating} = items.fields;
        let {id} = items.sys;
        let image = items.fields.image.fields.file.url;
        return {title, price, rating, id, image}
      })
   


      return products;
    } catch(error) {
      console.log("Catch error: ", error)
    }
    
  }
}


// display products
class UI {
  async displayProducts(products) {
    try {
      let result = '';
      let result1 = '';
      let shopResult = '';
      let stopNum = 0;
      products.forEach(product => {
        stopNum += 1;
        let starIcons = '';
        for (let i = 0; i < product.rating; i++) {
          starIcons += '<i class="fas fa-star"></i>';
        }
        if (stopNum >= 9) {
          result1 += `
          <a href="singleproduct.html" style="text-decoration: none;">
            <div class="product" data-id=${product.id}>
              <img src="${product.image}" alt="">
              <div class="description">
                <span>adidas</span>
                <h5>${product.title}</h5>
                <div class="star">
                ${starIcons}
                </div>
                <h4>$${product.price}</h4>
              </div>
              <a href="#" class="cart"><i class="fa-solid fa-cart-shopping" ></i></a>
            </div>
          </a>
          `
        } else {
          result += `
          <a href="singleproduct.html" style="text-decoration: none;">
            <div class="product" data-id=${product.id}>
              <img src="${product.image}" alt="">
              <div class="description">
                <span>adidas</span>
                <h5>${product.title}</h5>
                <div class="star">
                  ${starIcons};
                </div>
                <h4>$${product.price}</h4>
              </div>
              <a href="#" class="cart"><i class="fa-solid fa-cart-shopping" ></i></a>
            </div>
          </a>`;  
        }
        
        shopResult += `
        <a href="singleproduct.html" style="text-decoration: none;">
          <div class="product productShop" data-id=${product.id}>
            <img src="${product.image}" alt="">
            <div class="description">
              <span>adidas</span>
              <h5>${product.title}</h5>
              <div class="star">
              ${starIcons}
              </div>
              <h4>$${product.price}</h4>
            </div>
            <a href="#" class="cart"><i class="fa-solid fa-cart-shopping" ></i></a>
          </div>
        </a>`
        
        
      });
      
      productsShopContainer.innerHTML = shopResult;
      productsmainContainer[0].innerHTML = result;
      productsmainContainer[1].innerHTML = result1;
      this.singleProductDisplay(products);
    }
    catch(error) {
      console.log('who the fuck care about that error?')
    }
  }
  singleProductDisplay(products) {
    let productsElement = [...document.querySelectorAll('.pro-container')];
    let productList = [];  
    productsElement.forEach(container => {
      let productElement = [...container.querySelectorAll(".product")];
      productList.push(...productElement);
      
    });
    // products.forEach(value => {
    //   console.log(id)
    //   if (value.id === id) {
    //     console.log('kinkriasvhili')
    //     singleProductImgContainer.innerHTML = `<img src="${value.image}" width="100%" id="mainImg" class="mainImg" alt="">`
    //   }
    // })
    productList.forEach(value => {
      value.addEventListener('click', () => {
        console.log('hello');
      });
    });
    
    
  }
  
  
  
  
}


//Local Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products1", JSON.stringify(products)) 
  }
  static clickedValue(value) {
    localStorage.setItem("value", JSON.stringify(value));
  }
}

document.addEventListener('DOMContentLoaded', 
  ()=> {
    const ui = new UI();
    const products = new Products();
    
    //setup app
    // get all products
    products.getProducts()
    .then(products => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
     })
    // .then(()=> {
    //   ui.switchPage();
    // })

  }
)