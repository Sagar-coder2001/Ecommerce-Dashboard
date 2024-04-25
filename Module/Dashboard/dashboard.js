window.onload = function () {
    constructor();
    fetchMensData();
    fetchWomensData();
    fetchkidsData();
    fetchMensJoggerData();
    displayCart();
}
var showlogin = localStorage.getItem("showlogin");
var authFlag = '';
var loginpath = '../Login/login.html';
let toggle = document.getElementById("toggle");
let bar = document.getElementById("bar");
// let setuserName = document.getElementById("setuserName");
let setname = localStorage.getItem("setusername");
var cartquantity = document.getElementById("cartquantity");
let cartamount = 0;




function constructor() {
    var setlogin = localStorage.setItem("showlogin", "true");
    if (setlogin === "true") {
        document.getElementById("hidelogin").classList.add("show");
        document.getElementById("hidesignup").classList.add("show");
    }
    else if (showlogin === "false") {
        document.getElementById("hidelogin").classList.add("hide");
        document.getElementById("hidesignup").classList.add("hide");
        document.getElementById("showsearch").classList.add("show");
        document.getElementById("cart").classList.add("show");
        document.getElementById("setuserName").innerText = setname;
    }
}

function openSearchBar() {
    document.getElementById("search-container").classList.toggle("showsearch")
}

function tooglemoon() {
    document.getElementsByClassName("footer-containar")[0].classList.toggle("showmoon");
    document.querySelector("body").classList.toggle("showmoon");
    if (document.getElementById("moon").classList.contains("fa-moon")) {
        document.getElementById("moon").classList.add("fa-sun");
        document.getElementById("moon").classList.remove("fa-moon");
    } else {
        document.getElementById("moon").classList.add("fa-moon");
        document.getElementById("moon").classList.remove("fa-sun");
    }

}

bar.addEventListener("click", () => {
    toggle.classList.toggle("show");
    if (toggle.classList.contains("show")) {
        bar.classList.add("fa-angle-right");
        bar.classList.remove("fa-angle-left");
    }
    else {
        bar.classList.add("fa-angle-left");
        bar.classList.remove("fa-angle-right")
    }
})
function goToLogin(val) {
    authFlag = val;
    localStorage.setItem('authFlag', authFlag)
    changeLocation(loginpath);
}
function changeLocation(url) {
    window.location.href = url;
}

// Mens Product
let mensData = {};
let currentpage = 1;
let itemperpage = 8;

function fetchMensData() {
    fetch('../../Masters/mensproductmaster.json')
        .then(response => response.json())
        .then(data => {
            mensData = data;
            displayMensData(mensData, currentpage, itemperpage);
            setupPagination();
        })
}
function displayMensData(data, page, perpage) {
    let mensProduct = document.getElementById("mens-products");
    mensProduct.innerHTML = '';
    let startindex = (page - 1) * perpage;
    let endindex = (startindex + perpage);
    let currentData = data.slice(startindex, endindex);
    currentData.forEach(element => {
        let product = document.createElement("div");
        product.classList.add("product");
        let img = document.createElement("img");
        img.src = `${element.img}`;
        product.appendChild(img);
        let h4 = document.createElement("h4");
        h4.classList.add("mensname");
        h4.innerText = `${element.name}`
        product.appendChild(h4);
        let p = document.createElement("p")
        p.classList.add("mensprise");
        let orignalprise = document.createElement("span")
        orignalprise.innerText = `${element.prise}`;
        let latestprise = document.createElement("span")
        latestprise.innerText = `${element.orignalprise}`
        p.appendChild(orignalprise);
        p.appendChild(latestprise);
        product.appendChild(p);
        let cartbutton = document.createElement("button");
        cartbutton.classList.add('cartbtn');
        cartbutton.innerHTML = "Add Cart";
        cartbutton.addEventListener("click", () => {
            document.getElementById("cart-container").style.display = "block";
            cartquantity.innerText = ++cartamount;
            addToCart(element);

        })
        product.appendChild(cartbutton);
        mensProduct.appendChild(product);

        img.addEventListener("click", () => {
            displaySinglemensProduct(element);
        })
    });
}

// Add Pagination For Mens Product

