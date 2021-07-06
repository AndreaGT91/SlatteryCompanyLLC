// header-component is the nav bar to be used on every page of the Slatter Company site

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" 
          aria-label="Slattery Company navigation">
          <div class="container-fluid">
            <!-- Brand name shows at all times -->
            <a class="navbar-brand" href="#">Slattery Company</a>
    
            <!-- Hamburger menu only shows on small screens -->
            <button
              class="btn navbar-toggler p-0 border-0"
              type="button"
              data-bs-toggle="offcanvas" 
              data-bs-target="#collapseMenu" 
              aria-expanded="false" 
              aria-controls="collapseMenu"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
    
            <!-- Menu items; both full screen and mobile -->
            <div class="navbar-collapse offcanvas-collapse" id="collapseMenu">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Portfolio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">About</a>
                </li>
                <a class="nav-link" href="mailto:JosephJohnSlatteryJr@SlatteryCompanyLLC.com">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define('header-component', Header);