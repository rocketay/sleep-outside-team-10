import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// create an instance of the data source for the "tents" category
const dataSource = new ProductData("tents");

// get the element on the page where the product list will be rendered
const listElement = document.querySelector(".product-list");

// create an instance of ProductList and initialize it
const myList = new ProductList("tents", dataSource, listElement);
myList.init();

// listen for changes on the sort dropdown and re-sort the list
const sortSelect = document.getElementById("sortSelect");
sortSelect.addEventListener("change", function (e) {
  myList.sortProducts(e.target.value);
});
