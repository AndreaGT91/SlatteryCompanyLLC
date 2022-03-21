// header-component is the nav bar to be used on every page of the Slatter Company site

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-dark" 
          aria-label="Slattery Company, LLC navigation" role="navigation">
          <div class="container-fluid">
            <!-- Brand name shows at all times -->
            <a class="navbar-brand" href="#">Slattery Company, LLC</a>
    
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
                  <a class="nav-link" id="home-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="portfolio-link" href="portfolio.html">Portfolio</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="about-link" href="about.html">About</a>
                </li>
                  <a class="nav-link" id="contact-link" href="contact.html">Contact</a>
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