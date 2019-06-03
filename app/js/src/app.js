document.addEventListener("DOMContentLoaded", function() {
  console.timeEnd('inep-enem');
});

$(document).ready(function(){
  
  var stickyOffset = $('#navigation_row').offset().top;
  
  $(window).scroll(function(){
    var sticky = $('#navigation_row')
    var content = $('#section_content')
    var menu = $('.main-nav')
    var scroll = $(window).scrollTop()
    
    if (scroll >= stickyOffset) {
      sticky.addClass('fixed')
      content.addClass('top_margin')
      menu.addClass('fixed_menu')
    }else {
      sticky.removeClass('fixed')
      content.removeClass('top_margin')
      menu.removeClass('fixed_menu')
    }
  });

  $('#section_content').load('before_test_page.html #section_content');

  
  $('#faq_button').click(function () {
    $('#section_content').load('faq_page.html #section_content');
    $('#navigation_row li a').removeClass('active');
    $('#navigation_row li a#faq_button').addClass('active');
  });
  $('#before_test_button').click(function () {
    $('#section_content').load('before_test_page.html #section_content');
    $('#navigation_row li a').removeClass('active');
    $('#navigation_row li a#before_test').addClass('active');
  });
  $('#after_test_button').click(function () {
    $('#section_content').load('after-test.html #section_content');
    $('#navigation_row li a').removeClass('active');
    $('#navigation_row li a#after_test_button').addClass('active');
  });
  $('#on_day_test_button').click(function(){
    $('#section_content').load('on_day_test_page.html #section_content');
    $('#navigation_row li a').removeClass('active');
    $('#navigation_row li a#on_day_test_button').addClass('active');
  });

  
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
          $('html,body').animate({ scrollTop: $(this.hash).offset().top - 180}, 800);
        return false;
      }
    }
  })
});


