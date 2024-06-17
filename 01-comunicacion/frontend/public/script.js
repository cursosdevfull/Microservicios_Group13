const listProducts = document.getElementById("products");

function renderItem(el) {
  const { id, category, product, price, stock } = el;
  const tdId = document.createElement("td");
  tdId.textContent = id;
  const tdCategory = document.createElement("td");
  tdCategory.textContent = category;
  const tdProduct = document.createElement("td");
  tdProduct.textContent = product;
  const tdPrice = document.createElement("td");
  tdPrice.textContent = price;
  const tdStock = document.createElement("td");
  tdStock.textContent = stock;

  const tr = document.createElement("tr");
  tr.append(tdId);
  tr.append(tdCategory);
  tr.append(tdProduct);
  tr.append(tdPrice);
  tr.append(tdStock);

  listProducts.append(tr);
}

fetch("api/config")
  .then((res) => res.json())
  .then((response) => {
    fetch(response.backendUrl)
      .then((res) => res.json())
      .then((result) => {
        result.forEach(renderItem);
      });
  });
