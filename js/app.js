// Global variables
var currentPage = "";
var jsonWorking = false;

// Function to generate template html
var appStart = function() {
  $("#entire-page").html(`
      <header id="header">
        <img id="logo" src="" alt="Countless Skies logo">
      </header>
      <div id="content">
        <ul id="button-ul"></ul> <!-- header is populated with gig info in mainPageSetup -->
        <ul id="storyphotos-ul"></ul> <!-- header is populated with band photos info setupStoryPage -->
        <p id="test-p"></p> <!-- test-p is used for test purposes only -->
      </div>`);
  mainPageSetup();
}


// Function to make content of Main page fade in
var mainPageSetup = function() {
  currentPage = "main";
  $("#logo").hide();
  $("#button-ul").hide();
  $("#storyphotos-ul").hide();
  $("#logo").attr("src", "images/index/logo.png");
  $('#button-ul').html(`
    <div id="website-button">
      <a class="buttons">Website</a>
    </div>
    <div id="facebook-button">
      <a class="buttons">Facebook</a>
    </div><div id="story-button">
      <a class="buttons">Story Time</a>
    </div>
    <div id="gigs-button">
      <a class="buttons">Gigs</a>
    </div>`);
  $("#logo").fadeIn(1000);
  $("#button-ul").fadeIn(1000);
}

// Funcation to set up Story Time page
var setupStoryPage = function () {
  currentPage = "story";
  $("#logo").animate({'padding-bottom': "8vh"}, 600, 'ease-in-out');
  $("#button-ul").fadeOut(600);
  $('#storyphotos-ul').html(`
  <div class="band-images">
    <img src="images/storytime/ross1_cropped.jpg" alt="Ross">
    <p>Rose King<p>
  </div>
  <div class="band-images">
    <img src="images/storytime/pratt2_cropped.jpg" alt="Pratt">
    <p>James Pratt<p>
  </div>
  <div class="band-images">
    <img src="images/storytime/phil2_cropped.jpg" alt="Phil">
    <p>Phil Romeo<p>
  </div>
  <div class="band-images">
    <img src="images/storytime/nathan1_cropped.jpg" alt="Nathix">
    <p>Nathan Rob<p>
  </div>`);
  // $("#storyphotos-ul").animate({marginTop: "+=15%"}, {duration: 1000, queue: false});
  $('#storyphotos-ul').fadeIn(600);
}

// Function to set up Gigs page
var setupGigsPage = function() {
  currentPage = "gigs";
  $("#logo").animate({'padding-bottom': "8vh"}, 600, 'ease-in-out');
  // $("#button-ul").animate({marginTop: "+=15%"}, {duration: 1000, queue: false});
  $("#button-ul").fadeOut(600, function() {
    gigsInfo();
  })
}

// Function to go from Gigs page back to Main page
var gigsPageToMainpage = function() {
  currentPage = "main";
  $("#test-p").text("");
  $("#logo").animate({'padding-bottom': "5vh"}, 600, 'ease-in-out');
  // $("#button-ul").animate({marginTop: "-=15%"}, {duration: 1000, queue: false});
  $("#button-ul").fadeIn(600);
}

var storyPageToMainpage = function() {
  currentPage = "main";
  $("#logo").animate({'padding-bottom': "5vh"}, 600, 'ease-in-out');
  // $("#storyphotos-ul").animate({marginTop: "-=15%"}, {duration: 1000, queue: false});
  $('#storyphotos-ul').fadeOut(600);
  // $("#button-ul").animate({marginTop: "-=15%"}, {duration: 1000, queue: false});
  $("#button-ul").fadeIn(600);
}


// Function to get gigs info and display
var gigsInfo = function() {
  jsonWorking = true;
  $.ajax({
    url: "http://api.bandsintown.com/artists/CountlessSkies/events.json?app_id=officialCSMobileApp",
    dataType: 'jsonp',
    success: function( data ) {
      var dates = [];
      var venueNames = [];
      var venueCitys = [];
      $.each(data, function(i, v) {
        dates.push(v.datetime);
        venueNames.push(v.venue.name)
        venueCitys.push(v.venue.city)
       $('#test-p').text("Dates: " + dates + "  Venues: " + venueNames +
        "  Venue Citys: " + venueCitys);
      })
    },
    error: function() {
        $('#test-p').text("No Internet Connection");
    },
    complete: function() {
      jsonWorking = false;
    }
  })
    // .success(function( data ) {
    //   var dates = [];
    //   var venueNames = [];
    //   var venueCitys = [];
    //   $.each(data, function(i, v) {
    //     dates.push(v.datetime);
    //     venueNames.push(v.venue.name)
    //     venueCitys.push(v.venue.city)
    //    $('#test-p').text("Dates: " + dates + "  Venues: " + venueNames +
    //     "  Venue Citys: " + venueCitys);
    //   })
    // })
    // .error(function() {
    //     $('#test-p').text("No Internet Connection");
    // })
    // .complete(function() {
    //   jsonWorking = false;
    // });
}


// START APP
appStart();

// Handle the back button on each page
function onBackKeyDown() {
  // if($('#website-button').is(':animated') || $('ul').is(':animated') || jsonWorking === true) { return false; }
  // else{
    if (currentPage === "main") {
      navigator.app.exitApp();
    }else if (currentPage === "gigs"){
      gigsPageToMainpage();
    }else if (currentPage === "story"){
      storyPageToMainpage();
    }else{
      currentPage === "story"
    }
  // }
}

// Handle the resume event
function onResume() {
  $('#test-p').text("RESUMED");
}

// Handle the pause event
function onPause() {
  return null;
}

// Make website button work
$("#website-button").live('click', function() {
  // if($('#website-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  // else{
    var ref1 = cordova.InAppBrowser.open('http://www.countlessskies.com', '_system', 'location=yes');
  // }
});

// Make facebook button work
$("#facebook-button").live('click', function() {
  // if($('#facebook-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  // else{
    var ref2 = cordova.InAppBrowser.open('https://www.facebook.com/CountlessSkies', '_system', 'location=yes');
  // }
});

// Make story time button work
$('#story-button').live('click', function() {
  // if($('#story-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  // else{
    setupStoryPage();
  // }
})

// Make gigs button work
$('#gigs-button').live('click', function() {
  // if($('#gigs-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  // else{
    setupGigsPage();
  // }
})

// Make #test-p go back to main work
$("#test-p").click(function() {
  gigsPageToMainpage();
});
