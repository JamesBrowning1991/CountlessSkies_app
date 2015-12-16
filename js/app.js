// Global variables
var currentPage = "";
var jsonWorking = false;
var isAnimating = false;

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
  isAnimating = true;
  $("#logo").animate({'padding-bottom': '5vh', scaleY: '0.8', scaleX: '0.8'}, 600, 'ease-in-out');
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
  $('#storyphotos-ul').fadeIn(600, function() {isAnimating = false;});
}

// Function to set up Gigs page
var setupGigsPage = function() {
  currentPage = "gigs";
  isAnimating = true;
  $("#logo").animate({'padding-bottom': '5vh', scaleY: '0.8', scaleX: '0.8'}, 600, 'ease-in-out');
  $("#button-ul").fadeOut(600, function() {
    gigsInfo();
  })
}

// Function to go from Gigs page back to Main page
var gigsPageToMainpage = function() {
  currentPage = "main";
  isAnimating = true;
  $("#logo").animate({'padding-bottom': '0', scaleY: '1', scaleX: '1'}, 600, 'ease-in-out');
  $('#gigs-table').fadeOut(600, function() {
    $("#button-ul").fadeIn(600, function(){
      $("#gigs-table").remove();});
      isAnimating = false;
    });
}

var storyPageToMainpage = function() {
  currentPage = "main";
  isAnimating = true;
  $("#logo").animate({'padding-bottom': '0', scaleY: '1', scaleX: '1'}, 600, 'ease-in-out');
  $('#storyphotos-ul').fadeOut(600, function() {
    $("#button-ul").fadeIn(600, function() {isAnimating = false;});
  });
}


// Function to get gigs info and display
var gigsInfo = function() {
  jsonWorking = true;
  $.ajax({
    url: "http://api.bandsintown.com/artists/CountlessSkies/events.json?app_id=officialCSMobileApp",
    dataType: 'jsonp',
    success: function( data ) {
      var datetimes = [];
      var dates = [];
      var times = [];
      var venueNames = [];
      var venueCitys = [];
      $.each(data, function(i, v) {
        datetimes.push(v.datetime);
        venueNames.push(v.venue.name)
        venueCitys.push(v.venue.city)
        })

      // split dates and times up
      for(i in datetimes){
        dates[i] = datetimes[i].slice(0, datetimes[i].indexOf("T"));
        times[i] = datetimes[i].slice((datetimes[i].indexOf("T"))+1);
      }

      //format date better
      for (i in dates){
        var year = dates[i].slice(0,4);
        var month = dates[i].slice(5,7);
        var day = dates[i].slice(8);
        dates[i] = (day + '/' + month + '/' + year);
      }

      //format time better
      for (i in times){
        times[i] = times[i].slice(0, -3);
      }

        $('#content').append(`
          <table id=gigs-table>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>City</th>
            </tr>
          </table`)

        for(i in datetimes) {
          var date = dates[i]
          var time = times[i]
          var venue = venueNames[i]
          var city = venueCitys[i]
          $('#content table').append(`
            <tr>
              <td>` + date + `</td>
              <td>` + time + `</td>
              <td>` + venue + `</td>
              <td>` + city + `</td>
            </tr>
          `)
        }
    },
    error: function() {
        $('#content').html("<p>No Internet Connection</p>");
    },
    complete: function() {
      jsonWorking = false;
      isAnimating = false;
    }
  })
}


// START APP
appStart();

// Handle the back button at all times
function onBackKeyDown() {
    if (isAnimating == true) {
      return false;
    }else if (currentPage === "main") {
      navigator.app.exitApp();
    }else if (currentPage === "gigs"){
      gigsPageToMainpage();
    }else if (currentPage === "story"){
      storyPageToMainpage();
    }else{
      currentPage === "story"
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
$("#website-button").live('click', function() {
  if (isAnimating == true) {
    return false;
  }else{
    var ref1 = cordova.InAppBrowser.open('http://www.countlessskies.com', '_system', 'location=yes');
  }
});

// Make facebook button work
$("#facebook-button").live('click', function() {
  if (isAnimating == true) {
    return false;
  }else{
    var ref2 = cordova.InAppBrowser.open('https://www.facebook.com/CountlessSkies', '_system', 'location=yes');
  }
});

// Make story time button work
$('#story-button').live('click', function() {
  if (isAnimating == true) {
    return false;
  }else{
    setupStoryPage();
  }
})

// Make gigs button work
$('#gigs-button').live('click', function() {
  if (isAnimating == true) {
    return false;
  }else{
    setupGigsPage();
  }
})

$('#content').live('click', function() {
  if (isAnimating == true) {
    return false;
  }else if (currentPage === "gigs"){
    gigsPageToMainpage();
  }else if (currentPage === "story"){
    storyPageToMainpage();
  }else{
    currentPage === "story"
  }
})
