customElements.define('custom-style',class customStyle extends HTMLElement {
    constructor(params) {
      super();
      setTimeout(() => {
          let styleElement = document.createElement('style');
          styleElement.type = "text/css";
          styleElement.innerHTML = this.innerHTML;
          this.insertAdjacentElement('afterend',styleElement);
          this.remove();
          console.log('Custom Style')
      },1000);
    }
  })