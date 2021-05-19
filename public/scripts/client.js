/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  //create loadTweets function that is responsible for fetching tweets from the http://localhost:8080/tweets page.
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((result) => {
        renderTweets(result);
      })
      .catch((error) => console.log(error));
  };

  //call function to show the exsisting tweets
  loadTweets();

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

    //create child element content for article
    const $content = $(`
    <div>
      <h2>${tweetObj.content.text}</h2>
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
      $('#tweets-container').append($tweet);
    }
  };

  //Add an Event Listener and Prevent the Default Behaviour
  $('#newTweetForm').submit(function (event) {
    event.preventDefault();
    let formData = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: formData })
      .then(() => {
        $('#tweets-container').empty()
        loadTweets();
      })
      .catch((error) => console.log(error));
  });
});
