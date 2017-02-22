/* Function to count the number of characters typed */

$(document).ready(function() {
  const CHAR_COUNT = 140;
  $('.counter').text(CHAR_COUNT);

  $('textarea').on('keyup', function() {
    const numChar = $(this).val().length;  //lowercase dynamic property
    const remChar = CHAR_COUNT - numChar;

    remChar < 0 ? $('.counter').css('color', 'red')
                : $('.counter').css('color', 'black')
    $('.counter').text(remChar);
  });
});