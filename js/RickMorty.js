// Sweet Aler toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// api url
const api_url = "https://rickandmortyapi.com/api/character";
// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  let data = await response.json();
  console.log(data);

  show(data);
}


// Calling that async function
getapi(api_url);

//to create HTML elments with API data
let tab = "";

// to store the names of Rick and Mory then display as options
let nameOption = "";
//Make a copy  for evrey property to edit them later
let imageArray = [];
let statusArray = [];
let namesArray = [];
let spaciesArray = [];
let genderArray = [];

function show(data) {
  // make the aray start from index 1 :)
  imageArray.push("0");
  namesArray.push("0");
  statusArray.push("0");
  spaciesArray.push("0");
  genderArray.push("0");

  //store data in the arrays
  for (let j = 0; j < data.results.length; j++) {
    namesArray.push(data.results[j].name);
    genderArray.push(data.results[j].gender);
    spaciesArray.push(data.results[j].species);
    statusArray.push(data.results[j].status);
    imageArray.push(data.results[j].image);
    // create options with names
    nameOption +=
      `<option   value='${j + 1}'>` + data.results[j].name + "</option>";
  }

  for (let i = 0; i < data.results.length; i++) {
    tab +=
      // Div column
      `<div id='divs${
        i + 1
      }' class="col shadow p-3 mb-5 bg-white rounded zoom"   style="padding:10px;  margin:10px; "    >` +
      // image
      `<img  id='img${i + 1}' src=${
        data.results[i].image
      } width=250 height=250 style="display: block; margin-left: auto; margin-right: auto;" ><hr/>` +
      //name of character
      `<h4  id='head${
        i + 1
      }' style='text-align:center; padding-top:10px; padding-bottom:10px'>` +
      data.results[i].name +
      "</h4><hr/>" +
      //More Info button use data-toggle same as onclick it will open the modal
      "<div style='  display: flex;justify-content: center;'>" +
      `<button  style=" font-size:15px ;margin:5px; text-align:center" type="button" class="btn btn-primary zoom" data-toggle="modal" data-target="#${
        i + 1
      }">` +
      //button text
      "<i class='fas fa-info-circle fa-lg	'></i>" +
      // button end
      "</button>" +
      //Edit Button
      `<button  style=" font-size:15px ;margin:5px; text-align:center" type="button" class="btn btn-warning zoom" data-toggle="modal" data-target="#e${
        i + 1
      }">` +
      //button text
      "<i class='fas fa-edit fa-lg'></i>" +
      // button end
      "</button>" +
      //Delete Button
      `<button style=" font-size:15px ;margin:5px; text-align:center" type="button" class="btn btn-danger zoom" 
        onclick='deleteBtn(this)' ">` +
      //button text
      "<i class='fas fa-trash-alt fa-lg'></i>" +
      // button end
      "</button>" +
      //div end
      "</div></div>" +
      //Modal for Edit object
      ` <div class="modal fade " id='e${
        i + 1
      }' tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered   " role="document">
        <div class="modal-content ">
          <div class="modal-header">
          <h3   style="padding-right: 350px;" class="modal-title">` +
      "Edit" +
      `</h3>
            <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

          <div style='display:grid; grid-template-columns:1fr 1fr;'> 
          
          
       <div class='shadow p-3 mb-5 bg-white rounded'  >

       <img  id='editimg${data.results[i].id}' src ='${data.results[i].image}' width=200;height=200 ;></div>` +
      `<div class='shadow p-3 mb-5 bg-white rounded  '  >
         <label style='font-size:18px'>Choos a method for edit</label>
         <select style='font-size:15px' id ='sr${data.results[i].id}' onchange="changeFunc('${data.results[i].id}' );" class="form-select" aria-label="Default select example">
         <option value='0'  selected disabled >Choos</option>
         <option value='2'> Rick and Morty API </option>
         <option value="3">Enter new image manually </option>
          </select>  

          <form style="display: none" id="myfrm${data.results[i].id}">
          <br>
          
            <div class="form-group"  >
              <label >Name of image </label>
              <input type="text" class="form-control" id="iname${data.results[i].id}">
            </div>
            <div class="form-group">
              <label >Image URL</label>
              <input type="text" class="form-control" id="url${data.results[i].id}" >
            </div>

          </form>
          
          ` +
      `
         <br>
         <label hidden id='rl${data.results[i].id}'    style='font-size:18px'>Select Character</label>
         <select hidden style='font-size:15px' id='r${data.results[i].id}' onchange="editChange(${data.results[i].id})"   class="form-select" aria-label="Default select example">
         <option value="01"  selected disabled >Choos</option>` +
      nameOption +
      `</select><br> <div class="d-flex justify-content-center">  <button style="width:200px" data-dismiss="modal" onclick="changeImage(${data.results[i].id})"   class="btn btn-warning ">Change</button></div>
           </div>
         </div></div>
         </div> </div></div>` +
      // End of Edit Dialog

      //Modal for View object
      ` <div class="modal fade " id='${i + 1}'
     
       tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered   " role="document">
        <div class="modal-content ">
          <div class="modal-header" >
            <h3   style="padding-right: 350px;" class="modal-title">` +
      "View" +
      `</h3>
            <button  type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div style='display:grid; grid-template-columns:1fr 1fr;'> 
          
          
      <div class='shadow p-3 mb-5 bg-white rounded  '  ><img id="moreimage${
        1 + i
      }" src ='${data.results[i].image}' width=200;height=200 ;></div>` +
      "<div class='shadow p-3 mb-5 bg-white rounded ' style='text-align:start'  >" +
      `<br><h4 id='hi${i + 1}' >ID: <span style='font-size:16px'>${
        data.results[i].id
      }</span> </h4>` +
      `<h4 id='hn${i + 1}'>Name: <span style='font-size:16px'>${
        data.results[i].name
      }</span> </h4>` +
      `<h4 id='hg${i + 1}'>Gender: <span style='font-size:16px'>${
        data.results[i].gender
      }</span> </h4>` +
      `<h4 id='hs${i + 1}'>Species: <span style='font-size:16px'>${
        data.results[i].species
      }</span> </h4>` +
      `<h4 id='his${i + 1}'>Status: <span style='font-size:16px'>${
        data.results[i].status
      }</span> </h4>` +
      `</div></div> </div>
        </div> </div></div>`;
  }

  document.getElementById("employees").innerHTML = tab;
}


