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

  // Checks for invalid cases in user input and returns a boolean and message if invalid
  function validateUserData(userData) {
    const validity = {
      isValid: null,
      invalidMsg: ''
    }

    if(!userData) {
      validity.isValid = false;
      validity.invalidMsg = 'You cannot post an empty tweet.';
    } else if(userData.length > 140) {
      validity.isValid = false;
      validity.invalidMsg = 'You have reached your maximum character limit.';
    } else {
      validity.isValid = true;
    }

    return validity;
  }

  // Render the tweets on new or refreshed visit
  loadTweets();

  // Event Handlers
  $('.tweet-form').on('submit', function() {
    let tweetText = $(this).find('textarea').val();
    let validity = validateUserData(tweetText);

    event.preventDefault();

    if (validity.isValid) {
      $.ajax({
          data: $(this).serialize(),
          method: 'POST',
          url: '/tweets'
      }).then(function() {
          $('.tweet-form').trigger('reset');
          $('.invalid-msg').empty();
          $('.posted-tweets').empty();
          //TODO update counter
          loadTweets();
      }).fail(function() {
          alert('Failed to post tweet.');
      });
    } else {
      $('.invalid-msg').text(validity.invalidMsg);
    }
  });

  $('.button-compose').on('click', function() {
    $('.new-tweet').slideToggle();
    $('.tweet-form').find('textarea').focus();
  });


});