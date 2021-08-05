// Variables
const cartInfoHTML = Array.from(document.querySelector('.top-cart-info__item').querySelectorAll('.red-info'));
const productsHTML = document.querySelectorAll('.product-box__item');
const productsBox = document.querySelector('.products-box');
const btnCheck = document.querySelector('.btn-check');
const categoryFilter = document.querySelector('.select-box');
const priceFilter = document.querySelector('.price-select-box');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const form = document.querySelector('form');
const notify = document.querySelector('.notify');

let state = { cartQty: 0, cartSum: 0, filterCategory: 0, filterPrice: 0 };
let products = [];
products = Array.from(productsHTML).map((el) => {
  const price = +el.querySelector('p').innerHTML.split(' ')[0];
  const pCategory = +el.dataset.category;
  console.log(el.dataset.category);
  const qty = +el.querySelector('.qty__item').value;
  el.querySelector('.qty__item').value = 0;
  return { element: el, price, qty, pCategory };
});

// Functions
const addToCart = (e) => {
  if (e.target.type !== 'submit') return;
  const price = +e.target.parentNode.querySelector('p').innerHTML.split(' ')[0];
  const qty = +e.target.parentNode.querySelector('.qty__item').value;
  if (qty > 0) state = { ...state, cartQty: state.cartQty + qty, cartSum: state.cartSum + qty * price };
  e.target.parentNode.querySelector('.qty__item').value = 0;
  render();
  notify.classList.toggle('active');

  setTimeout(function () {
    notify.classList.remove('active');
  }, 2000);
};

const updateCategoryFilter = (e) => {
  state.filterCategory = +e.target.value;
  render();
};

const updatePriceFilter = (e) => {
  state.filterPrice = +e.target.value;
  render();
};

const toggleModal = () => {
  modal.classList.toggle('show-modal');
};

const windowOnClick = (e) => {
  console.log('suveike modal', e.target);
  if (e.target === modal) {
    toggleModal();
  }
};

const formSubmit = (e) => {
  e.preventDefault();

  if (!form.name.value.replace(/\s/g, '').length || !form.email.value.replace(/\s/g, '').length) {
    alert('Поля не заполнены!!!');
  } else {
    alert('Благодарим за покупки!!!');
    state = { ...state, cartQty: 0, cartSum: 0 };
    toggleModal();
    render();
  }
};

const render = () => {
  productsBox.innerHTML = '';
  products.forEach((el) => {
    if ((el.pCategory === state.filterCategory || !state.filterCategory) && (el.price < state.filterPrice || !state.filterPrice))
      productsBox.appendChild(el.element);
  });
  cartInfoHTML[0].innerHTML = state.cartQty;
  cartInfoHTML[1].innerHTML = state.cartSum;
  console.log('Render state:', state);
};

// Events
productsBox.addEventListener('click', addToCart);
priceFilter.addEventListener('change', updatePriceFilter);
categoryFilter.addEventListener('change', updateCategoryFilter);
btnCheck.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
modal.addEventListener('click', windowOnClick);
form.addEventListener('submit', formSubmit);

// The Beginning
render();
