//creating DOM
document.body.innerHTML = `
<div class="container-fluid">
<h1> Nationality Details </h1><br>
<input type="text" id="searchname" placeholder=" Enter the name" size="50">
<input type="button" value="Search" id="btn" class="btn btn-primary">
<input type="button" value="Reset" id="resetbtn" class="btn btn-danger">
</div>
<div class=" container-fluid result">
<h4 id=result></h4>
</div>`;

let search_name = document.querySelector("#searchname");
let result_data = document.querySelector("#result");
let search_btn = document.querySelector("#btn");
let reset_btn = document.querySelector("#resetbtn");

search_btn.addEventListener("click", async () => {
  let value = document.getElementById("searchname").value;
  document.querySelector(".result").style.display = "block";

  //if given value is zero or empty then it will display the alert
  if (value.length == 0 || value.includes(" ")) {
    alert("Please enter the valid name without any spaces");
  }
  //fetch the data from url
  else {
    try {
      let data = await fetch(`https://api.nationalize.io/?name=${value}`);
      let result = await data.json();
      console.log(result);
      result_data.innerHTML = `<div> 
      <h4>Top Two Countries and Their Probabilities of ${result.name} </h4></div>`;
      
      for (let i = 0; i < 2; i++) {
        result_data.innerHTML += `
        <div class="container">
               <div class="card">
                 <div class="card-header">
                  <div class="card-title">TOP-${i + 1}</div>
                  
                 </div>
                 <div class="card-body">

                 Country_Id:${result.country[i].country_id}<br>
                 Probability :${result.country[i].probability}<br><br>

                 </div>
               </div>
             </div>
               `;
      }
    } catch {
      console.log(error);
    }
  }
});

var container_data = document.querySelector(".card");
reset_btn.addEventListener("click", () => {
  document.querySelector(".result").style.display = "none";
  search_name.value = "";
  result_data.innerHTML = " ";
});
