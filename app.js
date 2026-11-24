const seed = [
["Жев. марм. «Глаз Дракулы»",4320,8,540,"Мармелад","🍬"],
["Маршмелло «Меглоу-Джеллоу»",5265,12,438.75,"Маршмеллоу","☁️"],
["Мармелад «Вылупляшки»",6075,20,303.75,"Мармелад","🐣"],
["Десерт «Пугатель»",4293,12,357.75,"Десерты","👻"],
["Карамель «Укол XXL»",4779,12,398.25,"Карамель","🍭"],
["Жев. марм. «Клубничка»",4374,12,364.5,"Мармелад","🍓"],
["Мармелад «Хот Дог» 18 г",5265,12,438.75,"Мармелад","🌭"],
["Зефир XXL 18 г",4350,12,363,"Маршмеллоу","☁️"],
["Десерт «Грейзи Шейк» 41 г",3780,8,472.5,"Десерты","🥤"],
["Мармелад «Биг Бургер» 18 г",5265,12,438.75,"Мармелад","🍔"],
["Конфета «Кисломания»",4374,12,364.5,"Конфеты","🍬"],
["Киндер яйцо «Шокоприз»",5940,12,495,"Сюрпризы","🥚"],
["Жев. резинка Гумстер",5558,12,464,"Жвачка","🫧"],
["Десерт «Джелли Блокс»",5103,12,425.25,"Десерты","🧊"],
["Мармелад Грейзи «Гум Санвич»",5433.75,12,453,"Мармелад","🥪"],
["Десерт «Джеллистикс»",5130,16,320,"Десерты","🍡"],
["Десерт «Бомбич. Фрукты»",2794,6,466,"Десерты","🍍"],
["Десерт «Желток белок»",3861,12,322,"Десерты","🍳"],
["Дабл бургер на палочке",4658,8,582,"Леденцы","🍔"],
["Свит кит в стенде",5737,6,956,"Сюрпризы","🎁"],
["Десерт «Язык Дракулы»",3773,10,377,"Десерты","👅"],
["Конфета «Супер Гун»",5346,12,445,"Конфеты","🍬"],
["Маршмеллоу «Краш бараш»",3321,8,415,"Маршмеллоу","🐑"],
["Мармеладный Светофор",7222,12,602,"Мармелад","🚦"],
["Блек Челендж",2987,12,249,"Конфеты","🖤"],
["Драже «Шокопарики»",5257,12,438,"Драже","🍫"],
["Супер ролл жев. резинка",4725,16,295,"Жвачка","🌀"],
["«Канди Приз»",3930,6,655,"Сюрпризы","🎁"],
["Маршмелло Хот Дог",4205,12,350,"Маршмеллоу","🌭"],
["Грейзи Глаз мармелад",5000,20,250,"Мармелад","👁️"],
["Карамель «Грость»",2916,6,486,"Карамель","🍭"],
["Тату бум жвачки",5400,30,180,"Жвачка","💥"],
["Магни Липни «Укольчик»",4320,12,360,"Конфеты","🧪"],
["Супер Гун",5805,12,484,"Конфеты","🍬"],
["Маршмелло «Хот Дог XXL»",5103,12,425.25,"Маршмеллоу","🌭"],
["Бомбические Кислинки",4320,12,360,"Конфеты","🍋"],
["Джелли Глаз 16 г",3712,6,619,"Мармелад","👁️"]
].map((p,i)=>({id:i+1,name:p[0],box:p[1],pack:p[2],price:p[3],category:p[4],emoji:p[5],photo:""}));
let products = load("sc_products",seed).map(p=>({...p,section:p.section||"sweets"})), cart=load("sc_cart",{}), category="Все", section="sweets", admin=false, editingPhoto="";
const DAIRY_CATS=["Молоко","Кефир","Йогурты","Творог","Сметана","Сыры","Масло","Десерты молочные"];
function setSection(s){section=s;category="Все";render()}
function setCat(i){category=categories()[i];render()}
function load(k,f){try{let v=localStorage.getItem(k);return v?JSON.parse(v):f}catch(e){return f}}
function save(){localStorage.setItem("sc_products",JSON.stringify(products));localStorage.setItem("sc_cart",JSON.stringify(cart))}
function money(n){return Number(n).toLocaleString("ru-RU",{maximumFractionDigits:2})+" ₽"}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function categories(){return ["Все",...new Set(products.filter(p=>p.section===section).map(p=>p.category).filter(Boolean))]}
function renderChips(){let cats=categories();if(!cats.includes(category))category="Все";document.getElementById("chips").innerHTML=cats.map((c,i)=>`<button class="chip ${category===c?"active":""}" onclick="setCat(${i})">${esc(c)}</button>`).join("")}
function renderChrome(){document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.sec===section));document.getElementById("adminBar").classList.toggle("hidden",!admin);document.getElementById("addDairyBtn").classList.toggle("hidden",section!=="dairy")}
function render(){
 renderChips();renderChrome();let q=document.getElementById("search").value.toLowerCase(),s=document.getElementById("sort").value;
 let list=products.filter(p=>p.section===section&&(category==="Все"||p.category===category)&&p.name.toLowerCase().includes(q));
 if(s==="asc")list.sort((a,b)=>a.price-b.price);if(s==="desc")list.sort((a,b)=>b.price-a.price);if(s==="az")list.sort((a,b)=>a.name.localeCompare(b.name,"ru"));
 document.getElementById("countLabel").textContent=`${section==="dairy"?"Молочных продуктов":"Товаров"}: ${list.length}`;
 document.getElementById("products").innerHTML=list.map(p=>`<article class="card"><div class="photo">${p.photo?`<img src="${p.photo}" alt="">`:`<span class="emoji">${p.emoji||"🍬"}</span>`}<span class="tag">${esc(p.category||"Сладости")}</span>${admin?`<button class="edit-mini" onclick="editProduct(${p.id})">✏️</button>`:""}</div><h3>${esc(p.name)}</h3><div class="meta">${p.pack?`В ящике: ${p.pack} шт.`:""}${p.pack&&p.box?" · ":""}${p.box?`Ящик ${money(p.box)}`:""}</div><div class="price-row"><div><div class="price">${money(p.price)}</div><div class="unit">за 1 шт./блок</div></div>${(cart[p.id]||0)>0?`<div class="qty-control"><button onclick="changeQty(${p.id},-1)">−</button><b>${cart[p.id]}</b><button onclick="changeQty(${p.id},1)">+</button></div>`:`<button class="add" onclick="changeQty(${p.id},1)">＋ В заказ</button>`}</div></article>`).join("")||`<div class="empty" style="grid-column:1/-1"><span>${section==="dairy"?"🥛":"🥺"}</span>${section==="dairy"&&!products.some(p=>p.section==="dairy")?"Молочных продуктов пока нет. Нажми «Добавить молочный продукт».":"Ничего не найдено"}</div>`;
 updateCartBar();
}
function changeQty(id,d){cart[id]=Math.max(0,(cart[id]||0)+d);if(!cart[id])delete cart[id];save();render()}
function cartItems(){return Object.entries(cart).map(([id,qty])=>({p:products.find(p=>p.id==id),qty})).filter(x=>x.p)}
function total(){return cartItems().reduce((s,x)=>s+x.p.price*x.qty,0)}
function updateCartBar(){let items=cartItems(),qty=items.reduce((s,x)=>s+x.qty,0),bar=document.getElementById("bottomCart");bar.style.display=qty?"flex":"none";document.getElementById("cartCount").textContent=`${qty} шт. · ${items.length} поз.`;document.getElementById("cartSum").textContent=money(total())}
function showSheet(content){document.getElementById("sheet").innerHTML=content;document.getElementById("overlay").classList.add("show")}
function closeSheet(){document.getElementById("overlay").classList.remove("show")}
function openCart(){
 let items=cartItems();showSheet(`<div class="sheet-head"><h2>🛒 Твой заказ</h2><button class="close" onclick="closeSheet()">×</button></div>${items.length?items.map(({p,qty})=>`<div class="cart-line"><div><strong>${esc(p.name)}</strong><small>${money(p.price)} × ${qty}</small><div class="qty-control" style="display:inline-flex;margin-top:7px"><button onclick="changeQty(${p.id},-1);openCart()">−</button><b>${qty}</b><button onclick="changeQty(${p.id},1);openCart()">+</button></div></div><div class="line-right"><b>${money(p.price*qty)}</b><small><button onclick="changeQty(${p.id},-${qty});openCart()" style="background:none;color:#a34c89">Удалить</button></small></div></div>`).join(""):`<div class="empty"><span>🛍️</span>Корзина пока пустая</div>`}<div class="cart-total"><span>Итого</span><span>${money(total())}</span></div><button class="primary" ${items.length?"":"disabled"} onclick="copyOrder()">📋 Скопировать заказ</button><button class="secondary" onclick="closeSheet()">Продолжить выбор</button><button class="secondary" style="color:#c13b73" onclick="if(confirm('Очистить корзину?')){cart={};save();render();openCart()}">Очистить корзину</button>`);
}
function orderText(){let lines=["ЗАКАЗ ДЕТСКИХ СЛАДОСТЕЙ","────────────────────"];cartItems().forEach(({p,qty},i)=>lines.push(`${i+1}. ${p.name}\n   ${qty} шт. × ${money(p.price)} = ${money(p.price*qty)}`));lines.push("────────────────────",`ИТОГО: ${money(total())}`);return lines.join("\n")}
async function copyOrder(){let t=orderText();try{await navigator.clipboard.writeText(t);alert("Заказ скопирован! Можно вставить его в сообщение клиенту.")}catch(e){let a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();alert("Заказ скопирован!")}}
function openAdmin(){admin=true;render();showSheet(`<div class="sheet-head"><h2>⚙️ Управление каталогом</h2><button class="close" onclick="closeSheet()">×</button></div><div class="admin-tools"><button class="tool-btn accent" onclick="editProduct(null,'sweets')">＋ Добавить сладость</button><button class="tool-btn accent" onclick="editProduct(null,'dairy')">＋ Добавить молочный продукт</button><button class="tool-btn" onclick="exportData()">⬇️ Резервная копия</button><button class="tool-btn" onclick="document.getElementById('importFile').click()">⬆️ Восстановить копию</button><button class="tool-btn" style="grid-column:1/-1" onclick="toggleAdmin()">Готово (выйти из режима редактирования)</button></div><input id="importFile" type="file" accept="application/json" class="hidden" onchange="importData(event)"><p class="note">Изменения сохраняются автоматически на этом устройстве. Закрой окно (×) и нажми ✏️ на карточке товара, чтобы его отредактировать.</p>`)}
function toggleAdmin(){admin=false;closeSheet();render()}
function autoPrice(){let pr=document.getElementById("fPrice");if(pr.dataset.manual)return;let b=Number(document.getElementById("fBox").value),k=Number(document.getElementById("fPack").value);if(b>0&&k>0)pr.value=Math.round(b/k*100)/100}
function editProduct(id=null,sec=section){
 let p=id?products.find(x=>x.id==id):{id:null,name:"",box:"",pack:"",price:"",category:sec==="dairy"?"Молоко":"Мармелад",emoji:sec==="dairy"?"🥛":"🍬",photo:"",section:sec};
 if(!p)return;sec=p.section||"sweets";
 editingPhoto=p.photo||"";
 showSheet(`<div class="sheet-head"><h2>${id?"✏️ Редактировать товар":"✨ Новый товар"}</h2><button class="close" onclick="closeSheet()">×</button></div>
 <div class="modal-field"><label>Раздел</label><select id="fSec" onchange="document.getElementById('fCat').value=this.value==='dairy'?'Молоко':'Мармелад';document.getElementById('fEmoji').value=this.value==='dairy'?'🥛':'🍬'"><option value="sweets" ${sec==="sweets"?"selected":""}>🍭 Сладости</option><option value="dairy" ${sec==="dairy"?"selected":""}>🥛 Молочные продукты</option></select></div>
 <div class="modal-field"><label>Название товара</label><input id="fName" value="${esc(p.name)}" placeholder="Например, Мармелад Кислинка"></div>
 <div class="form-grid"><div class="modal-field"><label>Цена за ящик/упаковку, ₽</label><input id="fBox" type="number" step="0.01" value="${p.box}" oninput="autoPrice()"></div><div class="modal-field"><label>Штук в ящике/упаковке</label><input id="fPack" type="number" step="1" value="${p.pack}" oninput="autoPrice()"></div></div>
 <div class="modal-field"><label>Цена за штуку / блок, ₽</label><input id="fPrice" type="number" step="0.01" value="${p.price}" oninput="this.dataset.manual=1" ${id?"data-manual=1":""}></div>
 <div class="form-grid"><div class="modal-field"><label>Категория</label><input id="fCat" list="catList" value="${esc(p.category)}"><datalist id="catList">${[...new Set([...DAIRY_CATS,...products.map(x=>x.category)])].map(c=>`<option value="${esc(c)}">`).join("")}</datalist></div><div class="modal-field"><label>Эмодзи</label><input id="fEmoji" value="${esc(p.emoji)}"></div></div>
 <div class="modal-field"><label>Фотография товара</label><input id="fPhoto" type="file" accept="image/*" onchange="readPhoto(event)"><img id="photoPreview" class="photo-preview" ${editingPhoto?`src="${editingPhoto}" style="display:block"`:""}>${editingPhoto?`<button class="secondary" onclick="editingPhoto='';document.getElementById('photoPreview').style.display='none'">Удалить фото</button>`:""}</div>
 <button class="primary" onclick="saveProduct(${id||"null"})">Сохранить товар</button>${id?`<button class="secondary" style="color:#c13b73" onclick="deleteProduct(${id})">Удалить товар</button>`:""}`);
}
function readPhoto(e){let file=e.target.files[0];if(!file)return;if(file.size>8*1024*1024){alert("Фото слишком большое. Выбери файл до 8 МБ.");return}let reader=new FileReader();reader.onload=()=>{let img=new Image();img.onload=()=>{let c=document.createElement("canvas"),max=900,scale=Math.min(1,max/Math.max(img.width,img.height));c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext("2d").drawImage(img,0,0,c.width,c.height);editingPhoto=c.toDataURL("image/jpeg",.78);let pr=document.getElementById("photoPreview");pr.src=editingPhoto;pr.style.display="block"};img.src=reader.result};reader.readAsDataURL(file)}
function saveProduct(id){let name=document.getElementById("fName").value.trim(),box=Number(document.getElementById("fBox").value)||0,pack=Number(document.getElementById("fPack").value)||0,price=Number(document.getElementById("fPrice").value),sec=document.getElementById("fSec").value;if(!name||!(price>0)){alert("Укажи название и цену за единицу.");return}
 let obj={id:id||Math.max(0,...products.map(p=>Number(p.id)||0))+1,name,box,pack,price,section:sec,category:document.getElementById("fCat").value.trim()||(sec==="dairy"?"Молочные":"Сладости"),emoji:document.getElementById("fEmoji").value||(sec==="dairy"?"🥛":"🍬"),photo:editingPhoto};
 if(id){products=products.map(p=>p.id==id?obj:p)}else products.push(obj);
 section=sec;category="Все";save();closeSheet();render()}
function deleteProduct(id){if(!confirm("Удалить этот товар из каталога?"))return;products=products.filter(p=>p.id!=id);delete cart[id];save();closeSheet();render()}
function exportData(){let blob=new Blob([JSON.stringify({products,cart},null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="sweet-crazy-backup.json";a.click();URL.revokeObjectURL(url)}
function importData(e){let file=e.target.files[0];if(!file)return;let r=new FileReader();r.onload=()=>{try{let d=JSON.parse(r.result);if(!Array.isArray(d.products))throw 0;if(!confirm("Заменить текущий каталог данными из резервной копии?"))return;products=d.products.map(p=>({...p,section:p.section||"sweets"}));cart=d.cart||{};save();render();closeSheet();alert("Каталог восстановлен.")}catch(err){alert("Не удалось прочитать резервную копию.")}};r.readAsText(file)}
render();