// delete item
function deleteBtn(e) {
  e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
  Toast.fire({
    icon: "success",
    title: `Deleted Successfuly `,
  });
}

// first drop down list change
function changeFunc(a) {
  let selectBox = document.getElementById(`sr${a}`).value;
  let myform = document.getElementById(`myfrm${a}`);

  if (selectBox == "2") {
    document.getElementById(`r${a}`).removeAttribute("hidden");
    document.getElementById(`rl${a}`).removeAttribute("hidden");
    myform.style.display = "none";

    // delete the current character name from the list
    let selectobject = document.getElementById(`r${a}`);
    for (let i = 0; i < selectobject.length; i++) {
      if (selectobject.options[i].value == a) selectobject.remove(i);
    }
  } else if (selectBox == "3") {
    myform.style.display = "block";
    document.getElementById(`r${a}`).setAttribute("hidden", "hidden");
    document.getElementById(`rl${a}`).setAttribute("hidden", "hidden");
  } else {
    document.getElementById(`r${a}`).setAttribute("hidden", "hidden");
    document.getElementById(`rl${a}`).setAttribute("hidden", "hidden");
  }
}

// on second drop down list change - show image in edit dialog
function editChange(a) {
  let selectBox = document.getElementById(`r${a}`).value;
  document.getElementById(`editimg${a}`).src = imageArray[selectBox];
}

