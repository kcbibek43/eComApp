let carted : any = [];
let Razorpay : any;
let dataId : any ;
let totalCost : number = 0;
function showallProduct(category) {
  const allCategories = ["all", "mens", "womens", "electronics", "jewelery"];
  allCategories.forEach((e) => {
    document.getElementById(e).style.backgroundColor = "whitesmoke";
  });
  document.getElementById(category).style.backgroundColor = "#FF426E";
  if (category === "mens") category = "men's clothing";
  if (category === "womens") category = "women's clothing";




  try {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        var content = document.getElementsByClassName("content")[0];
        content.innerHTML = "";
        json.forEach((element) => {
          if (category === "all" || element.category === category) {
            var pdiv = document.createElement("div");
            pdiv.setAttribute("id","box");
            pdiv.setAttribute("class","card");
            pdiv.style.margin = "1.3vw";
            pdiv.style.width = "15rem";
            var imgdiv = document.createElement("div");
            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src", element.image);
            img.style.width = "256px";
            img.style.height = "250px";
            pdiv.appendChild(img);
            var sdiv = document.createElement("div");
            sdiv.setAttribute("class","card-title");
            var title = document.createElement("h5");
            title.setAttribute("class","card-title");
            title.style.width = "100%";
            title.style.height = "40px";
            title.innerHTML = element.title;
            var list = document.createElement("ul");
            list.setAttribute("class","list-group list-group-flush");
            var price = document.createElement("li");
            price.setAttribute("class","list-group-item");
            price.style.fontWeight = "500";
            price.innerHTML = "$" + element.price;
            var addtocart = document.createElement("li");
            addtocart.setAttribute("class","list-group-item");
            price.innerHTML = "$ " + element.price;
            var addtocartButton = document.createElement("button");
            addtocartButton.innerHTML = "Buy Now!";
            addtocartButton.setAttribute("class","btn btn-primary");
            addtocartButton.style.width = "100%";
            addtocartButton.style.height = "100%";
            addtocart.appendChild(addtocartButton);
            list.appendChild(price);
            list.appendChild(addtocart);
            sdiv.appendChild(list);
            imgdiv.appendChild(img);
            pdiv.appendChild(imgdiv);
            pdiv.appendChild(title);
            pdiv.appendChild(sdiv);
            pdiv.addEventListener("click", () => {
              content.innerHTML = "";
              var div1 = document.createElement("div");
              var div2 = document.createElement("div");
              var img = document.createElement("img");
              img.setAttribute("src", element.image);
              img.style.width = "100%";
              img.style.height = "100%";
              div1.appendChild(img);
              div1.style.backgroundColor = "whitesmoke";
              div2.style.backgroundColor = "whitesmoke";
              div2.setAttribute("class","container-fluid");
              div1.style.width = "40%";
              div2.style.width = "40%";
              div2.style.padding = "2vw";
              var heading = document.createElement("h5");
              heading.innerHTML = element.title;
              div2.appendChild(heading);

              var categorydesc=document.createElement('p');
              categorydesc.innerHTML=element.category;
              categorydesc.style.fontStyle = "italic";
              div2.appendChild(categorydesc);

              div2.appendChild(document.createElement('hr'));
              
              var price = document.createElement("h6");
              price.innerHTML = "Price : $ " + element.price + " only!";
              div2.appendChild(price);
              var rating=document.createElement('h6');
              var cnt = Math.round(element.rating.rate);
              var str : string = "";
              for(var i=0;i<5;i++){
                if(i<cnt){
                  str += "⭐ ";
                }
                else{
                  str += `<span class="fa fa-star"></span>` + " ";
                }
              }
              rating.innerHTML="Rating: "+str;
              div2.appendChild(rating);
              var desc = document.createElement('h6');
              desc.innerHTML = element.description;
              div2.appendChild(desc);
              
              var button = document.createElement("button");
              button.innerHTML = "Add to the Cart"
              button.setAttribute("id" , "addcart");
              button.setAttribute("class","btn btn-primary");
              button.style.alignSelf = "center";
              var reviews = document.createElement("h6");
              reviews.innerHTML = element.rating.count+" Reviews";
              div2.appendChild(reviews);
              button.addEventListener("click" ,() => {
                let quantity = parseInt("1");
                let newCart = {...element,quantity};
                  carted.push(newCart);
              });
              div2.appendChild(button);
              content.appendChild(div1);
              content.appendChild(div2);
            });
            content.appendChild(pdiv);
          }
        });
      });
  } catch (e) {
    console.log(e);
  }
}