function setupPagination() {
    const totalPages = Math.ceil(mensData.length / itemperpage);
    const paginationContainer = document.getElementById('pagination');

    // paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function () {
            currentpage = i;
            displayMensData(mensData, currentpage, itemperpage);
            highlightCurrentPage();
        });
        paginationContainer.appendChild(pageButton);
    }

    highlightCurrentPage();
}

function highlightCurrentPage() {
    const buttons = document.querySelectorAll('#pagination button');
    buttons.forEach(button => {
        if (parseInt(button.innerText) === currentpage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}
// Function ShowMens Product
function showMensProduct(val) {
    document.getElementsByClassName("collection-container")[0].style.display = "none";
    document.getElementById("loader").classList.add("show");
    if (val == 'mens') {
        setTimeout(function () {
            document.getElementById("loader").classList.remove("show");
            document.getElementsByClassName("mens-container")[0].style.display = "block"
            document.getElementById("pagination").style.display = "block";
        }, 2000)
    }
}
// Show Mens Single Product
let singleMensProduct = document.getElementById("singleMensProduct");
let othersinglemenimage = document.getElementById("othersinglemenimage"); ``
function displaySinglemensProduct(element) {
    let singlemenproduct = document.createElement("div");
    singlemenproduct.classList.add("singlemen")
    let singleimg = document.createElement("img")
    singleimg.src = `${element.img}`;
    singlemenproduct.appendChild(singleimg);
    let singlemenstext = document.createElement("div");
    singlemenstext.classList.add("singlemenstext");
    let singlemenname = document.createElement("h2");
    singlemenname.innerText = `${element.name}`
    singlemenstext.appendChild(singlemenname);
    let singleprise = document.createElement("p")
    singleprise.classList.add("singlemenprise")
    let orignalprise = document.createElement("span")
    orignalprise.innerText = `${element.prise}`;
    let latestprise = document.createElement("span")
    latestprise.innerText = `${element.orignalprise}`
    singleprise.appendChild(orignalprise);
    singleprise.appendChild(latestprise)
    singlemenstext.appendChild(singleprise);

    let sizesContainer = document.createElement("div");
    sizesContainer.classList.add("sizes-container");

    // Create size buttons dynamically
    ["S", "M", "L", "XL", "XXL"].forEach(size => {
        let sizeButton = document.createElement("button");
        sizeButton.innerText = size;
        sizeButton.addEventListener("click", () => {
        });
        sizesContainer.appendChild(sizeButton);
    });
    singlemenstext.appendChild(sizesContainer);
    let singlemensbutton = document.createElement("div")
    singlemensbutton.classList.add("singlemenbtn");
    let singlemenbuybtn = document.createElement("button");
    singlemenbuybtn.innerText = "Buy";
    singlemensbutton.appendChild(singlemenbuybtn);
    let singlemencartbtn = document.createElement("button");
    singlemencartbtn.innerText = "Add Cart";
    singlemensbutton.appendChild(singlemencartbtn);
    singlemenstext.appendChild(singlemensbutton);


    singleMensProduct.appendChild(singlemenstext);
    singleMensProduct.appendChild(singlemenproduct);

    element.otherimages.forEach((image) => {
        let othermenimage = document.createElement("img");
        othermenimage.classList.add("othermensinleimage");
        othermenimage.src = image;
        othermenimage.addEventListener("click", () => {
            singleimg.src = image;
        });
        othersinglemenimage.appendChild(othermenimage);

    })

    singlemencartbtn.addEventListener("click", () => {
        document.getElementById("cart-container").style.display = "block";
        cartquantity.innerText = ++cartamount;
        addToCart(element);
    })

    singlemenbuybtn.addEventListener("click", () => {
        buyproduct();
    })

    document.getElementsByClassName("mens-container")[0].style.display = "none";
    document.getElementById("pagination").style.display = "none"
    document.getElementById("singleMensProductcontainer").style.display = "block";
}

// Womens Product
let womensData = {};
function fetchWomensData() {
    fetch('../../Masters/Womensproductmaster.json')
        .then(response => response.json())
        .then(data => {
            womensData = data;
            displayWomensData(womensData, currentpage, itemperpage);
            setupWomensPagination();
        })
}

function displayWomensData(data, womwnpage, womenperpage) {
    let womensProduct = document.getElementById("womens-products");
    womensProduct.innerHTML = '';
    let startindex = (womwnpage - 1) * womenperpage;
    let endindex = (startindex + womenperpage);
    let currentData = data.slice(startindex, endindex);

    currentData.forEach(element => {
        let product = document.createElement("div");
        product.classList.add("product");
        let productimg = document.createElement("div")
        productimg.classList.add("womensproductimg")
        let img = document.createElement("img");
        img.src = `${element.img}`;
        productimg.appendChild(img);
        product.appendChild(productimg);
        let h4 = document.createElement("h4");
        h4.classList.add("womensname");
        h4.innerText = `${element.name}`
        product.appendChild(h4);
        let p = document.createElement("p")
        p.classList.add("womensprise");
        let orignalprise = document.createElement("span")
        orignalprise.innerText = `${element.prise}`;
        let latestprise = document.createElement("span")
        latestprise.innerText = `${element.orignalprise}`
        p.appendChild(orignalprise);
        p.appendChild(latestprise);
        product.appendChild(p);
        let cartbutton = document.createElement("button");
        cartbutton.classList.add('cartbtn');
        cartbutton.innerHTML = "Add Cart"
        product.appendChild(cartbutton);
        womensProduct.appendChild(product);
        img.addEventListener("click", () => {
            displayWomensSingleProduct(element);
        });
        cartbutton.addEventListener("click", () => {
            document.getElementById("cart-container").style.display = "block"
            cartquantity.innerText = ++cartamount;
            addToCart(element);
        })
    });
}
// Add Pagination For Womens Product

function setupWomensPagination() {
    const totalPages = Math.ceil(womensData.length / itemperpage);
    const paginationContainer = document.getElementById('womenpagination');
    // paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function () {
            currentpage = i;
            displayWomensData(womensData, currentpage, itemperpage);
            highlightCurrentPage();
        });
        paginationContainer.appendChild(pageButton);
    }

    highlightCurrentPage();
}

