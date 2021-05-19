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
    //create article element
    const $tweet = $(`<article></article>`);

    //create child element header for article
    const $tweetHeader = $(`
      <header>
        <div>
          <img src="/images/boy.png"> 
          <span> ${tweetObj.user.name} </span>
        </div>
        <span>${tweetObj.user.handle}</span>
      </header>
    `)

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
    `)

    //append the header and content to article
    $tweet.append($tweetHeader);
    $tweet.append($content);
    return $tweet;
  };

  // Test / driver code (temporary)
  const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
