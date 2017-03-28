/***********************
*
*     GLOBALS
*
************************ */


var topics = ["rage","I'm out","not funny","middle finger","face palm",
"are you serious","fail","party foul","eff my life","error"];
var addATopic = "";
var queryLimit = 10;
var apiKey = 'dc6zaTOxFJmzC';


/**************************
*
*  FUNCTION DECLARATIONS
*
***************************/

function buildButtons(newTopic){
  //console.log(newTopic);
  if (newTopic != undefined) {
    topics.unshift(newTopic);
  }
  $('#gif-buttons').html("");
  for (i=0; i<topics.length; i++) {
    var gifButton = $("<button>");
    gifButton.addClass("gif-button");
    gifButton.html(topics[i]);
    $('#gif-buttons').append(gifButton);
  }
}

function displayGifs(userParam) {
  console.log("running get gifs");
  var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+userParam+'&api_key='+apiKey+'&limit='+queryLimit;
  // query the api
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
      // api returns an object with an array of objects
      var gifResults = response.data;
      console.log("the url sent: "+queryURL);
      console.log("actual response: "+response);
      console.log("gifResults: "+gifResults);
      console.log("length of data array: "+response.data.length);

      for (var i=0; i < gifResults.length; i++) {
        var gifDiv = $('<div>');
        var imageRating = $('<p>').text("Rating: "+gifResults[i].rating);
        var newImage = $('<img>');
        newImage.addClass('gif posted-gifs');
        newImage.attr('src',gifResults[i].images.fixed_height_still.url);
        newImage.attr('value',gifResults[i].id);
        newImage.attr('data-still',gifResults[i].images.fixed_height_still.url);
        newImage.attr('data-animate',gifResults[i].images.fixed_height.url);
        newImage.attr('data-state','still');
        gifDiv.append(newImage);
        gifDiv.prepend(imageRating);
        $('#gif-display').append(gifDiv);
      }

    });

}

/***************************
*
*   RUN
*
****************************/

$(document).ready(function(){
  // generate the initial buttons
  buildButtons();
  // add user generated buttons

  // get clicks on gif search buttons and display the gifs
  $("#gif-buttons").on("click",'.gif-button',function(){
    console.log("click on gif button returns- "+$(this));
    $('#gif-display').html("");
    var gifType = $(this).html();
    console.log("the gif type on the button is: "+gifType);
    var queryParam = gifType.split(' ').join('+');
    console.log("gif type without spaces: "+queryParam);
    displayGifs(queryParam);
  });

  // Button to let user add their own gif search button
  $('#add-gif-btn').on("click",function(){
    console.log("just clicked submit button");
    event.preventDefault();
    addATopic = $('#add-gif-form').val().trim();
    buildButtons(addATopic);
    $('#add-gif-form').val("");
  });



});


