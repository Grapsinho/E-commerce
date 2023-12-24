let productsmainContainer = document.querySelectorAll(".pro-container0");
let productsShopContainer = document.querySelector(".pro-container");
let singleProductImgContainer = document.querySelector(".singleProductImage");
let singleProductDetailsContainer = document.querySelector(
  ".singleProductDetails"
);

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("script/products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((items) => {
        let { title, price, rating } = items.fields;
        let { id } = items.sys;
        let image = items.fields.image.fields.file.url;
        let description = items.fields.description;
        return { title, price, rating, id, image, description };
      });

      return products;
    } catch (error) {
      console.log("Catch error: ", error);
    }
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null; // Cookie not found
}

// display products
class UI {
  async displayProducts(products) {
    try {
      let result = "";
      let result1 = "";
      let shopResult = "";
      let stopNum = 0;
      products.forEach((product) => {
        stopNum += 1;
        let starIcons = "";
        for (let i = 0; i < product.rating; i++) {
          starIcons += '<i class="fas fa-star"></i>';
        }
        if (stopNum >= 9) {
          result1 += `
          <a href="singleproduct.html" class="ramemagari" style="text-decoration: none;">
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
          `;
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
        </a>`;
      });

      productsShopContainer.innerHTML = shopResult;

      try {
        productsmainContainer[0].innerHTML = result;
        productsmainContainer[1].innerHTML = result1;
      } catch {
        this.singleProductDisplay(products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  singleProductDisplay(products) {
    let productsElement = [...document.querySelectorAll(".pro-container")];
    let productList = [];
    productsElement.forEach((container) => {
      let productElement = [...container.querySelectorAll(".product")];
      productList.push(...productElement);
    });

    productList.forEach((value) => {
      value.addEventListener("click", () => {
        let cookie = "giorgi" + "=" + encodeURIComponent(value.dataset.id);

        document.cookie = cookie;
      });
    });

    const username = getCookie("giorgi");

    products.forEach((value) => {
      if (value.id === username) {
        singleProductImgContainer.innerHTML = `<img src="${value.image}" width="100%" id="mainImg" class="mainImg" alt="">`;

        singleProductDetailsContainer.innerHTML = `
        <h6>Home / T-shirt</h6>
        <h4>${value.title}</h4>
        <h3>$${value.price}</h3>
        <select>
          <option>Select Size</option>
          <option>XL</option>
          <option>XXL</option>
          <option>Small</option>
          <option>Large</option>
          <option>Medium</option>
        </select>
        <input type="number" value="1">
        <button class="normal">Add To Cart</button>
        <h4>Product Details</h4>
        <p>${value.description}.</p>
        `;
      }
    });
  }
}

//Local Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products1", JSON.stringify(products));
  }
  static clickedValue(value) {
    localStorage.setItem("value", JSON.stringify(value));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //setup app
  // get all products
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  });
  // .then(()=> {
  //   ui.switchPage();
  // })
});