// click on change button
function changeImage(a) {
  let selectBox1 = document.getElementById(`sr${a}`).value;
  let selectBox = document.getElementById(`r${a}`).value;
  let nameimage = document.getElementById(`iname${a}`).value;
  let url = document.getElementById(`url${a}`).value;
  //if user want to enter image manullay check if the fields not empty
  if (selectBox1 == 3 && nameimage != "" && url != "") {
    Toast.fire({
      icon: "success",
      title: `${namesArray[a]} Changed to ${nameimage} `,
    });

    document.getElementById(`img${a}`).src = url;
    document.getElementById(`moreimage${a}`).src = url;
    document.getElementById(`head${a}`).innerHTML = nameimage;
    document.getElementById(`hi${a}`).innerHTML = "ID: " + a + 20;
    document.getElementById(`hn${a}`).innerHTML = "Name: " + nameimage;
    document.getElementById(`hg${a}`).innerHTML = "";
    document.getElementById(`hs${a}`).innerHTML = "";
    document.getElementById(`his${a}`).innerHTML = "";

    //if the  user use rickmory api
  } else if (selectBox != "01") {
    //Toast
    Toast.fire({
      icon: "success",
      title: ` Changed to ${namesArray[selectBox]} `,
    });
    //change to the new character
    document.getElementById(`img${a}`).src = imageArray[selectBox];
    document.getElementById(`moreimage${a}`).src = imageArray[selectBox];
    document.getElementById(`head${a}`).innerHTML = namesArray[selectBox];
    document.getElementById(`hi${a}`).innerHTML = "ID: " + a;
    document.getElementById(`hn${a}`).innerHTML =
      "Name: " + namesArray[selectBox];
    document.getElementById(`hg${a}`).innerHTML =
      "Gender: " + genderArray[selectBox];
    document.getElementById(`hs${a}`).innerHTML =
      "Species: " + spaciesArray[selectBox];
    document.getElementById(`his${a}`).innerHTML =
      "Status: " + statusArray[selectBox];
  }
}

//sort div elments from A-Z and from Z-A

let divs = [];
let clicktimes = 0;
function sortBtn(n) {
  let divid;


  for (var i = 1; i <= 20; ++i) {
    divid = document.getElementById(`divs${i}`);
    divs.push(divid);
  }

 // show sort buttons 
  if (n == 0) {
  //show
    if(clicktimes==0){
     
    document.getElementById('sortup').style.display = "inline";
    document.getElementById('sortdown').style.display = "inline";
    clicktimes =1
  }
    //hide 
    else {
      document.getElementById('sortup').style.display = "none";
      document.getElementById('sortdown').style.display = "none";
      clicktimes = 0; 
    }
  }


  
  //sort A-Z
  else if (n == 1) {
    divs.sort(function (a, b) {
      return a.childNodes[2].firstChild.nodeValue.localeCompare(
        b.childNodes[2].firstChild.nodeValue
      );
    });

  //sort Z-A
  } else if (n==2) {
  
    divs.sort(function (a, b) {
      return b.childNodes[2].firstChild.nodeValue.localeCompare(
        a.childNodes[2].firstChild.nodeValue
      );
    });
  }
  


  for (let i = 0; i < divs.length; i++) {
    document.getElementById("employees").appendChild(divs[i]);
  }
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    document.getElementById("mysearchi").style.borderEndEndRadius = "0px";
    document.getElementById("mysearchi").style.borderEndStartRadius = "0px";
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          document.getElementById("mysearchi").style.borderRadius = "25px";

          inp.value = this.getElementsByTagName("input")[0].value;
          let mydivArray = [];
          for (let i = 1; i <= 20; i++) {
            mydivArray.push(document.getElementById(`divs${i}`));
          }

          for (let i = 0; i < mydivArray.length; i++) {
            if (mydivArray[i].childNodes[2].firstChild.nodeValue == inp.value) {
              document.getElementById("employees").prepend(mydivArray[i]);
            }
          }

          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("change", function () {
    console.log("this is me ");
    document.getElementById("mysearchi").style.borderRadius = "25px";
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();

      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/

        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
autocomplete(document.getElementById("mysearchi"), namesArray);
