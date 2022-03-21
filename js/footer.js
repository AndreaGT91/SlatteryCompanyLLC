// footer-component is the footer to be used on every page of the Slatter Corporation site

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer hidden class="foot mt-auto pt-3 pb-1 bg-dark">
        <div class="container">
          <p class="text-muted text-center">&copy;2022 Andrea C. Bentley</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);