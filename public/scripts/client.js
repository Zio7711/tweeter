/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  //create loadTweets function that is responsible for fetching tweets from the http://localhost:8080/tweets page.
  const loadTweets = (getAll) => {
    $.ajax('/tweets', { method: 'GET' })
      .then((result) => {
        if (getAll) {
          renderTweets(result);
        } else {
          renderLastTweet(result);
        }
      })
      .catch((error) => console.log(error));
  };

  //call function to show the exsisting tweets
  loadTweets(true);

  // create a function that returns a tweet element
  const createTweetElement = (tweetObj) => {
    //create article element
    const $tweet = $(`<article></article>`);

    //create child element header for article
    const $tweetHeader = $(`
      <header>
        <div>
          <img src="${tweetObj.user.avatars}"> 
          <span> ${tweetObj.user.name} </span>
        </div>
        <span>${tweetObj.user.handle}</span>
      </header>
    `);

    //calculate the time passed since tweeted
    let time = timeago.format(tweetObj['created_at']);


    //create an escape funtion to avoid xss
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //create child element content for article
    const $content = $(`
    <div>
      <h2 class="contentBreak">${escape(tweetObj.content.text)}</h2>
      <div class="tweetsFooter">
        <span>${time}</span>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </div>
    `);

    //append the header and content to article
    $tweet.append($tweetHeader);
    $tweet.append($content);
    return $tweet;
  };

  //create a  function that can be responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.
  const renderTweets = (tweetsArr) => {
    //loop through each tweets inside of the array

    for (const eachTweet of tweetsArr) {
      //invoke the function and append each article into the html
      let $tweet = createTweetElement(eachTweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  //only render the very lattest tweet
  const renderLastTweet = (tweetsArr) => {
    let $tweet = createTweetElement(tweetsArr[tweetsArr.length - 1]);
    $('#tweets-container').prepend($tweet);
  };

  //Add an Event Listener and Prevent the Default Behaviour
  $('#newTweetForm').submit(function (event) {
    event.preventDefault();

    //edge case: disallow form submission in the event that the tweet area is empty, or exceeds the 140 character limit.
    const remainingNum = $('.counter')[0].value;
    if (remainingNum < 0) {
      $('.errorMsg')
        .text('TOO Long!!! make it concise!!!')
        .slideDown(1000)
        .delay(2000)
        .fadeOut(1)
    } else if (remainingNum === '140' || !this[0].value.split("\n").join("")) {
      $('.errorMsg')
        .text('Yo!!! Type somthing!!!')
        .slideDown(1000)
        .delay(2000)
        .fadeOut(1)
    } else {
      let formData = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data: formData })
        .then(() => {
          $('textarea').val('');
          $('.counter').text(140);
          loadTweets();
        })
        .catch((error) => console.log(error));
    }
  });

});
