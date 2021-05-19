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
    //edge cases: counter turns red when invalid
    if (charRemaining > 0) {
      $(this)
        .parents()
        .find('.counter')
        .text(charRemaining)
        .css('color', '#545149');
    } else {
      $(this)
        .parents()
        .find('.counter')
        .text(charRemaining)
        .css('color', 'red');
    }
  });

  //TODO: ensure tweets timestamp is targeting the right tweet.
  // calculate the time passed since a tweet
  let time = timeago.format(new Date());  
  $(".tweetsFooter")
  .find('span')
  .text(time) 
});
