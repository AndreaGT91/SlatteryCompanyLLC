"use strict";

const mediaPath = "./media/";
const JJSjrEmail = "JosephJohnSlatteryJr@SlatteryCompanyLLC.com";

// replace '\n' if found in JSON
const replaceNewlines = value => value.replace(/\n/gi, "</p><p>");

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
    setupAbout();
  }
  else if (window.location.pathname.includes("contact")) {
    $("#contact-link").addClass("active");
    $("#contact-link").parent().attr("aria-current", "page");
    $("#copy-button").click(() => navigator.clipboard.writeText(JJSjrEmail));
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
      { "title": "Villas at River Park (1 of 2)",
        "filename": "./media/portfolio/images/Johns-Creek-1.jpg",
        "description": `(Under development)`
      },
      { "title": "Villas at River Park (2 of 2)",
        "filename": "./media/portfolio/images/Johns-Creek-2.jpg",
        "description": `(Under development)`
      },
      { "title": "St. Mary's Sacred Heart Hospital (1 of 2)",
        "filename": "./media/portfolio/images/St-Marys-Sacred-Heart-North.jpg",
        "description": `Roles: Business development, grants and land acquisitions, 
          capital raising, capital partner relationship management. 
          Full-service general acute care hospital located in Lavonia, Georgia.
          Originally Ty Cobb Regional Medical Center, purchased in 2015 by 
          St. Mary's Health Care System (Athens, GA).`
      },
      { "title": "St. Mary's Sacred Heart Hospital (2 of 2)",
        "filename": "./media/portfolio/images/St-Marys-Sacred-Heart-South.jpg",
        "description": `155,000 square foot full-service hospital on a 39 
          acre campus in Lavonia, Georgia &bull; 24/7 Emergency Department, Critical 
          Care unit, and 56 private inpatient rooms &bull; 4 surgical suites, 
          mother/baby unit, and Imaging Services Department`
      },
      { "title": "St. Mary's Sacred Heart Wellness Center",
        "filename": "./media/portfolio/images/Ty-Cobb-Physicians-Center.jpg",
        "description": `Roles: Business development, grant acquisitions, capital  
          raising, capital partner relationship management, tenant leasing and 
          building management. Two-story, 35,000 square foot medical office building 
          in Lavonia, Georgia. Originally Ty Cobb Physicians Center, now part 
          of St. Mary's Sacred Heart Hospital campus.`
      },
      { "title": "Clearview Physicians Center 1 (1 of 2)",
        "filename": "./media/portfolio/images/Clearview-PC-Bldg1-1.jpg",
        "description": `Roles: Business development, capital raising, capital 
          partner relationship management, tenant leasing and building management. 
          Two-story, 38,000 square foot medical office building (MOB) in Monroe, 
          Georgia. Part of the Piedmont Healthcare network (Atlanta, GA), the MOB 
          is located at Piedmont Walton, originally named Clearview Regional 
          Medical Center.`
      },
      { "title": "Clearview Physicians Center 1 (2 of 2)",
        "filename": "./media/portfolio/images/Clearview-PC-Bldg1-2.jpg",
        "description": `Adjacent to Piedmont Walton Hospital &bull; 
          Specialties include Oncology, Cardiology, Orthopedics, ENT, and Physical
          Therapy &bull; Pain and Spine Center &bull; Wound Healing Center &bull; 
          Surgical Specialists &bull; Metabolic Center`
      },
      { "title": "Clearview Physicians Center 2 (1 of 2)",
        "filename": "./media/portfolio/images/Clearview-PC-Bldg2-1.jpg",
        "description": `Roles: Business development, capital raising, capital partner 
          relationship management, early-on tenant leasing. Single-story 20,000 square 
          foot medical office building in Monroe, Georgia.`
      },
      { "title": "Clearview Physicians Center 2 (2 of 2)",
        "filename": "./media/portfolio/images/Clearview-PC-Bldg2-2.jpg",
        "description": `Located at the entrance to Piedmont Walton Hospital 
          campus &bull; Specialties include Dialysis and Urology &bull; Offers both 
          Urgent Care and Primary Care.`
      },
      { "title": "Clearview Physicians Center 2 (inside, 1 of 3)",
        "filename": "./media/portfolio/images/Clearview-PC-Inside-1.jpg",
        "description": `U.S. Renal Care serves patients with chronic and acute 
          renal disease.`
      },
      { "title": "Clearview Physicians Center 2 (inside, 2 of 3)",
        "filename": "./media/portfolio/images/Clearview-PC-Inside-2.jpg",
        "description": `(Under development)`
      },
      { "title": "Clearview Physicians Center 2 (inside, 3 of 3)",
        "filename": "./media/portfolio/images/Clearview-PC-Inside-3.jpg",
        "description": `(Under development)`
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
    // let captionHeight;
    // let imageHeight;
    // let indicatorPosition;

    for (let i=0; i<projects.length; i++) {
      newIndicator = $(`<button type='button' 
          data-bs-target='#portfolioCarousel' 
          data-bs-slide-to='${i}' 
          aria-label='${projects[i].title}'>
        </button>`);
        // <div class='carousel-caption d-block bg-dark' id='caption-${i}'> 
      newInner = $(`<div class='carousel-item'> 
          <img class='mx-auto d-block' id='img-${i}' 
            src='${projects[i].filename}' 
            alt='${projects[i].title}'> 
          <div class='carousel-caption d-block' id='caption-${i}'> 
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

      // captionHeight = $(`#caption-${i}`).height();
      // imageHeight = window.innerHeight - captionHeight - 56;
      // $(`#img-${i}`).height(imageHeight);
      // $(`#img-${i}`).css("max-height", `${imageHeight}px`);

      // indicatorPosition = imageHeight - carouselIndicators.height();
      // carouselIndicators.css("top", `${indicatorPosition}px`);
      // carouselIndicators[0].style.bottom = `${captionHeight}px`;
      // carouselIndicators.css("bottom",`${indicatorPosition}px`);
    }; // end for loop to add elements
  }; // end build
}; // end function setupPortfolio

function setupAbout() {
  const aboutMediaPath = mediaPath + "about/";
  const aboutBioData = aboutMediaPath + "about.json";

  const columnSlide = `<div class="col-md-6 col-sm-12 mx-auto">
    <div data-aos="slide-right" data-aos-delay="`;
  const cardBodyTitle = `" class="card text-dark bg-light m-3">
    <div class="card-body"> <h5 class="card-title">`;
  const cardText = `</h5> <div class="card-text">`;
  const imgSrc = `<img src="`;
  const imgAltText = `" alt="`;
  const imgStyle = `" style="float: left; margin: 10px 20px 10px 0; max-width: 30%;">`;
  const paraText = `<p>`;
  const endCard = `</p> </div> </div> </div> </div>`;

  let cardContent = ""; // Will be used to build card text based on object
  const initialSlideDelay = 300; // First slide delay 300ms
  let slideDelay = initialSlideDelay; // Each card delays for 300ms longer

  // Read bio information from external file and add to About page
  $.getJSON(aboutBioData)
    .done(function(data) {
      $.each(data, function(index, value) {
        // If image included, add it before paragraph text
        if (value.hasOwnProperty("image")) {
          cardContent = imgSrc + aboutMediaPath + value.image;
          if (value.hasOwnProperty("altText")) {
            cardContent += imgAltText + replaceNewlines(value.altText);
          };
          cardContent += imgStyle + paraText;
        }
        else cardContent = paraText;

        // Construct card to add; replace \n with </p><p> to display correctly
        $("#about-row").append(columnSlide + slideDelay + cardBodyTitle +
          replaceNewlines(value.title) + cardText + cardContent + 
          replaceNewlines(value.body) + endCard);

        slideDelay += initialSlideDelay;
      });   
    })
    .fail(function(jqxhr, textStatus, error) {
      // Display error to console for debugging
      console.log("Loading about.json failed: ", textStatus, error);

      // Let user know that data could not be loaded
      $("#about-row").append(columnSlide + slideDelay + cardBodyTitle +
        "Error" + cardText + paraText + "Could not load Mr. Slattery's bio." + endCard);
    });
};