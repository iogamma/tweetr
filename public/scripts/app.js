/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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

  function loadTweets() {
    $.ajax( {
      method: 'GET',
      url: '/tweets'
    }).then(function(data) {
        renderTweets(data);
    }).fail(function() {
        alert('Failed to load tweets.');
    });
  }

  // function postTweet() {
  $('.tweet-form').on('submit', function() {
    event.preventDefault();
    $.ajax( {
      data: $(this).serialize(),
      method: 'POST',
      url: '/tweets'
    }).then(function() {
        $('.tweet-form').trigger('reset');
        loadTweets();
    }).fail(function() {
        alert('Failed to post tweet.');
    });
  });



  //========== TEST CODE
  loadTweets();
});