/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const $postedTweets = $('.posted-tweets');

  function createTweetElement(tweet) {

    // html escape for untrusted sources
    const usernameHTMLEsc = html`${tweet.user.name}`;
    const handleHTMLEsc = html`${tweet.user.handle}`;
    const contentHTMLEsc = html`${tweet.content.text}`;
    const $newTweet = $('<article/>').addClass('logged-tweet');
    // sudo apt-get install ntp
    const timeFromCreation = timeSince(tweet.createdAt);

    $newTweet.append(
      `<header class="header">
          <img class="avatar" src="${tweet.user.avatars.regular}">
          <h1 class="username">${usernameHTMLEsc}</h1>
          <span class="handle">${handleHTMLEsc}</span>
        </header>
        <p class="user-content">
          ${contentHTMLEsc}
        </p>
        <footer class="footer">
          <span class="date-created">${timeFromCreation} ago</span>
          <i class="fa fa-heart" ></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-flag"></i>
        </footer>`);

    return $newTweet;
  }

  function renderTweets(tweetsArr) {
    $postedTweets.empty();
    tweetsArr.map((tweet) => {
      $postedTweets.prepend(createTweetElement(tweet));
    });
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

  // Checks for invalid cases in user input and returns an array of invalid messages
  function validateUserData(userInput) {
    const invalidMsgs = [];

    spaceEscInput = userInput.replace(/\s/g, '');

    if(!spaceEscInput) {
      invalidMsgs.push('You cannot post an empty tweet.');
    }
    if(userInput.length > 140) {
      invalidMsgs.push('You have reached your maximum character limit.');
    }

    return invalidMsgs;
  }

  // Render the tweets on new or refreshed visit
  loadTweets();

  // Event Handlers
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();

    const tweetText = $(this).find('textarea').val();
    const invalidMsgs = validateUserData(tweetText);

    if (invalidMsgs.length) {
      $('.invalid-msg').empty();
      $('.invalid-msg').text(() => {
        for (const msg of invalidMsgs) {
          $('.invalid-msg').append(`<li>${msg}</li>`);
        }
      });
    } else {
      $.ajax({
        data: $(this).serialize(),
        method: 'POST',
        url: '/tweets'
      }).then(function() {
        $('.tweet-form').trigger('reset');
        $('.invalid-msg').empty();
        $('.counter').text('140');
        loadTweets();
      }).fail(function() {
        alert('Failed to post tweet.');
      });
    }
  });

  $('.button-compose').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.tweet-form').find('textarea').focus();
  });

});