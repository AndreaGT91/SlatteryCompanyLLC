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
  const portfolioMediaPath = mediaPath + "portfolio/";
  const portfolioDataPath = portfolioMediaPath + "portfolio.json";
  const portfolioImagesPath = portfolioMediaPath + "images/";

  const carouselIndicators = $("#carouselIndicators");
  const carouselInner = $("#carouselInner");
  let numItems = $(".carousel-item").length;

  // Read portfolio information from external file and add to Portfolio page
  $.getJSON(portfolioDataPath)
    .done(function(projects) {
      // Check to see if number of projects changed since page last loaded
      // If so, empty old data, prepare to load new
      if ((numItems > 0) && (numItems != projects.length)) {
        carouselIndicators.empty();
        carouselInner.empty();
        numItems = 0;
      };

      // Only build page if it's empty and there are projects
      if ((numItems == 0) && (projects.length > 0)) {
        // In case of previous failure to read JSON, need to make sure
        // controls are now showing
        $(".carousel-controls").show();

        let newIndicator;
        let newInner;
        // let captionHeight;
        // let imageHeight;
        // let indicatorPosition;

        $.each(projects, function(index, project) {
          newIndicator = $(`<button type='button' 
              data-bs-target='#portfolioCarousel' 
              data-bs-slide-to='${index}' 
              aria-label='${project.title}'>
            </button>`);
            // <div class='carousel-caption d-block bg-dark' id='caption-${i}'> 
          newInner = $(`<div class='carousel-item'> 
              <img class='mx-auto d-block' id='img-${index}' 
                src='${portfolioImagesPath + project.filename}' 
                alt='${project.title}'> 
              <div class='carousel-caption d-block' id='caption-${index}'> 
                <h5>${project.title}</h5> 
                <p>${project.description}</p> 
              </div>
            </div>`);

          // Add active classes to first elements
          if (index == 0) {
            newIndicator.addClass("active");
            newIndicator.attr("aria-current", "true");
            newInner.addClass("active");
          };

          newIndicator.appendTo(carouselIndicators);
          newInner.appendTo(carouselInner);
        });   
      };
    })
    .fail(function(jqxhr, textStatus, error) {
      // Display error to console for debugging
      console.log("Loading portfolio.json failed: ", textStatus, error);

      // Let user know that data could not be loaded
      carouselInner.append(`div class="row d-flex flex-row justify-content-center">
        <div class="col-4 mx-auto"><div class="card text-dark bg-light m-3">
        <div class="card-body"><h5 class="card-title">Error</h5>
        <p>Could not load Portfolio.</p></div></div></div></div>`);
      $(".carousel-controls").hide();
    });


      // captionHeight = $(`#caption-${i}`).height();
      // imageHeight = window.innerHeight - captionHeight - 56;
      // $(`#img-${i}`).height(imageHeight);
      // $(`#img-${i}`).css("max-height", `${imageHeight}px`);

      // indicatorPosition = imageHeight - carouselIndicators.height();
      // carouselIndicators.css("top", `${indicatorPosition}px`);
      // carouselIndicators[0].style.bottom = `${captionHeight}px`;
      // carouselIndicators.css("bottom",`${indicatorPosition}px`);
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
    .done(function(bioInfo) {
      $.each(bioInfo, function(index, bioItem) {
        // If image included, add it before paragraph text
        if (bioItem.hasOwnProperty("image")) {
          cardContent = imgSrc + aboutMediaPath + bioItem.image;
          if (bioItem.hasOwnProperty("altText")) {
            cardContent += imgAltText + replaceNewlines(bioItem.altText);
          };
          cardContent += imgStyle + paraText;
        }
        else cardContent = paraText;

        // Construct card to add; replace \n with </p><p> to display correctly
        $("#about-row").append(columnSlide + slideDelay + cardBodyTitle +
          replaceNewlines(bioItem.title) + cardText + cardContent + 
          replaceNewlines(bioItem.body) + endCard);

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