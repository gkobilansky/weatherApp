/*global escape: true */
// background list
var src ={
0:"https://unsplash.it/1920/1080/?blur&image=149",
1:"https://unsplash.it/1920/1080/?blur&image=149",
2:"https://unsplash.it/1920/1080/?blur&image=149",
3:"https://unsplash.it/1920/1080/?blur&image=149",
4:"https://unsplash.it/1920/1080/?blur&image=149",
5:"https://unsplash.it/1920/1080/?blur&image=730",
6:"https://unsplash.it/1920/1080/?blur&image=730",
7:"https://unsplash.it/1920/1080/?blur&image=730",
8:"https://unsplash.it/1920/1080/?blur&image=730",
9:"https://unsplash.it/1920/1080/?blur&image=41",
10:"https://unsplash.it/1920/1080/?blur&image=41",
11:"https://unsplash.it/1920/1080/?blur&image=41",
12:"https://unsplash.it/1920/1080/?blur&image=41",
13:"https://unsplash.it/1920/1080/?blur&image=232",
14:"https://unsplash.it/1920/1080/?blur&image=232",
15:"https://unsplash.it/1920/1080/?blur&image=730",
16:"https://unsplash.it/1920/1080/?blur&image=730",
17:"https://unsplash.it/1920/1080/?blur&image=730",
18:"https://unsplash.it/1920/1080/?blur&image=730",
19:"https://unsplash.it/1920/1080/?blur&image=59",
20:"https://unsplash.it/1920/1080/?blur&image=243",
21:"https://unsplash.it/1920/1080/?blur&image=243",
22:"https://unsplash.it/1920/1080/?blur&image=243",
23:"https://unsplash.it/1920/1080/?blur&image=232",
24:"https://unsplash.it/1920/1080/?blur&image=88",
25:"https://unsplash.it/1920/1080/?blur&image=232",
26:"https://unsplash.it/1920/1080/?blur&image=38",
27:"https://unsplash.it/1920/1080/?blur&image=556",
28:"https://unsplash.it/1920/1080/?blur&image=556",
29:"https://unsplash.it/1920/1080/?blur&image=556",
30:"https://unsplash.it/1920/1080/?blur&image=38",
31:"https://unsplash.it/1920/1080/?blur&image=88",
32:"https://unsplash.it/1920/1080/?blur&image=74",
33:"https://unsplash.it/1920/1080/?blur&image=88",
34:"https://unsplash.it/1920/1080/?blur&image=74",
35:"https://unsplash.it/1920/1080/?blur&image=730",
36:"https://unsplash.it/1920/1080/?blur&image=59",
37:"https://unsplash.it/1920/1080/?blur&image=149",
38:"https://unsplash.it/1920/1080/?blur&image=149",
39:"https://unsplash.it/1920/1080/?blur&image=149",
40:"https://unsplash.it/1920/1080/?blur&image=41",
41:"https://unsplash.it/1920/1080/?blur&image=730",
42:"https://unsplash.it/1920/1080/?blur&image=730",
43:"https://unsplash.it/1920/1080/?blur&image=730",
44:"https://unsplash.it/1920/1080/?blur&image=38",
45:"https://unsplash.it/1920/1080/?blur&image=149",
46:"https://unsplash.it/1920/1080/?blur&image=730",
47:"https://unsplash.it/1920/1080/?blur&image=149",   
};

$('#weather').append('<div class="loader">Loading...</div>');
var units = 'f';
var loc = 'New York';

$(document).ready(function(){
    
//Where you at? 
if (!navigator.geolocation){          
        $('#weather').html("<p>Geolocation is not supported by your browser</p>");
        return;
  }
        
function success(position){
        $('#load').remove();
        loc = position.coords.latitude+','+position.coords.longitude;
        loadWeather(loc, units);
                                                                }
function error(){
    $('#load').remove();            
    $("#weather").html('<h2>:{ I mustache you a question - are you invisible?</h2>');
}

navigator.geolocation.getCurrentPosition(success, error);

  // units toggle
$('#units').on('click', function toggleUnits(){
    if(document.getElementById('units').innerHTML === "Imperial?") {
    	$(this).html("Metric?");
        units = 'f';
    } else {
    	$(this).html("Imperial?");
        units = 'c';
    };
loadWeather(loc, units);   
});
 
  
// twitter button	
$('#tweet').on('click', function(e){
    e.preventDefault();
    var loc = $(this).attr('href');
    var title = 'It is' + $('h2').text() + escape($(this).attr('title')); 
    window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
});  
  
});  



// Load Weather - Docs at http://simpleweatherjs.com
function loadWeather(location, units) {
  $.simpleWeather({
    location: location,
    unit: units,
    success: function(weather) {
    $('html').css("background-image", "url("+src[weather.code]+")"); 
      var html = '<div class="weather-heading"><img class="weather-image" width="125px" src="'+weather.image+'">';
       html += '<h2> '+weather.temp+'&deg;'+weather.units.temp+'</h2></div>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}