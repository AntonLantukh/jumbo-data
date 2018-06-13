$(document).ready(function(){
   $(".main-nav__element").on("click", function (event) {
       event.preventDefault();
       var id  = $(this).attr('href');
       var topHeight = $(id).offset().top;
       $('body,html').animate({scrollTop: topHeight}, 800);
   });
});
