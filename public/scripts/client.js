/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

$(document).ready(() => {

  // create a function that returns a tweet element
  const createTweetElement = (tweetObj) => {
    const $tweet = $(`<article class="tweet">Hello world</article>`);
    const $header = $(`
      <header>
        <div>
          <img src="/images/boy.png"> 
          <span> ${tweetObj.user.name} </span>
        </div>
        <span>${tweetObj.user.handle}</span>
      </header>
    `)

    const $content = $(`
    <div>
      <h2>${tweetObj.content.text}</h2>
      <div class="tweetsFooter">
        <span>10 days ago</span>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>

      </div>
    </div>
    `)

    $tweet.append($header);
    $tweet.append($content);
    return $tweet
  };

  // Test / driver code (temporary)
  const $tweet = createTweetElement(tweetData);
  console.log('tweet', $tweet); // to see what it looks like
  console.log('tweets-container', $('#tweets-container')); 
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
