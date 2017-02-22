/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  user: {
    name: "Newton",
    avatars: {
      small:   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      large:   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    handle: "@SirIsaac"
  },
  content: {
    text: "If I have seen further it is by standing on the shoulders of giants"
  },
  created_at: 1461116232227
}

$(document).ready(function() {

  function createTweetElement(tweetData) {
    const $newTweet = $('<article>').addClass('tweet');

    $newTweet.append(
      `<header>
        <img class="avatar" src="${tweetData.user.avatars.regular}">
        <h1 class="name">${tweetData.user.name}</h1>
        <span class="handle">${tweetData.user.handle}</span>
      </header>
      <p>
        ${tweetData.content.text}
      </p>
      <footer>
        <span class="date_created">${tweetData.created_at} days ago</span>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-flag"></i>
      </footer>`);
    console.log($newTweet);
    return $newTweet;
  }

  function renderTweets(tweetsArr) {

  }

  //========== TEST CODE
  let $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('.posted-tweets').append($tweet);

});