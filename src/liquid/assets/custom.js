customElements.define('custom-style',class customStyle extends HTMLElement {
    constructor(params) {
      super();
      setTimeout(() => {
          let styleElement = document.createElement('style');
          styleElement.type = "text/css";
          styleElement.innerHTML = this.innerHTML;
          this.insertAdjacentElement('afterend',styleElement);
          this.remove();
      },1000);
    }
  });

  document.querySelectorAll('[data-style]').forEach(element => {
    console.log(element)
    let styles = element.dataset.style;
    element.removeAttribute('data-style');
    element.setAttribute('style',styles);
  });