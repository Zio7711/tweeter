// Add a function to your file to ensure the DOM has loaded.
$(document).ready(() => {
  console.log('The DOM has loaded');

  //register an event handler to the textarea element for the form.
  $('#tweet-text').on('keyup', function() {
    //extract the input value and calculate its length
    const maxChar = 140;
    let typedInput = this.value;
    const alphabet =
      'abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    const alphabetArray = alphabet.split('');

    //if the input is in the alphabet, it counts as 2 chars, else it count as 1
    let inputLength = 0;
    for (const typedChar of typedInput) {
      if (alphabetArray.includes(typedChar)) {
        inputLength += 2;
      } else {
        inputLength++;
      }
    }

    //calculate the remaining chars for input field
    let charRemaining = maxChar - inputLength;

    //traversing up the DOM tree
    $(this).parent().find('.counter').text(charRemaining);
  });
});
