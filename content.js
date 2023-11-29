// content.js

// Function to apply or remove the Comfortaa font and adjust font size based on the fontState
function applyFont(fontState) {
  if (fontState === 'comfortaa') {
    // Apply Comfortaa font by adding a class to the body
    $('body').attr('fontstate', 'comfortaa');
  } else {
    // Remove Comfortaa font by removing the class from the body
    $('body').removeAttr('fontstate');
  }
}

// Function to toggle the visibility of the .event__header element
function toggleVisibility(visibilityState) {
  if (visibilityState === 'hidden') {
    // Hide the .event__header element by adding a class
    $('.event__header').attr('visibilitystate', 'hidden');
  } else {
    // Show the .event__header element by removing the class
    $('.event__header').removeAttr('visibilitystate');
  }
}

// Function to add missing team logos and apply fontExtraBold to the winner
function addMissingTeamLogos() {
  const teamLogos = {
    'FaZe Clan': 'https://static.flashscore.com/res/image/data/l6Qwkdg5-f3O0t2tT.png',
    'Ninjas in Pyjamas': 'https://static.flashscore.com/res/image/data/j18BuEzB-KSE0hUJa.png',
    '9INE': 'https://static.flashscore.com/res/image/data/0tqgDhBr-C2aQ6Xo0.png',
    'Team Spirit': 'https://static.flashscore.com/res/image/data/QcXfQGf5-0Swx7XSF.png',
    'EDward Gaming': 'https://static.flashscore.com/res/image/data/xtnvwhh5-rgb1I9qH.png',
    'Oh My God': 'https://static.flashscore.com/res/image/data/pQSFfUXg-pGatLcF5.png',
    'LGD Gaming': 'https://static.flashscore.com/res/image/data/K2DzGSil-thpb3ffm.png',
    'LNG Esports': 'https://static.flashscore.com/res/image/data/Y9vJAmyB-Mqc5HTbN.png',
    'TT Gaming': 'https://static.flashscore.com/res/image/data/C0zbdICr-hnEFSiGQ.png',
    'JD Gaming': 'https://static.flashscore.com/res/image/data/4Aoo4weM-MLEBzXUg.png',
    'Bilibili Gaming': 'https://static.flashscore.com/res/image/data/8GDKDOdM-MLEBzXUg.png',
    'Weibo Gaming': 'https://static.flashscore.com/res/image/data/by1SS8h5-h0gdtMbg.png',
    "Anyone's Legend": 'https://static.flashscore.com/res/image/data/bZJer3Ar-h0gdtMbg.png',
    'Royal Never Give Up': 'https://static.flashscore.com/res/image/data/63vGigCr-Mqc5HTbN.png',
    'Rare Atom': 'https://static.flashscore.com/res/image/data/pY6VtOf5-hnEFSiGQ.png',
    'FunPlus Phoenix': 'https://static.flashscore.com/res/image/data/EXMI6FBr-2giVGljt.png',
    'Team WE': 'https://static.flashscore.com/res/image/data/rFWqQsgl-Mqc5HTbN.png',
    'TyLoo': 'https://static.flashscore.com/res/image/data/fJuOzPzB-OW1GzM1o.png',
    'Eternal Fire': 'https://static.flashscore.com/res/image/data/86rJaDxS-CIXl7tXD.png',
    'Sinners': 'https://static.flashscore.com/res/image/data/2TVLVEwS-Y1Bn3F8b.png',
    'Unity Esports': 'https://static.flashscore.com/res/image/data/Y1wFWPg5-OOLMfIbn.png',
    'Sampi': 'https://static.flashscore.com/res/image/data/ADZvAOzS-hYvt5nkJ.png',
    'ECLOT': 'https://static.flashscore.com/res/image/data/pIMVEPh5-C6sOg8zO.png',
    'Team Vitality': 'https://static.flashscore.com/res/image/data/C8zF3GEG-xp5fvF49.png',
    'Cloud9': 'https://static.flashscore.com/res/image/data/YyqvtcZg-QgiwK8ud.png',
    'compLexity Gaming': 'https://static.flashscore.com/res/image/data/GEFoqmwS-f3O0t2tT.png',
    'Monte': 'https://static.flashscore.com/res/image/data/OnGeejFG-8znQxvFT.png',
    'Virtus.pro': 'https://static.flashscore.com/res/image/data/0rxGJKxS-0E6BYcd0.png',
    'MIBR': 'https://static.flashscore.com/res/image/data/YZpD0GWg-zy5VjKZP.png',
    'Ultra Prime': 'https://static.flashscore.com/res/image/data/jF3mIBZA-dKCahVoJ.png'
  };

  $('.event__match:not(.event__match--scheduled)').each(function() {
    const homeScore = parseInt($(this).find('.event__score--home').text());
    const awayScore = parseInt($(this).find('.event__score--away').text());

    if (!isNaN(homeScore) && !isNaN(awayScore)) {
      const fontExtraBoldClass = 'fontExtraBold';
      const homeParticipant = $(this).find('.event__participant--home');
      const awayParticipant = $(this).find('.event__participant--away');

      // Remove fontExtraBold class from both participants
      homeParticipant.removeClass(fontExtraBoldClass); // Reset color
      awayParticipant.removeClass(fontExtraBoldClass); // Reset color

      // Check for winner or tie
      if (homeScore > awayScore) {
        homeParticipant.addClass(fontExtraBoldClass);
      } else if (homeScore < awayScore) {
        awayParticipant.addClass(fontExtraBoldClass);
      } else {
        // It's a tie, add fontExtraBold to both participants
        homeParticipant.addClass(fontExtraBoldClass);
        awayParticipant.addClass(fontExtraBoldClass);
      }
    }
  });

// Prevent clicks on logo flags
let lastClickedLogo = null;
let clickCount = 0;

// Inside the click event handler for logo flags
$('.event__match .event__logo').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  const clickedLogo = $(this);
  const matchElement = clickedLogo.closest('.event__match');
  const homeParticipant = matchElement.find('.event__participant--home');
  const awayParticipant = matchElement.find('.event__participant--away');
  const starIcon = matchElement.find('.star-ico');

  const fontExtraBoldClass = 'fontExtraBold';
  const isHomeWinner = homeParticipant.hasClass(fontExtraBoldClass);
  const isAwayWinner = awayParticipant.hasClass(fontExtraBoldClass);

  // Check if the match is scheduled
  const isScheduled = matchElement.hasClass('event__match--scheduled');

  // Bet is allowed on all matches
  if (lastClickedLogo === null || lastClickedLogo.get(0) !== clickedLogo.get(0)) {
    // First click or click on the other flag
    clickCount = 1;
    lastClickedLogo = clickedLogo;

    if (clickedLogo.hasClass('event__logo--home')) {
      homeParticipant.css('color', 'green');
      awayParticipant.css('color', 'red');
      if (!isScheduled) {
        starIcon
        .css('fill', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'))
        .css('stroke', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'))
        .css('--color-symbol-star-fill', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'))
        .css('--color-symbol-star-outline', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'));
      }
    } else if (clickedLogo.hasClass('event__logo--away')) {
      homeParticipant.css('color', 'red');
      awayParticipant.css('color', 'green');
      if (!isScheduled) {
        starIcon
        .css('fill', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'))
        .css('stroke', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'))
        .css('--color-symbol-star-fill', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'))
        .css('--color-symbol-star-outline', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'));
      }
    }
  } else {
    // Second click on the same flag
    clickCount++;

    if (clickCount % 2 === 0) {
      // Even click count, turn both yellow
      homeParticipant.css('color', 'yellow');
      awayParticipant.css('color', 'yellow');
      if (!isScheduled) {
        starIcon
        .css('fill', (isHomeWinner && isAwayWinner) ? 'green' : 'red')
        .css('stroke', (isHomeWinner && isAwayWinner) ? 'green' : 'red')
        .css('--color-symbol-star-fill', (isHomeWinner && isAwayWinner) ? 'green' : 'red')
        .css('--color-symbol-star-outline', (isHomeWinner && isAwayWinner) ? 'green' : 'red');
      }
    } else {
      // Odd click count, toggle colors
      if (clickedLogo.hasClass('event__logo--home')) {
        homeParticipant.css('color', 'green');
        awayParticipant.css('color', 'red');
        if (!isScheduled) {
          starIcon
          .css('fill', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'))
          .css('stroke', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'))
          .css('--color-symbol-star-fill', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'))
          .css('--color-symbol-star-outline', isHomeWinner && !isAwayWinner ? 'green' : (isAwayWinner ? 'red' : 'yellow'));
        }
      } else if (clickedLogo.hasClass('event__logo--away')) {
        homeParticipant.css('color', 'red');
        awayParticipant.css('color', 'green');
        if (!isScheduled) {
          starIcon
          .css('fill', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'))
          .css('stroke', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'))
          .css('--color-symbol-star-fill', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'))
          .css('--color-symbol-star-outline', isAwayWinner && !isHomeWinner ? 'green' : (isHomeWinner ? 'red' : 'yellow'));
        }
      }
    }
  }
});





  // Rest of the code for adding missing logos
  $('.event__participant').each(function() {
    const teamName = $(this).text().trim();

    if (teamLogos.hasOwnProperty(teamName)) {
      // Check if the team name is in the logo mapping
      if ($(this).prev('.event__logo').length === 0) {
        // Check if the team doesn't have a logo already
        const logoUrl = teamLogos[teamName];
        const logoImg = $('<img>').addClass('event__logo').attr('loading', 'lazy').attr('src', logoUrl);
        if ($(this).hasClass('event__participant--away')) {
          logoImg.css('grid-area', 'awayLogo'); // Add grid area for away logos
        } else {
          logoImg.css('grid-area', 'homeLogo'); // Add grid area for home logos
        }
        $(this).before(logoImg);
      }
    }
  });
}

// Observer configuration
const observerConfig = {
  childList: true, // observe direct children of the target
  subtree: true,    // observe all descendants of the target
};

// MutationObserver callback
const observerCallback = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      // Apply the font and toggle visibility whenever the DOM structure changes
      chrome.storage.sync.get(['fontState', 'visibilityState'], function (data) {
        var fontState = data.fontState || 'default';
        var visibilityState = data.visibilityState || 'visible';

        applyFont(fontState);
        toggleVisibility(visibilityState);

        // Check for teams without logo flags and add them dynamically
        addMissingTeamLogos();
      });
    }
  }
};

// Create a MutationObserver with the callback and configuration
const observer = new MutationObserver(observerCallback);

// Start observing the target node for configured mutations
observer.observe(document.body, observerConfig);

// Check the font and visibility state on page load and apply accordingly
chrome.storage.sync.get(['fontState', 'visibilityState'], function (data) {
  var fontState = data.fontState || 'default';
  var visibilityState = data.visibilityState || 'visible';

  applyFont(fontState);
  toggleVisibility(visibilityState);

  // Check for teams without logo flags and add them dynamically
  addMissingTeamLogos();
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggleFont') {
    // Apply or remove the Comfortaa font and adjust font size based on the fontState
    applyFont(request.fontState);

    // Send a response to acknowledge that the font has been toggled
    sendResponse({ success: true });
  } else if (request.action === 'toggleVisibility') {
    // Toggle the visibility of the .event__header element
    toggleVisibility(request.visibilityState);

    // Send a response to acknowledge that the visibility has been toggled
    sendResponse({ success: true });
  }
});