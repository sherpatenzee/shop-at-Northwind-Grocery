"use strict"

window.onload = function () {

  let productDropdown = document.getElementById("productDropdown");
  productDropdown.onchange = productDropdownOnChange;

  let categoryDropdown = document.getElementById("categoryDropdown")
  categoryDropdown.onchange = displayCategoryProductOnChange;


  populateProductDropdown();

  document.getElementById("displayTable").style.display = "none"
  document.getElementById("categoryDropdown").style.display = "none"
  document.getElementById("searchDropdown").style.display = "none"



}


function populateProductDropdown() {

  let productDropdown = document.getElementById("productDropdown");

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Please select one!";
  productDropdown.appendChild(defaultOption);

  let Option = document.createElement("option");
  Option.value = "Search by Category";
  Option.textContent = "Search by Category!";
  productDropdown.appendChild(Option);


  let newOption = document.createElement("option");
  newOption.value = "all";
  newOption.textContent = "View All!";
  productDropdown.appendChild(newOption);

}



function displayCategory() {

  let categoryDropdown = document.getElementById("categoryDropdown")
  document.getElementById("categoryDropdown").innerHTML= "";

  fetch("http://localhost:8081/api/categories")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Please select one!";
      categoryDropdown.appendChild(defaultOption);

      for (let all of data) {

        let newOption = document.createElement("option");
        newOption.value = all.categoryId;
        newOption.textContent = all.name;
        categoryDropdown.appendChild(newOption);

      }
    });


}



function displayAllProduct() {

  let displayTable = document.getElementById("displayTable");

  fetch("http://localhost:8081/api/products")
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let row = displayTable.insertRow(-1);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = data[i].productName;


        let anchor = document.createElement("a");
        anchor.href = `details.html?productId=${data[i].productId}`;
        anchor.text = "See details";

        cell2.appendChild(anchor)


      }
    });


}


function productDropdownOnChange() {

  document.getElementById("displayCategory").innerHTML= "";
  let searchFilter = document.getElementById("productDropdown").value;


  if (searchFilter == "Search by Category") {

    document.getElementById("displayTable").style.display = "none"
    document.getElementById("categoryDropdown").style.display = "block"

    displayCategory()


  } else if (searchFilter == "all") {
    document.getElementById("categoryDropdown").style.display = "none"
    document.getElementById("displayTable").style.display = "block"

    displayAllProduct()

  }

  else if (searchFilter == "") {

    document.getElementById("displayTable").style.display = "none"
    document.getElementById("categoryDropdown").style.display = "none"

  }


}


function displayCategoryProductOnChange() {

  document.getElementById("displayCategory").innerHTML= "";
  let categoryDropdown = document.getElementById("categoryDropdown").value

  let displayCategory = document.getElementById("displayCategory")



  fetch("http://localhost:8081/api/products")
    .then(response => response.json())
    .then(data => {

      for (let category of data) {

        if (categoryDropdown == category.categoryId) {

          let row = displayCategory.insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          cell1.innerHTML = category.productId;
          cell2.innerHTML = category.productName;
          cell3.innerHTML = category.unitPrice;
          cell4.innerHTML = category.unitsInStock;
          cell5.innerHTML = category.supplier;


        }


      }
    })

}




