
// Menu button 
$('.mobile-menu-btn').on('click', function() {
  
  if($(this).hasClass('active')) {
    closeMenu();
    
  } else {
    openMenu();
  }
  });

  var openMenu = function(){
    $('body').addClass('hidden');
    $('.mobile-menu-btn').addClass('active');
    $('.header__menu').addClass('mobile')
  }
  var closeMenu = function(){
    $('body').removeClass('hidden');
    $('.mobile-menu-btn').removeClass('active');
    $('.header__menu').removeClass('mobile')
  }


// Dynamic content
$(window).resize(dynamic_content);
$(window).ready(dynamic_content);

function dynamic_content(){
  let width = $(window).width()
  if( width >= 992){
    $('.header__menu').removeClass('mobile');
    $('.mobile-menu-btn').removeClass('active');
  }
}

//  To toggle classes of buttons
$('.button').on('click', function() {
  $(this).addClass('button--active');
  $(this).siblings('.button').removeClass('button--active')
});

// Input range    
let slider = $('.progress-block'),
    range = $('.progress');
    slider.attr('value', range.attr('value'));

function inputRange() {
      range.on('input', function(){
        slider.attr('value', this.value);
      });

}

inputRange();


// Tag Select

$('select').each(function(){
  var $this = $(this), numberOfOptions = $(this).children('option').length;
  
  $this.addClass('select-hidden'); 
  $this.wrap('<div class="select-block"></div>');
  $this.after('<div class="select-styled"></div>');

  var $styledSelect = $this.next('div.select-styled');
  $styledSelect.text($this.children('option').eq(0).text());

  var $list = $('<ul />', {
      'class': 'select-options'
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
      }).appendTo($list);
  }

  var $listItems = $list.children('li');

  $styledSelect.click(function(e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function(){
          $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
      // $(this).text('');

  });

  $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();

  });

  $(document).click(function() {
      $styledSelect.removeClass('active');
      $list.hide();
  });

});

