(function(){
  console.log('loaded bro!');
  $('#vote').click(startVoting);
})();

function startVoting(){
  $('.show-template').slideToggle(275).empty();
  $('.vote-template').toggle('slide');
  var meals = $.ajax({
    method: 'GET',
    url: 'get_meals',
    dataType: 'JSON',
    async: false
  }).done(function(data){
    return data;
  });
  if (meals["responseJSON"] === undefined || meals["responseJSON"].length <= 0){
    $('.vote-template').empty();
    $('.finished-voting').css('visibility', 'visible');
    console.log('done, yo');
  } else {
    var mealObject = meals["responseJSON"][0][0];
    var image = meals["responseJSON"][0][1];
    var goalName = meals["responseJSON"][0][2];
    appendMeal(mealObject, image, goalName);
  }
}


function appendMeal(meal, image, goalName){
  $('#vote-meal-pic').empty().append("<img src=" + image + "/>");
  $('#vote-meal-goalname').append('<p><p>').html("<strong>Goal Category: </strong>" + goalName);
  $('#vote-meal-comment').append('<p></p>').html("<strong>Comment: </strong>" + meal["comment"]);
  $('#vote-meal-ingredients').append('<p></p>').html("<strong>Description: </strong>" + meal["ingredients"]);
  for (var i = 1; i <= 5; i++){
    $('#rating-' + i).attr('onclick', 'addRating(' + i + ', ' + meal['id'] + ')');
  }
}

function addRating(num, mealID){
  $.ajax({
    method: 'POST',
    url: '/ratings',
    dataType: 'JSON',
    data: {
      rating: num,
      meal_id: mealID
    }
  }).done(function(data){
    $('.vote-template').toggle('slide');
    startVoting();
  });
}
