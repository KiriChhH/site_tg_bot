/*
let products = [
  { id: 1, name: 'iPhone 13', price: 80000, image: 'https://opt-milena.ru/upload/iblock/ffa/4byd2713w5foug0k40xm38e15f1ujyvz.jpg',  description: 'Жопы'},
  { id: 2, name: 'Samsung Galaxy S21', price: 70000, image: '',  description: 'Аываы' },
  { id: 3, name: 'Google Pixel 6', price: 60000, image: '',  description: 'фывфыв' },
  // Добавить из БД
];
*/

// Корзина
let cart = [];
let products = [];

function loadProducts() {
  fetch('foo.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      products = data; // Присваиваем загруженные данные переменной products
      displayProducts(); // Вызываем функцию отображения товаров
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
}


// Функция для отображения товаров
function displayProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'grid place-content-center bg-white rounded overflow-hidden shadow-lg p-2';
    productElement.innerHTML = `
      <img class="h-72 w-72 p-3" src="${product.image1}" alt="${product.name}">
      <div class="px-6 py-4 grid grid-cols-1">
        <div class="font-bold text-xl mb-2">${product.name}</div>
        <p class="text-gray-700 text-base">Цена: ${product.price} руб.</p>
        <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onclick="showProductDetails(${product.id})">Подробнее</button>
        <button id='mAddBtn(${product.id})' class="max-w-2 mt-4 px-4 py-2 max-w-8 bg-green-500 text-white rounded hover:bg-green-700" onclick="addToCartFromMain(${product.id})">Добавить в корзину</button>
      </div>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Показать детали товара
function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  const productDetails = document.getElementById('productDetails');
  productDetails.innerHTML = `
    <img class="grid min-h-[140px] max-h-[210px] w-full place-items-center overflow-x-scroll rounded-lg p-6" src="${product.image1}" alt="${product.name}">
    <h3 class="text-lg font-semibold">${product.name}</h3>
    <p class="text-gray-700">Цена: ${product.price} руб.</p>
    <p class="mt-4">${product.description}</p>
    <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" onclick="addToCart(${product.id})">Добавить в корзину</button>
  `;
  document.getElementById('productModal').classList.remove('hidden');
  document.body.classList.add('overflow-hidden'); // Фиксируем фон
}

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('productModal').classList.add('hidden');
  document.body.classList.remove('overflow-hidden'); // Снимаем фиксацию фона
});

// Добавление в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  const productDetails = document.getElementById('productDetails');
  productDetails.innerHTML = `
   <img class="grid min-h-[140px] max-h-[210px] w-full place-items-center overflow-x-scroll rounded-lg p-6" src="${product.image1}" alt="${product.name}">
   <h3 class="text-lg font-semibold">${product.name}</h3>
   <p class="text-gray-700">Цена: ${product.price} руб.</p>
   <p class="mt-4">${product.description}</p>
   <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" onclick="addToCart(${product.id})">Товар успешно добавлен</button>
  `;
  updateCart();
  saveCart();
}

function addToCartFromMain(productId){
  const product = products.find(p => p.id === productId);
  cart.push(product);
  document.getElementById(`mAddBtn(${product.id})`).textContent = "Товар добавлен";
  updateCart();
  saveCart();
}

// Обновляем функцию updateCart для более детального представления товаров
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ''; // Очищаем содержимое корзины
  cart.forEach((product, index) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'flex justify-between items-center mt-4 bg-white p-4 rounded shadow';
    cartItemElement.innerHTML = `
      <div>
        <h4 class="font-bold">${product.name}</h4>
        <p>Цена: ${product.price} руб.</p>
      </div>
      <div>
        <button onclick="removeFromCart(${index})" class="text-red-500">Удалить</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
  document.getElementById('totalPrice').textContent = totalPrice + ' руб.';
}

// Удаление из корзины
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
}

// Сохранение корзины в localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Загрузка корзины из localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts(); // Загрузка товаров при инициализации
  loadCart();
});

document.getElementById('toggleCart').addEventListener('click', () => {
  const cartModal = document.getElementById('cart');
  if (cartModal.classList.contains('hidden')) {
    cartModal.classList.remove('hidden');
    updateCart();
  } else {
    cartModal.classList.add('hidden');
  }
  document.body.classList.add('overflow-hidden');
});

// Скрытие корзины при начальной загрузке страницы
document.getElementById('cart').classList.add('hidden');

document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cart').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
});

document.getElementById('closeModalCart').addEventListener('click', () => {
  document.getElementById('cart').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
});

// tg_script //
let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.color = "#34C924";
tg.MainButton.text = "Подтвердить";

let btn_open = document.getElementById("togglePayment");

btn_open.addEventListener('click', function(){
  tg.MainButton.show()
});

Telegram.WebApp.onEvent('mainButtonClicked', function(){
  tg.sendData(popupCost.value);
});

popupClose.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("popup--open");
  body.classList.remove("lock");
  tg.MainButton.hide()
});