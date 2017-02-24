/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

$(document).ready(function() {
  const $postedTweets = $('.posted-tweets');

  function createTweetElement(tweet) {

    // html escape for untrusted sources
    const usernameHTMLEsc = html`${tweet.user.name}`;
    const handleHTMLEsc = html`${tweet.user.handle}`;
    const contentHTMLEsc = html`${tweet.content.text}`;
    const $newTweet = $('<article/>').addClass('logged-tweet');
    const timeFromCreation = timeSince(tweet.createdAt);
    console.log(timeFromCreation);
    /* Cirricumlum method for creating a new tweet.
    // Adv:
    // Disadv: less readable in the html sense


    /* Alternate method for creating a new tweet. */
    // Adv: more readable in terms of structure
    // Disadv: two languages in one file

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

    for (let tweet of tweetsArr) {
      $postedTweets.prepend(createTweetElement(tweet));
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
      isValid: true,
      invalidMsg: ''
    };

    if(!userData) {
      validity.isValid = false;
      validity.invalidMsg = 'You cannot post an empty tweet.';
    } else if(userData.length > 140) {
      validity.isValid = false;
      validity.invalidMsg = 'You have reached your maximum character limit.';
    }

    return validity;
  }

  // Render the tweets on new or refreshed visit
  loadTweets();

  // Event Handlers
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();

    let tweetText = $(this).find('textarea').val();
    let validity = validateUserData(tweetText);

    if (validity.isValid) {
      $.ajax({
        data: $(this).serialize(),
        method: 'POST',
        url: '/tweets'
      }).then(function() {
        $('.tweet-form').trigger('reset');
        $('.invalid-msg').empty();
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