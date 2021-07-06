"use strict";

$(function() {
  $(".navbar-toggler")[0].addEventListener("click", function () {
    $(".offcanvas-collapse")[0].classList.toggle("open");
  });

  AOS.init(); // Initialize Animate on Scroll library 
});