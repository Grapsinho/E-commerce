const barElement = document.getElementById('bar');
const navElement = document.getElementById('navbar');
const closeElement = document.getElementById('close');

if (barElement) {
  barElement.addEventListener('click', ()=> {
    navElement.classList.add('active')
  })
}
if (closeElement) {
  closeElement.addEventListener('click', ()=> {
    navElement.classList.remove('active');
  })
}


// single product

let mainImgElement = document.getElementById("mainImg");
let smalImgElements = document.getElementsByClassName("small-img");

// Convert HTMLCollection to an array using Array.from
let smalImgArray = Array.from(smalImgElements);

// Now you can use forEach on the array
smalImgArray.forEach(value => {
  value.addEventListener('click', ()=> {
    mainImgElement.src = value.src;
  })
});


// pro-container


