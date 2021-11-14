
const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const incrementCounter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  if (cartCounter === 1) cartCounterLabel.style.display = 'block';
};

const getMockData = (t) => +t.parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disabledControls = (t, fn) => {
  t.disabled = true;
  contentContainer.removeEventListener('click', fn);
};
const enabledControls = (t, fn) => {
  t.disabled = false;
  contentContainer.addEventListener('click', fn);
};

const btnClickHandler = (e) => {
  const target = e.target;

  if (target && target.matches('.item-actions__cart')) {
    incrementCounter();

    cartPrice = getPrice(target, cartPrice);

    const restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    disabledControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enabledControls(target, btnClickHandler);
    }, 2000);
  }
};

contentContainer.addEventListener('click', btnClickHandler);

