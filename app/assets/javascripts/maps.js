
var debug = true;
$(document).ready(function(){
	
	$.ajaxSetup({
    async: false
	});

  var locations = [];
	
  $.getJSON("http://www.earthquakescanada.nrcan.gc.ca/api/earthquakes/latest/7d.json",function(result){
		$.each(result, function(key){ if(!(outputResult(result[key]) === undefined)) locations.push(outputResult(result[key])) });
    if(debug) console.log(locations);
	});
	
  function outputResult(data){
        if(data.hasOwnProperty("geoJSON")) {
        if(data["geoJSON"].hasOwnProperty("coordinates")) {;
    return ([data["location"]["en"], 
            data["geoJSON"]["coordinates"][0], 
            data["geoJSON"]["coordinates"][1],
            1] //data["magnitude"]  
    );
    }
  }  
  }

   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

});