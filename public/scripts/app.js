/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "<strong>This is a test</strong> $(.posted-tweets)"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]; $(document).ready(function() {

  function createTweetElement(tweet) {
    const $newTweet = $('<article>').addClass('tweet');
    // html escape for untrusted sources
    usernameHTMLEsc = html`${tweet.user.name}`;
    handleHTMLEsc = html`${tweet.user.handle}`;
    contentHTMLEsc = html`${tweet.content.text}`;

    $newTweet.append(
      `<header>
        <img class="avatar" src="${tweet.user.avatars.regular}">
        <h1 class="name">${usernameHTMLEsc}</h1>
        <span class="handle">${handleHTMLEsc}</span>
      </header>
      <p>
        ${contentHTMLEsc}
      </p>
      <footer>
        <span class="date_created">${tweet.created_at} days ago</span>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-flag"></i>
      </footer>`);

    return $newTweet;
  }

  function renderTweets(tweetsArr) {
    const $postedTweets = $('.posted-tweets');

    for (let tweet of tweetsArr) {
      $postedTweets.append(createTweetElement(tweet));
    }
  }

  // function postTweet() {
  $('.tweet-form').on('submit', function() {
    event.preventDefault();
    $.ajax( {
      data: {
        text: $(this).serialize()
      },
      method: 'POST',
      success: function(data) {
        alert('Tweet Posted!');
      },
      url: '/tweets'
    });
  });


  //========== TEST CODE
});