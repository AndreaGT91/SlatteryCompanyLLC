"use strict";

// On page load
$(() => {
  // Set onclick handler to open/close side menu when hamburger clicked on mobile
  $(".navbar-toggler").click(() => {
    $(".offcanvas-collapse")[0].classList.toggle("open");
  });

  // Initialize Animate on Scroll library 
  AOS.init({duration: 1500}); 

  // Make appropriate navbar link active
  $(".nav-item").attr("aria-current", false);
  $(".nav-link").find(".active").removeClass("active");
  if (window.location.pathname.includes("portfolio")) {
    $("#portfolio-link").addClass("active");
    $("#portfolio-link").parent().attr("aria-current", "page");
    setupPortfolio();
  }
  else if (window.location.pathname.includes("about")) {
    $("#about-link").addClass("active");
    $("#about-link").parent().attr("aria-current", "page");
  }
  else {
    $("#home-link").addClass("active");
    $("#home-link").parent().attr("aria-current", "page");
  };
});

function setupPortfolio() {
  // json list of project images
  const projects = 
    [
      { "title": "Villas at River Park 1",
        "filename": "./media/Johns-Creek-1.jpg",
        "description": "test"
      },
      { "title": "Villas at River Park 2",
        "filename": "./media/Johns-Creek-2.jpg",
        "description": "test"
      },
      { "title": "Ty Cobb Regional Medical Center",
        "filename": "./media/Ty-Cobb-Physicians-Center.jpg",
        "description": "test"
      },
      { "title": "St. Mary's Sacred Heart Hospital (north)",
        "filename": "./media/St-Marys-Sacred-Heart-North.jpg",
        "description": "test"
      },
      { "title": "St. Mary's Sacred Heart Hospital (south)",
        "filename": "./media/St-Marys-Sacred-Heart-South.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, Building 1, 1",
        "filename": "./media/Clearview-PC-Bldg1-1.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, Building 1, 2",
        "filename": "./media/Clearview-PC-Bldg1-2.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, Building 2, 1",
        "filename": "./media/Clearview-PC-Bldg2-1.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, Building 2, 2",
        "filename": "./media/Clearview-PC-Bldg2-2.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, inside 1",
        "filename": "./media/Clearview-PC-Inside-1.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, inside 2",
        "filename": "./media/Clearview-PC-Inside-2.jpg",
        "description": "test"
      },
      { "title": "Clearview Physicians Center, inside 3",
        "filename": "./media/Clearview-PC-Inside-3.jpg",
        "description": "test"
      }
    ]; // end json list of project images

  const carouselIndicators = $("#carouselIndicators");
  const carouselInner = $("#carouselInner");

  let numItems = $(".carousel-item").length;

  // Check to see if number of projects changed since page last loaded
  // If so, empty old data, prepare to load new
  if ((numItems > 0) && (numItems != projects.length)) {
    carouselIndicators.empty();
    carouselInner.empty();
    numItems = 0;
  };

  // Only build page if it's empty and there are projects
  if ((numItems == 0) && (projects.length > 0)) {
    let newIndicator;
    let newInner;

    for (let i=0; i<projects.length; i++) {
      newIndicator = $(`<button type='button' 
          data-bs-target='#portfolioCarousel' 
          data-bs-slide-to='${i}' 
          aria-label='${projects[i].title}'>
        </button>`);
      newInner = $(`<div class='carousel-item'> 
          <img src='${projects[i].filename}' class='mx-auto d-block' 
            alt='${projects[i].title}'> 
          <div class='carousel-caption d-block'> 
            <h5>${projects[i].title}</h5> 
            <p>${projects[i].description}</p> 
          </div>
        </div>`);

      // Add active classes to first elements
      if (i == 0) {
        newIndicator.addClass("active");
        newIndicator.attr("aria-current", "true");
        newInner.addClass("active");
      };

      newIndicator.appendTo(carouselIndicators);
      newInner.appendTo(carouselInner);
    }; // end for loop to add elements
  }; // end build
}; // end function setupPortfolio