function cartItems(){
  const allCategories = ["all", "mens", "womens", "electronics", "jewelery"];
  allCategories.forEach((e) => {
    document.getElementById(e).style.backgroundColor = "whitesmoke";
  });
  var main = document.getElementsByClassName("content")[0];
  main.innerHTML = "";
  var buttonContinue = document.createElement("button");
  buttonContinue.setAttribute("class","btn btn-secondary");
  buttonContinue.innerHTML = "Continue to shopping";
  buttonContinue.addEventListener("click", () => showallProduct('all'));
  main.appendChild(buttonContinue);
 

  if(carted.length===0){
       var sorry = document.createElement("p");
       sorry.innerHTML = "No Items in the cart! Continue shopping to add items in the cart.";
       main.appendChild(sorry); 
       totalCost = 0;
  }
  else{
    totalCost = 0;
    var table = document.createElement("table");
    table.setAttribute("class","table");
    var thead = document.createElement("thead");
    var trow = document.createElement("tr");
      var th1 = document.createElement("th");
      th1.innerHTML = "";
      var th2 = document.createElement("th");
      th2.innerHTML = "Product";
      var th3 = document.createElement("th");
      th3.innerHTML = "Price";
      var th4 = document.createElement("th");
      th4.innerHTML = "Quantity";
      var th5 = document.createElement("th");
      th5.innerHTML = "Remove";
      trow.append(th1);
      trow.append(th2);
      trow.append(th3);
      trow.append(th4);
      trow.append(th5);
      var tbody = document.createElement("tbody");
    carted.forEach(element => {
      var trow = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = "";
        var td2 = document.createElement("td");
        td2.innerHTML = element.title;
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
      var divx = document.createElement("div");
      divx.setAttribute("class","btn-group btn-group-sm");
      divx.setAttribute("role","group");
      divx.setAttribute("aria-label","Small button group");
      var button1 = document.createElement("button");
      button1.setAttribute("type","button");
      button1.setAttribute("class","btn btn-outline-primary");
      button1.innerHTML = "-";
      var button2 = document.createElement("button");
      button2.setAttribute("type","button");
      button2.setAttribute("class","btn btn-outline-primary");
      button2.innerHTML = ""+element.quantity;
      var button3 = document.createElement("button");
      button3.setAttribute("type","button");
      button3.setAttribute("class","btn btn-outline-primary");
      button3.innerHTML = "+";
      divx.appendChild(button1);
      divx.appendChild(button2);
      divx.appendChild(button3);
      td4.appendChild(divx);
      button1.addEventListener("click",()=>{
        if(element.quantity>1){
        element.quantity = element.quantity - 1;
        button2.innerHTML ="" +element.quantity;
        totalCost -= parseInt(element.price);
        totalCost = Math.round(totalCost);
        document.getElementById("total").innerHTML ="Total Amount " + totalCost;
        }

      });
      button3.addEventListener("click",()=>{
        element.quantity = element.quantity + 1;
        button2.innerHTML ="" +element.quantity;
        totalCost += parseInt(element.price);
        totalCost = Math.round(totalCost);
        document.getElementById("total").innerHTML ="Total Amount " + totalCost;
      });
        var image  = document.createElement("img");
        image.setAttribute("src",element.image);
        image.style.width = "60px";
        image.style.height = "60px";
        td1.appendChild(image);
        totalCost += element.price;
        td3.innerHTML = "$ " + element.price;
        var td5 = document.createElement("td");
        var removeElement = document.createElement("button");
        removeElement.setAttribute("class" , "btn");
        removeElement.setAttribute("type","button");
        removeElement.innerHTML = "Remove Item";
        removeElement.addEventListener("click",()=> removeEle(element));
        td5.appendChild(removeElement);
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5);
        tbody.appendChild(trow);
    });
    table.appendChild(tbody);
    main.appendChild(table);
    var button = document.createElement('button');
    button.innerHTML = "Checkout";
    button.addEventListener("click",() => modelDialog(totalCost));
    button.setAttribute("class", "btn btn-primary");
    button.style.height = "8vh";
    button.style.borderRadius = "7px";
    var subtotal = document.createElement('h3');
    subtotal.setAttribute("id","total");
    subtotal.style.display = "flex";
    subtotal.style.justifyContent = "space-between";
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    span1.innerHTML = "Total Amount ";
    span2.innerHTML = "" + Math.round(totalCost);
    subtotal.appendChild(span1);
    subtotal.appendChild(span2);
    subtotal.style.gap = "2vw";
    main.appendChild(document.createElement('hr'));
    main.appendChild(subtotal);
    main.appendChild(document.createElement('hr'));
    main.appendChild(button);
  }
  
}

