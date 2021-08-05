"use strict";

$(() => {
  // Set onclick handler to open/close side menu when hamburger clicked on mobile
  $(".navbar-toggler").click(() => {
    $(".offcanvas-collapse")[0].classList.toggle("open");
  });

  // Make appropriate navbar link active
  $(".nav-item").attr("aria-current", false);
  $(".nav-link").find(".active").removeClass("active");
  if (window.location.pathname.includes("portfolio")) {
    $("#portfolio-link").addClass("active");
    $("#portfolio-link").parent().attr("aria-current", "page");
  }
  else if (window.location.pathname.includes("about")) {
    $("#about-link").addClass("active");
    $("#about-link").parent().attr("aria-current", "page");
  }
  else {
    $("#home-link").addClass("active");
    $("#home-link").parent().attr("aria-current", "page");
  };

  // Initialize Animate on Scroll library 
  AOS.init({duration: 1500}); 
});