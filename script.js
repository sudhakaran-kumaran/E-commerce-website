let initialProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
];

let users1 = [
  {
    id: 1,
    email: "abc@user1.com",
    password: "abc",
  },
  {
    id: 2,
    email: "abc@user2.com",
    password: "abcd",
  },
  {
    id: 3,
    email: "abc@user3.com",
    password: "abcde",
  },
  {
    id: 4,
    email: "abc@admin.com",
    password: "abcdef",
  },
];

window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users1));
  }
  if (location.pathname === "/E-commerce-website/home.html") {
    loadCustomerProducts();
  }
  if (location.pathname === "/E-commerce-website/adminhomepage.html") {
    loadAdminHomePage();
  }
  if (location.pathname === "/E-commerce-website/cart.html") {
    loadCartPage();
  }
  if (location.pathname === "/E-commerce-website/orders.html") {
    loadOrderPage();
  }
});

const loginhandler = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("error");
  if (emailRef.value.length === 0) {
    errorRef.innerText = "Email Field cannot be empty";
    return;
  }
  if (passwordRef.value.length === 0) {
    errorRef.innerText = "Password Field cannnot be empty";
    return;
  }

  const user = JSON.parse(localStorage.getItem("users"));

  const loggedinuser = user.find(
    (user) =>
      user.email === emailRef.value && user.password === passwordRef.value
  );
  if (!loggedinuser) {
    errorRef.innerText = "Invalid Credentials";
  } else if (loggedinuser) {
    sessionStorage.setItem("id", loggedinuser.id);
    location.replace("home.html");
  }
};

const RegisterHandler = () => {
  const nameRef = document.getElementById("username");
  const EmailRef = document.getElementById("useremail");
  const PasswrdRef = document.getElementById("userpassword");
  const CnfrmRef = document.getElementById("confirmpassword");
  const ErrorRef = document.getElementById("Error");
  if (nameRef.value.length === 0) {
    ErrorRef.innerText = "Name should not be empty";
    return;
  }

  if (EmailRef.value.length === 0) {
    ErrorRef.innerText = "Email Address Should not be empty";
    return;
  }
  if (PasswrdRef.value.length === 0) {
    ErrorRef.innerText = "Password Should not be empty";
    return;
  }
  if (PasswrdRef.value.length < 3) {
    ErrorRef.innerText = "Invalid Password";
  }

  let user1 = JSON.parse(localStorage.getItem("users"));
  user1.push({
    id: getRandomId(),
    email: EmailRef.value,
    password: PasswrdRef.value,
  });
  localStorage.setItem("users", JSON.stringify(user1));

  sessionStorage.setItem("id", user1.id);
  location.replace("login.html");
};
const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

// creating user id
const getRandomId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = getRandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

const adminlogin = () => {
  const adminmail = document.getElementById("typeEmailX");
  const adminpasswrd = document.getElementById("typePasswordX");
  const erroradmin = document.getElementById("ErrorAdmin");
  if (adminmail.value.length === 0) {
    erroradmin.innerText = "admin mail should not be empty";
  }
  if (adminpasswrd.value.length === 0) {
    erroradmin.innerText = "admin password should not be empty";
  }

  const admin = JSON.parse(localStorage.getItem("users"));
  const loggedinadmin = admin.find(
    (admin) =>
      admin.email === adminmail.value && admin.password === adminpasswrd.value
  );
  if (!loggedinadmin) {
    erroradmin.innerText = "Invalid Crediantials";
  } else if (loggedinadmin) {
    sessionStorage.setItem("id", adminlogin.id);
    location.replace("adminhomepage.html");
  }
};

const loadCustomerProducts = () => {
  const ProductRef = document.getElementById("userproducts");
  const products = JSON.parse(localStorage.getItem("products"));
  let body = "";

  for (let product of products) {
    body += `<div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 h-100 d-flex flex-column justify-content-end"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-success" onClick="addToCartHandler(${product.id})">Add to Cart</button>
    </div>
  </div>`;
  }
  ProductRef.innerHTML = body;
};

loadCustomerProducts();

const addToCartHandler = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("id")) {
    location.href = "";
  } else {
    let userId = parseInt(sessionStorage.getItem("id"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cart.find(
      (c) => c.userId === userId && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.userId === userId && c.id === parseInt(id)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const loadAdminHomePage = () => {
  const productsRef = document.getElementById("productsTableBody");
  const products = JSON.parse(localStorage.getItem("products"));
  let body = "";

  for (let product of products) {
    body += `<tr>
    <td><img src="${
      product.thumbnail
    }" alt="image" style="min-width:100px;height:50px" /></td>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 50)}...</td>
    <td> ₹ ${product.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onClick="editProductHandler(${
        product.id
      })">Edit</button>
      <button class="btn btn-danger" onClick="deleteProductHandler(${
        product.id
      })">Delete</button>
    </td>
  </tr>`;
  }
  productsRef.innerHTML = body;
};
// if(location.pathname === '\adminhomepage.html')
loadAdminHomePage();


const deleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const filterproductsRef = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filterproductsRef));
  loadAdminHomePage();
};

const addproducthandler = (id) => {
  const nameRef = document.getElementById("name");
  const IdRef = document.getElementById("id");
  const priceRef = document.getElementById("price");
  const descRef = document.getElementById("desc");
  const imageRef = document.getElementById("image");

  let products = JSON.parse(localStorage.getItem("products"));

  products.push({
    id: getRandomId(),
    title: nameRef.value,
    description: descRef.value,
    price: priceRef.value,
    thumbnail: imageRef.value,
  });
  localStorage.setItem("products", JSON.stringify(products));
  location.href = "/E-commerce-website/adminhomepage.html";
};
const loadCartPage = () => {
  const cartTableRef = document.getElementById("cartTableBody");
  const totalRef = document.getElementById("total");
  const emptyCartRef = document.getElementById("emptyCart");
  const tableRef = document.getElementById("table");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        tableRef.classList.remove("visually-hidden");
        emptyCartRef.classList.add("visually-hidden");
      } else {
        emptyCartRef.classList.remove("visually-hidden");
        tableRef.classList.add("visually-hidden");
      }

      let body = "";
      let total = 0;
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
                  <td>${cartItem.id}</td>
                  <td>${cartItem.product}</td>
                  <td>₹ ${count}</td>
                  <td>${cartItem.price}</td>
                  
                </tr>`;
      }
      cartTableRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "cart.html";
    }
  }
};

const checkOutHandler = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      updateCartCount();
      location.href = "home.html";
    } else {
      location.href = "home.html";
    }
  } else {
    location.href = "login.html";
  }
};
const loadOrderPage = () => {
  const tableRef = document.getElementById("table");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let body = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      tableRef.innerHTML = body;
    } else {
      location.href = "home.html";
    }
  } else {
    location.href = "login.html";
  }
};
const updateCartCount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "login.html";
};
