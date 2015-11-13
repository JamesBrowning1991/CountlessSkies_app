// Global variables
var currentPage = "";
var jsonWorking = false;

// Function to make content of Main page fade in
var mainPageSetup = function() {
  currentPage = "main";
  $("#logo").hide();
  $("#button-ul").hide();
  $("#logo").fadeIn(1000);
  $("#button-ul").fadeIn(1000);
}

// Function to set up Gigs page
var setupGigsPage = function() {
  currentPage = "gigs";
  $("#logo").animate({marginTop: "-=15%"}, 1000);
  $("#button-ul").animate({marginTop: "+=15%"}, {duration: 1000, queue: false});
  $("#button-ul").fadeOut(1000, function() {
    gigsInfo();
  })
}

// Function to go from Gigs page back to Main page
var gigsPageToMainpage = function() {
  currentPage = "main";
  $("h1").text("");
  $("#logo").animate({marginTop: "+=15%"}, 1000);
  $("#button-ul").animate({marginTop: "-=15%"}, {duration: 1000, queue: false});
  $("#button-ul").fadeIn(1000);
}


// Function to get gigs info and display CANT GET THIS TO WORK, NEED PROXY http://www.ajax-cross-origin.com/how.html
var gigsInfo = function() {
  jsonWorking = true;
  $.ajax({
    url: "http://api.bandsintown.com/artists/CountlessSkies/events.json?app_id=officialCSMobileApp",
    dataType: 'jsonp'
  })
    .done(function( data ) {
      //$('h1').text(JSON.stringify(data));
      var dates = [];
      var venueNames = [];
      var venueCitys = [];
      $.each(data, function(i, v) {
        dates.push(v.datetime);
        venueNames.push(v.venue.name)
        venueCitys.push(v.venue.city)
       $('h1').text("Dates: " + dates + "  Venues: " + venueNames +
        "  Venue Citys: " + venueCitys);
      })
    })
    .fail(function() {
        $('h1').text("No Internet Connection");
    })
    .always(function() {
      jsonWorking = false;
    });
}


// START APP

// fade in on startup
mainPageSetup();

// Handle the back button on each page
function onBackKeyDown() {
  if($('#website-button').is(':animated') || $('ul').is(':animated') || jsonWorking === true) { return false; }
  else{
    if (currentPage === "main") {
      navigator.app.exitApp();
    }else if (currentPage === "gigs"){
      gigsPageToMainpage();
    }else{
      mainPageSetup();
    }
  }
}

// Handle the resume event
function onResume() {
  return null;
}

// Handle the pause event
function onPause() {
  return null;
}

// Make website button work
$("#website-button").click(function() {
  if($('#website-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  else{
    var ref1 = cordova.InAppBrowser.open('http://www.countlessskies.com', '_system', 'location=yes');
  }
});

// Make facebook button work
$("#facebook-button").click(function() {
  if($('#facebook-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  else{
    var ref2 = cordova.InAppBrowser.open('https://www.facebook.com/CountlessSkies', '_system', 'location=yes');
  }
});

// Make gigs button work
$('#gigs-button').click(function() {
  if($('#gigs-button').is(':animated') || $('#logo').is(':animated')) { return false; }
  else{
    setupGigsPage();
  }
})

// Make h1 go back to main work
$("h1").click(function() {
  gigsPageToMainpage();
});
