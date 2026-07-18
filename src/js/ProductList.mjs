import { renderListWithTemplate } from "./utils.mjs";

// template function: returns the HTML string for a single product card
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    // store the products so we can re-sort them later
    this.products = [];
  }

  async init() {
    // get the list of products from the data source
    this.products = await this.dataSource.getData();
    // render the list
    this.renderList(this.products);
  }

  // sort the products by the given key ("name" or "price")
  sortProducts(sortBy) {
    if (sortBy === "name") {
      this.products.sort((a, b) =>
        a.NameWithoutBrand.localeCompare(b.NameWithoutBrand),
      );
    } else if (sortBy === "price") {
      this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    // re-render the list with the sorted products, clearing the old content first
    this.renderList(this.products);
  }

  renderList(list) {
    // clear = true so we don't stack duplicates when re-sorting
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}