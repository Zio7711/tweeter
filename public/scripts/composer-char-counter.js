// Add a function to your file to ensure the DOM has loaded.
$(document).ready(() => {
  console.log('The DOM has loaded');

  //register an event handler to the textarea element for the form.
  $('#tweet-text').on('keyup', function() {
    const maxChar = 140;
    let typedInput = this.value;
    console.log(this);
  });
});
