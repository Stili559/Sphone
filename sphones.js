import page from "./node_modules/page/page.mjs"
import {render,html} from "./node_modules/lit-html/development/lit-html.js"
import supportTemplate from "./support.js";
import loginRegisterTemplate from "./loginRegister.js";
import aboutUs from "./about-us.js";
import home from "./home.js";

// //scroll that goes to home
// var scrollToFeaturesButton = document.getElementById("about-us");
// scrollToFeaturesButton.addEventListener("click", function() {
//   var featuresSection = document.getElementById("about-us");
//   featuresSection.scrollIntoView({ behavior: "smooth" });
// });

// Section on display
AOS.init({});

// Home swiper
// var swiper = new Swiper(".home-slider", {
//   spaceBetween: 30,
//   centeredSlides: true,
//   autoplay: {
//     delay: 4500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// Get the range slider and price labels
const priceRange = document.getElementById('price-range');
const minPriceLabel = document.getElementById('min-price-label');
const maxPriceLabel = document.getElementById('max-price-label');

// Get all the products
const products = document.querySelectorAll('.card');

// Add an event listener to the range slider
priceRange.addEventListener('input', () => {
  // Get the selected minimum and maximum prices
  const minPrice = '';
  const maxPrice = priceRange.value;

  // Update the price labels
  minPriceLabel.textContent = '$' + minPrice;
  maxPriceLabel.textContent = '$' + maxPrice;

  // Loop through all the products and hide/show them based on their price
  products.forEach((product) => {
    const price = parseFloat(product.querySelector('.item-price').textContent.replace('$', ''));
    if (price >= minPrice && price <= maxPrice) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});


const button = document.getElementById('btnApi');
const factDiv = document.getElementById('factApi');

button.addEventListener('click', getSamsungPhoneFact);

function getSamsungPhoneFact() {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Samsung%20phone&format=json&origin=*';

  // Make GET request to Wikipedia API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Select a random search result from the list of results
      const randomResult = data.query.search[Math.floor(Math.random() * data.query.search.length)];

      // Update factDiv with random search result information
      factDiv.innerHTML = `<h2>${randomResult.title}</h2>
                           <p>${randomResult.snippet}</p>`;
    })
    .catch(error => console.error(error));
}