async function razorpayRequest(){
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": "Basic cnpwX3Rlc3RfRXRuNmRzSkVadWh1dXA6ZkliS2RsQTZJaHRrM2Q1djRYUUUwMXNs"
   }
   
   let bodyContent = JSON.stringify({
       "amount": 500,
       "currency": "INR",
       "receipt": "qwsaq1"
   });
   
   let response = await fetch("https://api.razorpay.com/v1/orders", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.json();
   dataId = data.id;
   
}

async function razorpayResponse(total: number){
  var options = {
    "key": "rzp_test_Etn6dsJEZuhuup", // Enter the Key ID generated from the Dashboard
    "amount": total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": dataId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
      alert(response.razorpay_payment_id);
      carted.splice(0, carted.length);
      totalCost = 0;
      cartItems();
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com", 
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
try{
rzp1.open();
}
catch(err){
  console.log(err);
}
}

function modelDialog(totalCost){
  var modalbar = document.createElement("div");
  modalbar.setAttribute("class","modal-dialog modal-dialog-centered");
  var modalContent = document.createElement("div");
  modalContent.setAttribute("class","modal-content");
  var modalHeader = document.createElement("div");
  modalHeader.setAttribute("class","modal-header");
  var heading = document.createElement("h1");
  heading.setAttribute("class","modal-title fs-5");
  heading.setAttribute("id","exampleModalCenterTitle");
  heading.innerHTML = "Payment Window";
  modalHeader.appendChild(heading);
  modalContent.appendChild(modalHeader);
  var modalBody = document.createElement("div");
  modalBody.setAttribute("class","modal-body")
  var p = document.createElement("p");
  p.innerHTML = "Do you want to continue payment";
  modalBody.appendChild(p);
  modalContent.appendChild(modalBody);

  var modalFooter = document.createElement("div");
  modalFooter.setAttribute("class","modal-footer");

  var cancleButton1 = document.createElement("button");
  cancleButton1.setAttribute("type","button");
  cancleButton1.setAttribute("class" , "btn btn-secondary");
  cancleButton1.setAttribute("data-bs-dismiss","modal");
  cancleButton1.innerHTML = "Close";
  cancleButton1.addEventListener("click",()=>{ 
    clearTheDialog();
  });
  modalFooter.appendChild(cancleButton1);
  var acceptButton = document.createElement("button");
  acceptButton.setAttribute("type","button");
  acceptButton.setAttribute("class" , "btn btn-primary");
  acceptButton.innerHTML = "Proceed to Pay";
  acceptButton.addEventListener("click",()=> {
    razorpayResponse(totalCost);
  });
  modalFooter.appendChild(acceptButton);

  modalContent.appendChild(modalFooter);
  var modalDiv = document.createElement("div");
  modalDiv.setAttribute("class","modal fade show");
  modalDiv.setAttribute("id","exampleModalCenter");
  modalDiv.setAttribute("tabindex","-1");
  modalDiv.setAttribute("aria-labelledby","exampleModalCenterTitle");
  modalDiv.style.display = "block";
  modalDiv.style.paddingLeft = "0px";
  modalDiv.setAttribute("aria-modal","true");
  modalDiv.setAttribute("role","dialog");
 var x = document.getElementsByClassName("content")[0];
 modalbar.appendChild(modalContent);
 modalDiv.appendChild(modalbar);
 x.appendChild(modalDiv);

 razorpayRequest();
}


function clearTheDialog(){
  var dialog = document.getElementsByClassName("modal fade show")[0];
  dialog.innerHTML = "";
  cartItems();
}


// function payAmount(){
//   razorpayResponse();
//   carted.splice(0, carted.length);
//   cartItems();
// }

function removeEle (item){
  totalCost -= (item.quantity * item.price);
  carted = carted.filter(element => element!=item);
  cartItems();
}

showallProduct("all");
document.getElementById("all").addEventListener("click", () => showallProduct("all"));
document.getElementById("mens").addEventListener("click", () => showallProduct("mens"));
document
  .getElementById("womens")
  .addEventListener("click", () => showallProduct("womens"));
document
  .getElementById("electronics")
  .addEventListener("click", () => showallProduct("electronics"));
document
  .getElementById("jewelery")
  .addEventListener("click", () => showallProduct("jewelery"));

document.getElementById("logo").addEventListener("click",()=>showallProduct("all"));

var x = document.getElementsByClassName("btn btn-primary position-relative")[0];
x.addEventListener("click" , () => 
  cartItems()
);

var home = document.getElementById("logo");
home.addEventListener("click" , () => showallProduct("all"));