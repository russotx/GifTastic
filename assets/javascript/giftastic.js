/***********************
*
*     GLOBALS
*
************************ */


var topics = ["rage","I'm out","not funny","middle finger","face palm",
"are you serious","fail","party foul","eff my life","error"];
var addATopic = "";

/**************************
*
*  FUNCTION DECLARATIONS
*
***************************/

function buildButtons(newTopic){
  console.log(newTopic);
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





/***************************
*
*   RUN
*
****************************/

$(document).ready(function(){
  buildButtons();
  $('#add-gif-btn').on("click",function(){
    addATopic = $('#add-gif-form').val().trim();
    buildButtons(addATopic);
  });




});


