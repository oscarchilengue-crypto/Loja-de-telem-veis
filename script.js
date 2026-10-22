const products=[
{id:1,name:"iPhone 15 Rosa",desc:"128GB • Câmara dupla • Rosa",price:65000,icon:"iphone",cat:"iphone",image:"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",colorClass:"pink"},
{id:2,name:"Samsung Galaxy A55",desc:"256GB • 8GB RAM",price:38000,icon:"samsung",cat:"samsung",image:"https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg"},
{id:3,name:"Redmi Note 13",desc:"256GB • 8GB RAM",price:22000,icon:"redmi",cat:"android",image:"https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-4g.jpg"},
{id:4,name:"Tecno Camon 30",desc:"256GB • Câmara 50MP",price:19500,icon:"tecno",cat:"android",image:"https://fdn2.gsmarena.com/vv/bigpic/tecno-camon-30.jpg"},
{id:5,name:"iPhone 12 Azul",desc:"128GB • Cor azul",price:23000,icon:"iphone",cat:"iphone",image:"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",colorClass:"blue"},
{id:6,name:"iPhone 11 Branco",desc:"128GB • Cor branca",price:19500,icon:"iphone",cat:"iphone",image:"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",colorClass:"white"},
{id:7,name:"iPhone 17 Pro Max Laranja",desc:"Modelo Pro Max • Cor laranja",price:123000,icon:"iphone",cat:"iphone",image:"https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro-max.jpg",colorClass:"orange"},
{id:8,name:"Samsung Galaxy A05s Violeta",desc:"64GB • Cor violeta",price:9800,icon:"samsung",cat:"samsung",image:"https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a05s.jpg",colorClass:"violet"},
{id:9,name:"Samsung Galaxy S23",desc:"128GB • 5G",price:32000,icon:"samsung",cat:"samsung",image:"https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-5g.jpg"},
{id:10,name:"Samsung Galaxy A25",desc:"128GB • 5G",price:11500,icon:"samsung",cat:"samsung",image:"https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a25-5g.jpg"}
];
const accessories=[
{id:101,name:"Fones Bluetooth",desc:"Som sem fios",price:1800,icon:"🎧"},
{id:102,name:"Carregador rápido",desc:"25W • USB-C",price:1200,icon:"🔌"},
{id:103,name:"Capa premium",desc:"Proteção para smartphone",price:700,icon:"📱"},
{id:104,name:"Power Bank",desc:"10.000 mAh",price:2500,icon:"🔋"}
];
let cart=JSON.parse(localStorage.getItem("cart")||"[]");
function money(v){return v.toLocaleString("pt-MZ")+" MT"}
function visual(p){if(p.cat){const fallback=`<div class="phone ${p.icon} phone-fallback ${p.colorClass||""}"></div>`;return `${p.image?`<img class="product-photo ${p.colorClass||""}" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">`:""}${fallback}`}return `<div class="accessory-icon">${p.icon}</div>`}
function render(list,target){document.getElementById(target).innerHTML=list.map(p=>`<article class="product"><div class="product-img">${visual(p)}</div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="primary-btn" onclick="addToCart(${p.id})">Adicionar ao carrinho</button></div></article>`).join("")||`<div class="empty">Nenhum produto encontrado.</div>`}
function allProducts(){return [...products,...accessories]}
function addToCart(id){const p=allProducts().find(x=>x.id===id);cart.push(p);saveCart();alert(p.name+" foi adicionado ao carrinho.")}
function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));updateCount();renderCart()}
function updateCount(){document.getElementById("cartCount").textContent=cart.length}
function abrirCarrinho(){renderCart();document.getElementById("cartModal").classList.add("show")}
function fecharCarrinho(){document.getElementById("cartModal").classList.remove("show")}
function removeCart(index){cart.splice(index,1);saveCart()}
function renderCart(){const box=document.getElementById("cartItems");if(!cart.length){box.innerHTML="<p>O seu carrinho está vazio.</p>";document.getElementById("cartTotal").textContent="0 MT";return}box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}<br><small>${money(p.price)}</small></span><button onclick="removeCart(${i})">Remover</button></div>`).join("");document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0))}
function finalizarCompra(){if(!cart.length){alert("O carrinho está vazio.");return}const items=cart.map(p=>`- ${p.name}: ${money(p.price)}`).join("\n");const total=money(cart.reduce((s,p)=>s+p.price,0));const msg=`Olá CHILENGUE MOBILE! Gostaria de fazer uma encomenda:\n${items}\nTotal: ${total}`;window.open("https://wa.me/258875013933?text="+encodeURIComponent(msg),"_blank")}
let activeFilter="all";
function applyFilters(){const q=document.getElementById("search").value.toLowerCase();let list=products.filter(p=>(activeFilter==="all"||p.cat===activeFilter)&&(p.name+" "+p.desc).toLowerCase().includes(q));render(list,"products")}
document.getElementById("search").addEventListener("input",applyFilters);
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;applyFilters()}));
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();const name=e.target.querySelector('input[type="text"]').value.trim();const msg=document.getElementById("messageText").value.trim();window.open("https://wa.me/258875013933?text="+encodeURIComponent(`Olá CHILENGUE MOBILE! Sou ${name}. ${msg}`),"_blank");e.target.reset()});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("open")));
render(products,"products");render(accessories,"accessories");updateCount();
let currentUser=JSON.parse(localStorage.getItem("currentUser")||"null");let users=JSON.parse(localStorage.getItem("users")||"[]");
function abrirConta(){if(currentUser){if(confirm("Deseja terminar a sessão?")){currentUser=null;localStorage.removeItem("currentUser");updateAccountButton();alert("Sessão terminada.")}return}document.getElementById("accountMenu").classList.toggle("show")}
function abrirLogin(){document.getElementById("accountMenu").classList.remove("show");mostrarLogin();document.getElementById("authModal").classList.add("show")}
function abrirCadastro(){document.getElementById("accountMenu").classList.remove("show");mostrarCadastro();document.getElementById("authModal").classList.add("show")}
function fecharAuth(){document.getElementById("authModal").classList.remove("show")}
function mostrarLogin(){document.getElementById("loginPanel").style.display="block";document.getElementById("registerPanel").style.display="none"}
function mostrarCadastro(){document.getElementById("loginPanel").style.display="none";document.getElementById("registerPanel").style.display="block"}
function updateAccountButton(){document.getElementById("accountBtn").textContent=currentUser?"♙":"♙"}
document.getElementById("registerForm").addEventListener("submit",e=>{e.preventDefault();const name=document.getElementById("registerName").value.trim(),email=document.getElementById("registerEmail").value.trim().toLowerCase(),password=document.getElementById("registerPassword").value,confirmPass=document.getElementById("registerConfirm").value;if(password!==confirmPass){alert("As palavras-passe não coincidem.");return}if(users.some(u=>u.email===email)){alert("Este email já está cadastrado.");return}users.push({name,email,password});localStorage.setItem("users",JSON.stringify(users));currentUser={name,email};localStorage.setItem("currentUser",JSON.stringify(currentUser));updateAccountButton();fecharAuth();alert("Conta criada com sucesso, "+name+"!");e.target.reset()});
document.getElementById("loginForm").addEventListener("submit",e=>{e.preventDefault();const email=document.getElementById("loginEmail").value.trim().toLowerCase(),password=document.getElementById("loginPassword").value,user=users.find(u=>u.email===email&&u.password===password);if(!user){alert("Email ou palavra-passe incorreta.");return}currentUser={name:user.name,email:user.email};localStorage.setItem("currentUser",JSON.stringify(currentUser));updateAccountButton();fecharAuth();alert("Login efetuado com sucesso. Bem-vindo, "+user.name+"!");e.target.reset()});
document.addEventListener("click",e=>{const area=document.querySelector(".account-area");if(area&&!area.contains(e.target))document.getElementById("accountMenu").classList.remove("show")});updateAccountButton();
