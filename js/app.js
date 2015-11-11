// Function to make content of main page fade in
var mainPageSetup = function() {
  $("#logo").hide();
  $("#button-ul").hide();
  $("#logo").fadeIn(1000);
  $("#button-ul").fadeIn(1000);
}

// Function to set up Gigs page
var setupGigsPage = function() {
  $("#logo").animate({marginTop: "-=15%"}, 1000);
  $("#button-ul").animate({marginTop: "+=15%"}, {duration: 1000, queue: false});
  $("#button-ul").fadeOut(1000, function() {
    //$("h1").text("Comming soon..").hide().fadeIn(500);
    gigsInfo()
  })
};


// Function to get gigs info and display CANT GET THIS TO WORK, NEED PROXY http://www.ajax-cross-origin.com/how.html
var gigsInfo = function() {
  //var url = "http://api.bandsintown.com/artists/CountlessSkies/events.json?app_id=123"

  $.ajax({
    url: "http://api.bandsintown.com/artists/CountlessSkies/events.json?app_id=123",
    dataType: 'jsonp'
  })
    .done(function( data ) {
      if ( console && console.log ) {
        $('h1').text(JSON.stringify(data));
      }
    });
}


// fade in on startup
mainPageSetup();

// // // // THESE DON'T APPEAR TO BE DOING ANYTHING
// // // Wait for device API libraries to load
// // function onLoad() {
// document.addEventListener("deviceready", onDeviceReady, false);
// // }
//
// // Add onResume event listener
// function onDeviceReady() {
//   document.addEventListener("resume", onResume, false);
//   document.addEventListener("pause", onPause, false);
// }
// // Handle the resume event
// function onResume() {
//   mainPageSetup();
// }
//
// function onPause() {
//   $("#logo").hide();
//   $("#button-ul").hide();
// }


// Make website button work
$("#website-button").click(function() {
  var ref1 = cordova.InAppBrowser.open('http://www.countlessskies.com', '_system', 'location=yes');
});

// Make facebook button work
$("#facebook-button").click(function() {
  var ref2 = cordova.InAppBrowser.open('https://www.facebook.com/CountlessSkies', '_system', 'location=yes');
});

// Make gigs button work
$("#gigs-button").click(setupGigsPage);

// Make h1 go back to main work
$("h1").click(function() {
  $("h1").hide();
  $("#logo").animate({marginTop: "+=15%"}, 0);
  $("#button-ul").animate({marginTop: "-=15%"}, 0);
  mainPageSetup();
});