async function initFirebase55() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
  const { getFirestore, doc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");

  const firebaseConfig = {
    apiKey: "AIzaSyAHamF7O63FP3HuR1HlURKkjRvrdV1PnBU",
    authDomain: "sphones-5047f.firebaseapp.com",
    projectId: "sphones-5047f",
    storageBucket: "sphones-5047f.appspot.com",
    messagingSenderId: "505127648817",
    appId: "1:505127648817:web:edc729a5c16adda413df10"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach(button => button.addEventListener('click', handleEditButtonClick));

  document.querySelectorAll('.list-item').forEach(async item => {
    const key = item.getAttribute('data-key');
    const valueRef = doc(db, 'phone-specs', key);
    const valueSnapshot = await getDoc(valueRef);

    if (valueSnapshot.exists()) {
      item.textContent = valueSnapshot.data().value;
    }
  });

  async function handleEditButtonClick(event) {
    const listItem = event.target.parentNode.querySelector('.list-item');
    const currentText = listItem.textContent.trim();
    const key = listItem.getAttribute('data-key');

    // Extract the number from the text using a regular expression
    const match = currentText.match(/\d+(\.\d+)?/);
    const currentNumber = match !== null ? match[0] : '';

    const phoneId = key.split('-')[0]; // Extract the name or ID of the phone from the key

    // Create the dialog box
    const overlay = document.createElement('div');
    overlay.classList.add('dialog-overlay');

    const dialogBox = document.createElement('div');
    dialogBox.classList.add('dialog-box');

    const title = document.createElement('h3');
    title.textContent = `Enter new size for ${phoneId}:`;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = currentNumber;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    dialogBox.appendChild(title);
    dialogBox.appendChild(input);
    dialogBox.appendChild(saveButton);
    overlay.appendChild(dialogBox);
    document.body.appendChild(overlay);

    // Add event listener to save button
    saveButton.addEventListener('click', async () => {
      const newNumber = input.value.trim();
      if (newNumber !== '') {
        const newText = currentText.replace(currentNumber, newNumber);
        listItem.textContent = newText;

        // Store the new value in Firebase
        const valueRef = doc(db, 'phone-specs', key);
        await setDoc(valueRef, { value: newText });
      }
      document.body.removeChild(overlay);
    });

    // Load the edited value from Firebase
    const valueRef = doc(db, 'phone-specs', key);
    const valueSnapshot = await getDoc(valueRef);

    if (valueSnapshot.exists()) {
      listItem.textContent = valueSnapshot.data().value;
    }
  }
}

initFirebase55();



// Support popup close/show
var supportPopupOpen = false;
var supportButton = document.querySelector('.support');

supportButton.addEventListener('click', function() {
  let cartPopup = document.getElementById("cart-popup");

  if (cartPopup) {
    body.classList.remove("popup-open");
    document.body.removeChild(cartPopup);
    cartOpen = false;
  }
  if (loginRegisterPopup.style.display === "block") {
    toggleLoginRegisterPopup();
  }
  toggleSupportPopup();
});

function toggleSupportPopup() {
  var popup = document.getElementById("support-popup");
  var body = document.body;

  if (popup) 
  { 
    if (supportPopupOpen) {
      popup.classList.add("popup-hide"); 
      setTimeout(function() {
        popup.style.display = "none";
        popup.classList.remove("popup-hide");
        body.classList.remove("popup-open");
        supportPopupOpen = false;
      }, 500);
    } else {
      popup.style.display = "block";
      body.classList.add("popup-open");
      supportPopupOpen = true;
    }
  }
}

// Login/register popup close/show
render(loginRegisterTemplate, document.body);

// Show/hide the popup based on user interaction
let loginRegisterPopup = document.getElementById("loginRegister-popup");

function toggleLoginRegisterPopup() {
  var body = document.body;

  if (loginRegisterPopup.style.display === "block") {
    loginRegisterPopup.classList.add("popup-hide"); 
    setTimeout(function() {
      loginRegisterPopup.style.display = "none";
      loginRegisterPopup.classList.remove("popup-hide");
      body.classList.remove("popup-open");
    }, 500);
  } else {
    loginRegisterPopup.style.display = "block";
    body.classList.add("popup-open");
    if (supportPopupOpen) {
      toggleSupportPopup();
    }
  }
}

// Add event listener to show/hide the popup when a certain element is clicked
let loginButton = document.querySelector('.login');
loginButton.addEventListener("click", toggleLoginRegisterPopup);

// Cart popup
const cartCounter = document.getElementById("cart-counter");
const buyBtns = document.querySelectorAll(".buy-btn");
const productInfos = document.querySelectorAll(".product-info");
var body = document.body;

// Create a total item element and set cartOpen to false
let totalItem = document.createElement("p"); 
let cartOpen = false;

// Function to update the total count of items in the cart
function updateTotalCount() {
  let totalQuantity = 0;
  productInfos.forEach(function(productInfo) {
    totalQuantity += parseInt(productInfo.getAttribute("data-quantity"));
  });
  cartCounter.innerHTML = totalQuantity;
}

// Add click event listeners to buy buttons to update the cart
buyBtns.forEach(function(buyBtn, index) {
  buyBtn.addEventListener("click", function() {
    if (cartOpen) return; // If cart is open, don't update
    let quantity = parseInt(productInfos[index].getAttribute("data-quantity"));
    quantity++;
    productInfos[index].setAttribute("data-quantity", quantity);  
    updateTotalCount();
  });
});

// Add click event listener to cart button to open or close cart popup
const cartBtn = document.getElementById("cart-btn");

cartBtn.addEventListener("click", function() {
  let popup = document.getElementById("cart-popup");
  let supportPopup = document.getElementById("support-popup");
  
  if (popup) {
    body.classList.remove("popup-open");
    document.body.removeChild(popup);
    cartOpen = false;
    return;
  }
  if (supportPopup) {
    supportPopup.style.display = "none";
    body.classList.remove("popup-open");
    supportPopupOpen = false;
  }
  if (loginRegisterPopup.style.display === "block") {
    toggleLoginRegisterPopup();
  }

  // Create cart popup element
  popup = document.createElement("div");
  popup.id = "cart-popup";

  // Add heading and product list to cart popup
  let heading = document.createElement("h2");
  heading.innerHTML = "Your Cart:";
  popup.appendChild(heading);
  let productList = document.createElement("ul");

  // Initialize total price and hasItems flag
  let totalPrice = 0;
  let hasItems = false;

  // Iterate through product info elements to add cart items to product list
  productInfos.forEach(function(productInfo) {
    let quantity = parseInt(productInfo.getAttribute("data-quantity"));
    if (quantity > 0) {
      let price = parseInt(productInfo.parentElement.querySelector(".item-price").innerHTML.slice(1));
      let productItem = document.createElement("li");
      let productName = document.createElement("span");
      let productQuantity = document.createElement("span");
      let productPrice = document.createElement("span");
      let deleteBtn = document.createElement("button");

      // Set innerHTML and add click event listener to delete button
      productName.innerHTML = productInfo.innerHTML;
      productQuantity.innerHTML = ` x${quantity} `;
      productPrice.innerHTML = `$${price * quantity} `;
      deleteBtn.innerHTML = "Delete";

      deleteBtn.addEventListener("click", function() {
        let quantity = parseInt(productInfo.getAttribute("data-quantity"));
        if (quantity > 0) {
          quantity--;
          productInfo.setAttribute("data-quantity", quantity);
          updateTotalCount();

          productQuantity.innerHTML = ` x${quantity} `;
          productPrice.innerHTML = `$${price * quantity} `;
          
          if (quantity == 0) {
            productList.removeChild(productItem);
          }
          
          totalPrice -= price;
          totalItem.innerHTML = `Total: $${totalPrice}`;
          updateLocalStorage();

          // Update hasItems flag
          hasItems = false;
          productInfos.forEach(function(productInfo) {
            if (parseInt(productInfo.getAttribute("data-quantity")) > 0) {
              hasItems = true;
            }
          });
        }
      });

      // Append elements to product item and add to product list
      productItem.appendChild(productName);
      productItem.appendChild(productQuantity);
      productItem.appendChild(productPrice);
      productItem.appendChild(deleteBtn);
      productList.appendChild(productItem);

      // Update total price and set hasItems to true
      totalPrice += price * quantity;
      totalItem.innerHTML = `Total: $${totalPrice}`;
      hasItems = true;
    }
  });

  // If there are items in the cart, create checkout popup element
  if (hasItems) {
    let checkoutBtn = document.createElement("button");
    checkoutBtn.innerHTML = "Place Order";

    checkoutBtn.addEventListener("click", function() {
      body.classList.add("popup-open");
      let popup = document.getElementById("cart-popup");
      if (totalPrice == 0) {
        return;
      }
      if (popup) {
        document.body.removeChild(popup);
        cartOpen = false;
      }

      // Create checkout popup and add elements
      let overlay = document.createElement("div");
      overlay.id = "overlay";
      document.body.appendChild(overlay);

      let checkoutPopup = document.createElement("div");
      checkoutPopup.id = "checkout-popup";
      checkoutPopup.style.zIndex = "10000";

      let checkoutHeading = document.createElement("h2");
      checkoutHeading.innerHTML = "Checkout:";
      checkoutPopup.appendChild(checkoutHeading);

      let productListClone = productList.cloneNode(true);
      
      productListClone.childNodes.forEach(function(productItem) {
        productItem.removeChild(productItem.lastChild);
      });
      checkoutPopup.appendChild(productListClone);

      let totalPriceClone = totalItem.cloneNode(true);
      checkoutPopup.appendChild(totalPriceClone);

      let orderNowBtn = document.createElement("button");
      orderNowBtn.innerHTML = "Order Now";
      checkoutPopup.appendChild(orderNowBtn);
      document.body.appendChild(checkoutPopup);

      // Add input fields and click event listener to order now button
      let descriptionHeading = document.createElement("h2");
      descriptionHeading.innerHTML = "Description:";
      checkoutPopup.appendChild(descriptionHeading);

      let nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.placeholder = "Name";
      checkoutPopup.appendChild(nameInput);

      let phoneInput = document.createElement("input");
      phoneInput.type = "tel";
      phoneInput.placeholder = "Phone Number";

      checkoutPopup.appendChild(phoneInput);
      let addressInput = document.createElement("textarea");
      addressInput.placeholder = "Address";
      checkoutPopup.appendChild(addressInput);

      function showMessage(message){
        const messageElement = document.getElementById('hint');
        messageElement.innerHTML = message;
        messageElement.style.display = 'block'; // Set display to block
        messageElement.style.opacity = '1';
        setTimeout(() => {
            messageElement.style.opacity = '0';
            // Set display back to none after the transition is complete
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 500);
        }, 3000);
      }

      // Cart tems info in firebase
      orderNowBtn.addEventListener("click", async function() {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
        const { getFirestore, collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");
    
        const firebaseConfig = {
          apiKey: "AIzaSyAHamF7O63FP3HuR1HlURKkjRvrdV1PnBU",
          authDomain: "sphones-5047f.firebaseapp.com",
          projectId: "sphones-5047f",
          storageBucket: "sphones-5047f.appspot.com",
          messagingSenderId: "505127648817",
          appId: "1:505127648817:web:edc729a5c16adda413df10"
        };
    
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Validate input fields
        if (nameInput.value.trim().length < 5) {
          showMessage("Please enter a name with at least 5 characters.");
          return;
        }
        if (phoneInput.value.trim().length < 9 || !/^\d+$/.test(phoneInput.value.trim())) {
          showMessage("Please enter a valid phone number with at least 9 digits.");
          return;
        }
        if (addressInput.value.trim().length < 10) {
          showMessage("Please enter an address with at least 10 characters.");
          return;
        }
    
        // Get order data
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();
        const items = productListClone.textContent;
        
        let orderTotal = totalPriceClone.textContent;
        const totalPrice = orderTotal;
    
        // Add order to Firestore
        try {
          const docRef = await addDoc(collection(db, "orders"), {
            name,
            phone,
            address,
            items,
            totalPrice,
            timestamp: serverTimestamp()
          });
          console.log("Order added with ID: ", docRef.id);
    
          // Clear cart and update local storage
          productList.innerHTML = "";
          totalItem.innerHTML = "Total: $0";
          updateLocalStorage();
    
          body.classList.remove("popup-open");
        } catch (error) {
          console.error("Error adding order: ", error);
        }
       
        document.body.removeChild(checkoutPopup);
        document.body.removeChild(overlay);
        
        // create a new div element for the toast
        var toast = document.createElement("div");

        // set the toast's text and style
        toast.innerText = "Your order has been successfully completed!";
        toast.style.zIndex = "100";
        toast.style.backgroundColor = "black";
        toast.style.color = "white";
        toast.style.textAlign = "center";
        toast.style.position = "fixed";
        toast.style.bottom = "400px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.padding = "15px";
        toast.style.width = "500px";
        toast.style.borderRadius = "10px";
        toast.style.transition = "opacity 0.5s ease-in-out";

        // add the toast to the document body
        document.body.appendChild(toast);

        // show the toast
        toast.style.opacity = "1";

        // hide the toast after 2 seconds
        setTimeout(function(){
          toast.style.opacity = "0";
        }, 2000)
      });

      // Add close button and remove cart elements
      let closeBtn = document.createElement("button");
      closeBtn.id = "close-btn";
      closeBtn.innerHTML = "Cancel Order";
      checkoutPopup.appendChild(closeBtn);

      closeBtn.addEventListener("click", function() {
        document.body.removeChild(checkoutPopup);
        document.body.removeChild(overlay);
        body.classList.remove("popup-open");
      });

      // Clear cart and update local storage
      productList.innerHTML = "";
      totalItem.innerHTML = "Total: $0";
      totalPrice = 0;

      productInfos.forEach(function(productInfo) {
        productInfo.setAttribute("data-quantity", 0);
      });
      updateTotalCount();
      updateLocalStorage();
    });

    // Append product list, total item and checkout button to cart popup
    popup.appendChild(productList);
    totalItem.innerHTML = `Total: $${totalPrice}`;
    popup.appendChild(totalItem);
    popup.appendChild(checkoutBtn);
  } else {
    // If cart is empty, display message
    let emptyCart = document.createElement("p");
    emptyCart.innerHTML = "Your cart is empty";
    popup.appendChild(emptyCart);
  }

  // Append cart popup to document body and set cartOpen to true
  document.body.appendChild(popup);
  cartOpen = true;
  updateTotalCount();
});

// Function to update local storage with cart items
function updateLocalStorage() {
  let cartItems = [];
  productInfos.forEach(function(productInfo) {
    let quantity = parseInt(productInfo.getAttribute("data-quantity"));
    if (quantity > 0) {
      let itemName = productInfo.innerHTML;
      let itemPrice = parseInt(productInfo.parentElement.querySelector('.item-price').innerHTML.slice(1));
      cartItems.push({ name: itemName, quantity: quantity, price: itemPrice });
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Support popup info in firebase
async function initFirebase() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
  const { getFirestore, collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");

  let popup = document.getElementById("support-popup");

  const firebaseConfig = {
    apiKey: "AIzaSyAHamF7O63FP3HuR1HlURKkjRvrdV1PnBU",
    authDomain: "sphones-5047f.firebaseapp.com",
    projectId: "sphones-5047f",
    storageBucket: "sphones-5047f.appspot.com",
    messagingSenderId: "505127648817",
    appId: "1:505127648817:web:edc729a5c16adda413df10"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    addDoc(collection(db, 'support-requests'), {
      name,
      email,
      subject,
      message,
      timestamp: serverTimestamp()
    })
    .then(function(docRef) {
      document.querySelector('form').reset();
      popup.style.display = "none";
      body.classList.remove("popup-open");
  
       var toast = document.createElement("div");

       toast.innerText = "Thank you for contacting our support team. We will get back to you soon.";
       toast.style.zIndex = "100";
       toast.style.backgroundColor = "black";
       toast.style.color = "white";
       toast.style.textAlign = "center";
       toast.style.position = "fixed";
       toast.style.bottom = "400px";
       toast.style.left = "50%";
       toast.style.transform = "translateX(-50%)";
       toast.style.padding = "15px";
       toast.style.width = "500px";
       toast.style.borderRadius = "10px";
       toast.style.transition = "opacity 0.5s ease-in-out";

       document.body.appendChild(toast);

       toast.style.opacity = "1";

       setTimeout(function(){
         toast.style.opacity = "0";
       }, 2500)
    })
    .catch(function(error) {
      console.error(error);
      popup.style.display = "none";
      body.classList.remove("popup-open");
    });
  });
}

initFirebase();

function showMessage2(message){
  const messageElement = document.getElementById('hint2');
  messageElement.innerHTML = message;
  messageElement.style.display = 'block'; // Set display to block
  messageElement.style.opacity = '1';
  setTimeout(() => {
      messageElement.style.opacity = '0';
      // Set display back to none after the transition is complete
      setTimeout(() => {
          messageElement.style.display = 'none';
      }, 500);
  }, 3000);
}

// loginRegister popup info in firebase
async function initFirebase22() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
  const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js");

  const firebaseConfig = {
    apiKey: "AIzaSyAHamF7O63FP3HuR1HlURKkjRvrdV1PnBU",
    authDomain: "sphones-5047f.firebaseapp.com",
    projectId: "sphones-5047f",
    storageBucket: "sphones-5047f.appspot.com",
    messagingSenderId: "505127648817",
    appId: "1:505127648817:web:edc729a5c16adda413df10"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const loginForm = document.querySelector('#loginRegister-popup form:first-of-type');
  const registerForm = document.querySelector('#loginRegister-popup form:last-of-type');
  const popup = document.getElementById("loginRegister-popup");

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('.emailL').value;
    const password = loginForm.querySelector('.passwordL').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login
        const user = userCredential.user;
        console.log('User login:', user);
          loginForm.reset();
          popup.style.display = "none";
          popup.classList.remove("popup-hide");
          body.classList.remove("popup-open");
          showMessage2("You have successfully logged in.");    

          user.getIdToken().then(token => {
            sessionStorage.setItem('userToken', token);
          
            const orderBtns = document.querySelectorAll('.buy-btn');
            const userToken = sessionStorage.getItem('userToken');
            const EditBtns = document.querySelectorAll('.edit-button');
            const createPhone = document.querySelectorAll('.gone');
            const loginbtn = document.querySelector('.login');
            const cartbt = document.getElementById('cart-btn');
            const logoutbtn = document.getElementById('logoutButton');
          
            if (userToken !== null) {
              orderBtns.forEach((btn) => {
                btn.style.display = 'block';
              });
              EditBtns.forEach((Ebtn) => {
                Ebtn.style.display = 'block';
              });
              createPhone.forEach((Cbtn) => {
                Cbtn.style.display = 'block';
              });
              loginbtn.style.visibility = 'hidden';
              cartbt.style.visibility = 'visible';
              logoutbtn.style.display = 'block';
            }   
          });
          
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Invalid email or password`);
      });
  });

  // Register
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = registerForm.querySelector('.nameR').value;
    const email = registerForm.querySelector('.emailR').value;
    const password = registerForm.querySelector('.passwordR').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Register
        const user = userCredential.user;
        console.log('User register:', user);
        registerForm.reset();
          popup.style.display = "none";
          popup.classList.remove("popup-hide");
          body.classList.remove("popup-open"); 
          showMessage2("You have successfully registered please login.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error register: ${errorCode} - ${errorMessage}`);
      });
  });
  const logoutButtons = document.getElementById('logoutButton');
    
  logoutButtons.addEventListener('click', () => {
    const token = sessionStorage.getItem('userToken');

    if (token !== undefined) {
      sessionStorage.removeItem('userToken');
      showMessage2("You have successfully logged out.");
      const orderBtns = document.querySelectorAll('.buy-btn');
      orderBtns.forEach((btn) => {
        btn.style.display = 'none';
      });
      const EditBtns = document.querySelectorAll('.edit-button');
      EditBtns.forEach((Ebtn) => {
        Ebtn.style.display = 'none';
      });   
      const createPhone = document.querySelectorAll('.gone'); 
      createPhone.forEach((Cbtn) => {
        Cbtn.style.display = 'none';
      }); 
      const loginbtn = document.querySelector('.login');
      loginbtn.style.visibility = 'visible';

      const cartbt = document.getElementById('cart-btn');
      cartbt.style.visibility = 'hidden';

      const logoutbtn = document.getElementById('logoutButton');
      logoutbtn.style.display = 'none';
    }
  });
}

