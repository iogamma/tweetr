/* Function to count the number of characters typed */

$(document).ready(function() {
  const CHAR_COUNT = 140;
  $('.counter').text(CHAR_COUNT);

  $('textarea').on('keyup', function() {
    const NUM_CHAR = $(this).val().length;  //lowercase dynamic property
    const REM_CHAR = CHAR_COUNT - NUM_CHAR;

    REM_CHAR < 0 ? $('.counter').css('color', 'red')
                : $('.counter').css('color', 'black')
    $('.counter').text(REM_CHAR);
  });
});