function highlightCurrentPage() {
    const buttons = document.querySelectorAll('#womenpagination button');
    buttons.forEach(button => {
        if (parseInt(button.innerText) === currentpage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Show Womens Products
function showWomensProduct(val) {
    document.getElementsByClassName("collection-container")[0].style.display = "none";
    document.getElementById("loader").classList.add("show");

    if (val == 'womens') {
        setTimeout(function () {
            document.getElementById("loader").classList.remove("show");
            document.getElementsByClassName("womens-container")[0].style.display = "block";
            document.getElementById("womenpagination").style.display = "block";
        }, 2000)
    }
}

// show Womens Single Product

let singleWomensProduct = document.getElementById("singleWomensProduct");
let othersinglewomenimage = document.getElementById("othersinglewomenimage");
function displayWomensSingleProduct(element) {
    let singlewomenproduct = document.createElement("div");
    singlewomenproduct.classList.add("singlewomen")
    let singlewomenimg = document.createElement("img")
    singlewomenimg.src = `${element.img}`;
    singlewomenproduct.appendChild(singlewomenimg);
    let singlewomentext = document.createElement("div");
    singlewomentext.classList.add("singlewomentext");
    let singlewomenname = document.createElement("h2");
    singlewomenname.innerText = `${element.name}`
    singlewomentext.appendChild(singlewomenname);
    let singleprise = document.createElement("p");
    singleprise.classList.add("singlewomenprise");

    let orignalprise = document.createElement("span")
    orignalprise.innerText = `${element.prise}`;
    let latestprise = document.createElement("span")
    latestprise.innerText = `${element.orignalprise}`
    singleprise.appendChild(orignalprise);
    singleprise.appendChild(latestprise);

    singlewomentext.appendChild(singleprise);


    let sizesContainer = document.createElement("div");
    sizesContainer.classList.add("womensizes-container");
    let selectedsize = null;

    // Create size buttons dynamically
    ["S", "M", "L", "XL", "XXL"].forEach(size => {
        let sizeButton = document.createElement("button");
        sizeButton.innerText = size;
        sizeButton.addEventListener("click", () => {
            if (size === selectedsize) {
                return;
            }
            if (selectedsize) {
                let prevSelectedButton = sizesContainer.querySelector(`button[data-size="${selectedsize}"]`);
                prevSelectedButton.classList.remove("womenselected");
            }
            selectedsize = size;
            sizeButton.classList.add("womenselected");
            console.log(`Selected size: ${size}`);
        });
        sizeButton.setAttribute("data-size", size);
        sizesContainer.appendChild(sizeButton);
    });
    singlewomentext.appendChild(sizesContainer);
    let singlewomenbutton = document.createElement("div")
    singlewomenbutton.classList.add("singlewomenbtn");
    let singlewomenbuybtn = document.createElement("button");
    singlewomenbuybtn.innerText = "Buy";
    singlewomenbutton.appendChild(singlewomenbuybtn)
    let singlewomenscartbtn = document.createElement("button");
    singlewomenscartbtn.innerText = "Add Cart";
    singlewomenbutton.appendChild(singlewomenscartbtn);
    singlewomentext.appendChild(singlewomenbutton);
    singleWomensProduct.appendChild(singlewomentext);
    singleWomensProduct.appendChild(singlewomenproduct);

    element.otherimages.forEach((image) => {
        let otherwomenimage = document.createElement("img");
        otherwomenimage.classList.add("otherwomenimage");
        otherwomenimage.src = image;
        otherwomenimage.addEventListener("click", () => {
            singlewomenimg.src = image;
        });
        othersinglewomenimage.appendChild(otherwomenimage);

    })
    singlewomenscartbtn.addEventListener("click", () => {
        document.getElementById("cart-container").style.display = "block"
        cartquantity.innerText = ++cartamount;
        addToCart(element);
    })

    singlewomenbuybtn.addEventListener("click", () => {
        buyproduct();
    })

    document.getElementsByClassName("womens-container")[0].style.display = "none";
    document.getElementById("womenpagination").style.display = "none"
    document.getElementById("singleWomensProductcontainer").style.display = "block";
}


// Kids Product Start Here
let kidsData = {};
function fetchkidsData() {
    fetch('../../Masters/kidsproductmaster.json')
        .then(response => response.json())
        .then(data => {
            kidsData = data;
            displayKidsData(kidsData, currentpage, itemperpage);
            setupKidsPagination();
        })
}

function displayKidsData(data, kidpage, kidperpage) {
    let kidsProduct = document.getElementById("kids-products");
    kidsProduct.innerHTML = '';
    let startindex = (kidpage - 1) * kidperpage;
    let endindex = (startindex + kidperpage);
    let currentData = data.slice(startindex, endindex);

    currentData.forEach(element => {
        let product = document.createElement("div");
        product.classList.add("product");
        let productimg = document.createElement("div")
        productimg.classList.add("kidsproductimg")
        let img = document.createElement("img");
        img.src = `${element.img}`;
        productimg.appendChild(img);
        product.appendChild(productimg);
        let h4 = document.createElement("h4");
        h4.classList.add("womensname");
        h4.innerText = `${element.name}`
        product.appendChild(h4);
        let p = document.createElement("p")
        p.classList.add("kidsprise");
        let orignalprise = document.createElement("span")
        orignalprise.innerText = `${element.prise}`;
        let latestprise = document.createElement("span")
        latestprise.innerText = `${element.orignalprise}`
        p.appendChild(orignalprise);
        p.appendChild(latestprise);
        product.appendChild(p);
        let cartbutton = document.createElement("button");
        cartbutton.classList.add('cartbtn');
        cartbutton.innerHTML = "Add Cart"
        product.appendChild(cartbutton);
        kidsProduct.appendChild(product);
        img.addEventListener("click", () => {
            displayKidsSingleProduct(element);
        });
        cartbutton.addEventListener("click", () => {
            document.getElementById("cart-container").style.display = "block";
            // showCart(element.img, element.name, element.prise);
            cartquantity.innerText = ++cartamount;
            addToCart(element);
        })

    });
}
// Add Pagination For Kids Product

function setupKidsPagination() {
    const totalPages = Math.ceil(kidsData.length / itemperpage);
    const paginationContainer = document.getElementById('kidspagination');
    // paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function () {
            currentpage = i;
            displayKidsData(kidsData, currentpage, itemperpage);
            highlightCurrentPage();
        });
        paginationContainer.appendChild(pageButton);
    }

    highlightCurrentPage();
}

function highlightCurrentPage() {
    const buttons = document.querySelectorAll('#womenpagination button');
    buttons.forEach(button => {
        if (parseInt(button.innerText) === currentpage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// show kids product 
function showKidsProduct(val) {
    document.getElementsByClassName("collection-container")[0].style.display = "none";
    document.getElementById("loader").classList.add("show");

    if (val == 'kids') {
        setTimeout(function () {
            document.getElementById("loader").classList.remove("show");
            document.getElementsByClassName("kids-container")[0].style.display = "block";
            document.getElementById("kidspagination").style.display = "block";
        }, 2000)
    }
}




// show Kids Single Product

let singleKidsProductcontainer = document.getElementById("singleKidsProduct");
let othersinglekidimage = document.getElementById("othersinglekidimage");
function displayKidsSingleProduct(element) {
    let singlekidsproduct = document.createElement("div");
    singlekidsproduct.classList.add("singlekid")
    let singlekidimg = document.createElement("img")
    singlekidimg.src = `${element.img}`;
    singlekidsproduct.appendChild(singlekidimg);
    let singlekidtext = document.createElement("div");
    singlekidtext.classList.add("singlekidtext");
    let singlekidname = document.createElement("h2");
    singlekidname.innerText = `${element.name}`
    singlekidtext.appendChild(singlekidname);
    let singleprise = document.createElement("p");
    singleprise.classList.add("singlekidprise");

    let orignalprise = document.createElement("span")
    orignalprise.innerText = `${element.prise}`;
    let latestprise = document.createElement("span")
    latestprise.innerText = `${element.orignalprise}`
    singleprise.appendChild(orignalprise);
    singleprise.appendChild(latestprise);

    singlekidtext.appendChild(singleprise);


    let sizesContainer = document.createElement("div");
    sizesContainer.classList.add("kidsizes-container");
    let selectedsize = null;

    // Create size buttons dynamically
    ["S", "M", "L", "XL", "XXL"].forEach(size => {
        let sizeButton = document.createElement("button");
        sizeButton.innerText = size;
        sizeButton.addEventListener("click", () => {
            if (size === selectedsize) {
                return;
            }
            if (selectedsize) {
                let prevSelectedButton = sizesContainer.querySelector(`button[data-size="${selectedsize}"]`);
                prevSelectedButton.classList.remove("kidselected");
            }
            selectedsize = size;
            sizeButton.classList.add("kidselected");
            console.log(`Selected size: ${size}`);
        });
        sizeButton.setAttribute("data-size", size);
        sizesContainer.appendChild(sizeButton);
    });
    singlekidtext.appendChild(sizesContainer);
    let singlekidbutton = document.createElement("div")
    singlekidbutton.classList.add("singlekidbtn");
    let singlekidbuybtn = document.createElement("button");
    singlekidbuybtn.innerText = "Buy";
    singlekidbutton.appendChild(singlekidbuybtn)
    let singlekidcartbtn = document.createElement("button");
    singlekidcartbtn.innerText = "Add Cart";
    singlekidbutton.appendChild(singlekidcartbtn);
    singlekidtext.appendChild(singlekidbutton);
    singleKidsProductcontainer.appendChild(singlekidtext);
    singleKidsProductcontainer.appendChild(singlekidsproduct);

    element.otherimages.forEach((image) => {
        let otherkidimage = document.createElement("img");
        otherkidimage.classList.add("otherkidimage");
        otherkidimage.src = image;
        otherkidimage.addEventListener("click", () => {
            singlekidimg.src = image;
        });
        othersinglekidimage.appendChild(otherkidimage);
    })
    singlekidcartbtn.addEventListener("click", () => {
        document.getElementById("cart-container").style.display = "block"
        cartquantity.innerText = ++cartamount;
        addToCart(element);
    })

    singlekidbuybtn.addEventListener("click", () => {
        buyproduct();
    })

    document.getElementsByClassName("kids-container")[0].style.display = "none";
    document.getElementById("kidspagination").style.display = "none"
    document.getElementById("singleKidsProductcontainer").style.display = "block";
}



// Mens Jogger Product
let mensjoggerData = {};
function fetchMensJoggerData() {
    fetch('../../Masters/mensjoggerproductmaster.json')
        .then(response => response.json())
        .then(data => {
            mensjoggerData = data;
            console.log(mensjoggerData);
            displayMensJoggerData(mensjoggerData, currentpage, itemperpage);
            setupMensjoggerPagination();
        })
}

function displayMensJoggerData(data, joggerpage, joggerperpage) {
    let Mensjoggerproducts = document.getElementById("Mensjogger-products");
    Mensjoggerproducts.innerHTML = '';
    let startindex = (joggerpage - 1) * joggerperpage;
    let endindex = (startindex + joggerperpage);
    let currentData = data.slice(startindex, endindex);

    currentData.forEach(element => {
        let product = document.createElement("div");
        product.classList.add("product");
        let productimg = document.createElement("div")
        productimg.classList.add("joggerproductimg")
        let img = document.createElement("img");
        img.src = `${element.img}`;
        productimg.appendChild(img);
        product.appendChild(productimg);
        let h4 = document.createElement("h4");
        h4.classList.add("joggername");
        h4.innerText = `${element.name}`
        product.appendChild(h4);
        let p = document.createElement("p")
        p.classList.add("joggerprise");
        let orignalprise = document.createElement("span")
        orignalprise.innerText = `${element.prise}`;
        let latestprise = document.createElement("span")
        latestprise.innerText = `${element.orignalprise}`
        p.appendChild(orignalprise);
        p.appendChild(latestprise);
        product.appendChild(p);
        let cartbutton = document.createElement("button");
        cartbutton.classList.add('cartbtn');
        cartbutton.innerHTML = "Add Cart"
        product.appendChild(cartbutton);
        Mensjoggerproducts.appendChild(product);
        img.addEventListener("click", () => {
            displayMensJoggerSingleProduct(element);
        });
        cartbutton.addEventListener("click", () => {
            document.getElementById("cart-container").style.display = "block"
            cartquantity.innerText = ++cartamount;
            addToCart(element);
        })
    });
}
// Add Pagination For Womens Product

function setupMensjoggerPagination() {
    const totalPages = Math.ceil(mensjoggerData.length / itemperpage);
    const paginationContainer = document.getElementById('Mensjoggerpagination');
    // paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function () {
            currentpage = i;
            displayMensJoggerData(mensjoggerData, currentpage, itemperpage);
            highlightCurrentPage();
        });
        paginationContainer.appendChild(pageButton);
    }

    highlightCurrentPage();
}

function highlightCurrentPage() {
    const buttons = document.querySelectorAll('#Mensjoggerpagination button');
    buttons.forEach(button => {
        if (parseInt(button.innerText) === currentpage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Show Mens Jogger Products
function showMenJoggersProduct(val) {
    document.getElementsByClassName("collection-container")[0].style.display = "none";
    document.getElementById("loader").classList.add("show");

    if (val == 'joogers') {
        setTimeout(function () {
            document.getElementById("loader").classList.remove("show");
            document.getElementsByClassName("Mensjogger-container")[0].style.display = "block";
            document.getElementById("Mensjoggerpagination").style.display = "block";
        }, 2000)
    }
}

// show Mens Jooger Single Product

let singleJoggerProduct = document.getElementById("singleJoggerProduct");
let othersinglejoggerimage = document.getElementById("othersinglejoggerimage");
function displayMensJoggerSingleProduct(element) {
    let singlemensjoogerproduct = document.createElement("div");
    singlemensjoogerproduct.classList.add("singlemensjogger")
    let singlewomenimg = document.createElement("img")
    singlewomenimg.src = `${element.img}`;
    singlemensjoogerproduct.appendChild(singlewomenimg);
    let singlejoggertext = document.createElement("div");
    singlejoggertext.classList.add("singlejoggertext");
    let singlewomenname = document.createElement("h2");
    singlewomenname.innerText = `${element.name}`
    singlejoggertext.appendChild(singlewomenname);
    let singleprise = document.createElement("p");
    singleprise.classList.add("singlejoggerprise");

    let orignalprise = document.createElement("span")
    orignalprise.innerText = `${element.prise}`;
    let latestprise = document.createElement("span")
    latestprise.innerText = `${element.orignalprise}`
    singleprise.appendChild(orignalprise);
    singleprise.appendChild(latestprise);

    singlejoggertext.appendChild(singleprise);


    let sizesContainer = document.createElement("div");
    sizesContainer.classList.add("MensJogger-container");
    let selectedsize = null;

    // Create size buttons dynamically
    ["S", "M", "L", "XL", "XXL"].forEach(size => {
        let sizeButton = document.createElement("button");
        sizeButton.innerText = size;
        sizeButton.addEventListener("click", () => {
            if (size === selectedsize) {
                return;
            }
            if (selectedsize) {
                let prevSelectedButton = sizesContainer.querySelector(`button[data-size="${selectedsize}"]`);
                prevSelectedButton.classList.remove("joggerelected");
            }
            selectedsize = size;
            sizeButton.classList.add("womenselected");
            console.log(`Selected size: ${size}`);
        });
        sizeButton.setAttribute("data-size", size);
        sizesContainer.appendChild(sizeButton);
    });
    singlejoggertext.appendChild(sizesContainer);
    let singleMensJoggerbutton = document.createElement("div")
    singleMensJoggerbutton.classList.add("singleMensJoggerbutton");
    let singlejoggerbuybtn = document.createElement("button");
    singlejoggerbuybtn.innerText = "Buy";
    singleMensJoggerbutton.appendChild(singlejoggerbuybtn)
    let singlejoggercartbtn = document.createElement("button");
    singlejoggercartbtn.innerText = "Add Cart";
    singleMensJoggerbutton.appendChild(singlejoggercartbtn);
    singlejoggertext.appendChild(singleMensJoggerbutton);
    singleJoggerProduct.appendChild(singlejoggertext);
    singleJoggerProduct.appendChild(singlemensjoogerproduct);

    element.otherimages.forEach((image) => {
        let otherJoggerimage = document.createElement("img");
        otherJoggerimage.classList.add("otherJoggerimage");
        otherJoggerimage.src = image;
        otherJoggerimage.addEventListener("click", () => {
            otherJoggerimage.src = image;
        });
        othersinglejoggerimage.appendChild(otherJoggerimage);

    })


    singlejoggercartbtn.addEventListener("click", () => {
        document.getElementById("cart-container").style.display = "block"
        cartquantity.innerText = ++cartamount;
        addToCart(element);
    })

    singlejoggerbuybtn.addEventListener("click", () => {
        buyproduct();
    })

    document.getElementsByClassName("Mensjogger-container")[0].style.display = "none";
    document.getElementById("Mensjoggerpagination").style.display = "none"
    document.getElementById("singleMensjoggerProductcontainer").style.display = "block";
}

// function add to cart

function addToCart(ele) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.push(ele);

    localStorage.setItem('cart', JSON.stringify(cartItems));

    displayCart();
}


function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (!Array.isArray(cartItems)) {
        console.error('Error: Cart items is not an array');
        return;
    }
    cartdetailsContainer.innerHTML = "";
    cartItems.forEach((item, index) => {
        showCart(item, index, cartItems);
    });
}

// cart Container
let cartdetailsContainer = document.getElementsByClassName("cart-detailsContainer")[0];
function showCart(item, index, cartItems) {
    let cartDetails = document.createElement("div");
    cartDetails.classList.add("cart-Details");
    let cartmensimg = document.createElement("div");
    let img = document.createElement("img")
    img.src = `${item.img}`;
    cartmensimg.appendChild(img);
    let cartquantity = document.createElement("div");
    cartquantity.classList.add("cartdetailmiddle");
    let cartmensprise = document.createElement("p");
    let cartmensname = document.createElement("h3");
    cartmensname.innerText = `${item.name}`;
    cartmensprise.innerText = `${item.prise}`;
    cartquantity.appendChild(cartmensname);
    cartquantity.appendChild(cartmensprise);
    let cartcount = document.createElement("input");
    cartcount.type = 'Number';
    cartquantity.appendChild(cartcount);
    let carticon = document.createElement("div")
    let deleteIcon = document.createElement("i")
    deleteIcon.className = "fa-solid fa-trash";
    carticon.appendChild(deleteIcon);
    cartDetails.appendChild(cartmensimg);
    cartDetails.appendChild(cartquantity);
    cartDetails.appendChild(carticon);
    cartdetailsContainer.appendChild(cartDetails);

    deleteIcon.addEventListener("click", () => {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCart();
        cartquantity.innerText = --cartamount;
    });
}


// buyproduct function 
function buyproduct() {
    if (showlogin === "false") {
        console.log("user login")
    }
    else {
        goToLogin('login');
    }
}