initFirebase22();


async function initFirebase33() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js");
  const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, limit } = await import("https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js");

  const firebaseConfig = {
    apiKey: "AIzaSyAHamF7O63FP3HuR1HlURKkjRvrdV1PnBU",
    authDomain: "sphones-5047f.firebaseapp.com",
    projectId: "sphones-5047f",
    storageBucket: "sphones-5047f.appspot.com",
    messagingSenderId: "505127648817",
    appId: "1:505127648817:web:edc729a5c16adda413df10"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const createPhoneBtn = document.getElementById("create-phone-btn");
  const phoneContainer = document.getElementById("phone-container");
  const phoneFormContainer = document.getElementById("phone-form-container");
  const phoneForm = document.getElementById("phone-form");
  const cancelPhoneBtn = document.getElementById("cancel-phone-btn");

  // Check if there are any saved phones in the database and display them
  const phoneCollectionRef = collection(db, "phones");
  const phonesQuery = query(phoneCollectionRef, orderBy("name", "asc"), limit(10));
  const phonesSnapshot = await getDocs(phonesQuery);
  phonesSnapshot.forEach((doc) => {
    const phone = doc.data();
    const phoneElem = createPhoneElement(phone.name, phone.size, phone.processor, phone.ram, phone.description, doc.id);
    phoneContainer.appendChild(phoneElem);
  });

  createPhoneBtn.addEventListener("click", () => {
    phoneFormContainer.style.display = "block";
  });

  phoneForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Phone form submitted");

    const phoneName = document.getElementById("phone-name").value;
    const phoneSize = document.getElementById("phone-size").value;
    const phoneProcessor = document.getElementById("phone-processor").value;
    const phoneRam = document.getElementById("phone-ram").value;
    const phoneDescription = document.getElementById("phone-description").value;

    const phoneData = {
      name: phoneName,
      size: phoneSize,
      processor: phoneProcessor,
      ram: phoneRam,
      description: phoneDescription
    };

    try {
      const docRef = await addDoc(collection(db, "phones"), phoneData);
      const phoneElem = createPhoneElement(phoneName, phoneSize, phoneProcessor, phoneRam, phoneDescription, docRef.id);
      phoneContainer.appendChild(phoneElem);
      phoneForm.reset();
      phoneFormContainer.style.display = "none";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  });

  cancelPhoneBtn.addEventListener("click", () => {
    phoneForm.reset();
    phoneFormContainer.style.display = "none";
  });

  function createPhoneElement(name, size, processor, ram, description, id) {
    const phone = document.createElement("div");
    phone.classList.add("phone");
    phone.innerHTML = `
      <img src="https://via.placeholder.com/150x150.png?text=${name}" alt="${name}">
      <div class="phone-details">
        <h2>${name}</h2>
        <p>Size: ${size} inches</p>
        <p>Processor: ${processor} GHz</p>
        <p>RAM: ${ram} ram</p>
        <p>Description: ${description}</p>
        <button class="delete-phone-btn" data-id="${id}">Delete</button>
      </div>`;

      const deletePhoneBtn = phone.querySelector(".delete-phone-btn");
      deletePhoneBtn.addEventListener("click", async () => {
        const phoneId = deletePhoneBtn.dataset.id;
        try {
          await deleteDoc(doc(db, "phones", phoneId));
          phone.remove();
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      });
      return phone;
    }
  }
  
  initFirebase33();

  const CreateSection = document.querySelector('#create');
  CreateSection.style.display = "none";

page("/support" , function() {
  render(supportTemplate, document.getElementById('appSupport'))
})
page("/loginRegister" , function() {
  render(loginRegisterTemplate, document.getElementById('appLoginRegister'))
})
page("/aboutUs" , function() {
  render(aboutUs, document.getElementById('home'))
  const productsSection = document.querySelector('#products');
  productsSection.style.display = "none";
  const CreateSection = document.querySelector('#create');
  CreateSection.style.display = "block";
})
page("/home" , function() {
  render(home, document.getElementById('home'))
  const productsSection = document.querySelector('#products');
  productsSection.style.display = "block";
  const CreateSection = document.querySelector('#create');
  CreateSection.style.display = "none";
})
render(home, document.getElementById('home'))
render(supportTemplate, document.getElementById('appSupport'))

page()

