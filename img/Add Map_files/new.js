function resolveAfter5Sec() {
  return new Promise(resolve => {
    setTimeout(() => {
      initMap();
      // console.log("promise")
    }, 2000);
  });
}

async function getData() {
  console.log("get data")

  loadData()
  var result = await resolveAfter5Sec();
  console.log(result); // 10
  console.log(data)
}

let data = [];

$(document).ready(function() {
  console.log('ready! line');
  getData()
});


function loadData() {
  $.getJSON("data.json", function(places) {
    parseData(places);

  });
}

function parseData(places) {
  $.each(places, function(i) {
    data.push(places[i])
  });
  // console.log(markers)
}

function initMap() {
  console.log(data)
  var styleArray = [{
      "elementType": "labels.text",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [{
          "color": "#f5f5f2"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "transit",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.medical",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.place_of_worship",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.school",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi.sports_complex",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [{
          "visibility": "simplified"
        },
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [{
          "color": "#ffffff"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road.arterial",
      "stylers": [{
        "color": "#ffffff"
      }]
    },
    {
      "featureType": "road.local",
      "stylers": [{
        "color": "#ffffff"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "water",
      "stylers": [{
        "color": "#71c8d4"
      }]
    },
    {
      "featureType": "landscape",
      "stylers": [{
        "color": "#e5e8e7"
      }]
    },
    {
      "featureType": "poi.park",
      "stylers": [{
        "color": "#8ba129"
      }]
    },
    {
      "featureType": "road",
      "stylers": [{
        "color": "#ffffff"
      }]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "geometry",
      "stylers": [{
          "color": "#c7c7c7"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [{
        "color": "#a0d3d3"
      }]
    },
    {
      "featureType": "poi.park",
      "stylers": [{
        "color": "#91b65d"
      }]
    },
    {
      "featureType": "poi.park",
      "stylers": [{
        "gamma": 1.51
      }]
    },
    {
      "featureType": "road.local",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "on"
      }]
    },
    {
      "featureType": "poi.government",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "landscape",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "visibility": "simplified"
      }]
    },
    {
      "featureType": "road.local",
      "stylers": [{
        "visibility": "simplified"
      }]
    },
    {
      "featureType": "road"
    },
    {
      "featureType": "road"
    },
    {},
    {
      "featureType": "road.highway"
    }
  ]
  // The location of florence
  const center = {
    lat: 48.870,
    lng: 2.3266
  };
  // The map, centered at florence
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: center,
    mapTypeId: "roadmap",
    styles: styleArray
  });
  let markerArr = []
  const markers = data.forEach(k => {
    let latLng = new google.maps.LatLng(k.lat, k.lng);

    let marker = new google.maps.Marker({
      position: latLng,
      // label: k.name,
      icon: k.img,
      map: map,
      clickable: true,
      id: k.name
    });
    markerArr.push(marker)
  });
  console.log(markerArr)

  new MarkerClusterer(map, markerArr, {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });


  for (let i = 0; i < markerArr.length; i++) {
    map.addListener("center_changed", () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(() => {
        // map.panTo(markerArr[i].getPosition());
      }, 3000);
    });

    markerArr[i].addListener("click", () => {
      //display a model
      console.log(markerArr[i].id)
      disaplyModal(markerArr[i].id)
      map.setCenter(markerArr[i].getPosition());
    });
  }

}






function disaplyModal(place) {
  console.log(place)
  let currPlace = data.find(k => k.name == place)
  console.log(currPlace)
  let modal = $(`<div class="card expandedCard myCard position-absolute"  style="width: 14rem" id="hasCard" style="width: 18rem;">
  <i class="far fa-times-circle"></i>
  <img src="${currPlace.img}" class="card-img-top" alt="${data[i].name}">
  <div class="card-body">
    <h5 class="card-title">${currPlace.name}</h5>
    <p class="card-text text-muted">Arrodisments: ${currPlace.arr}</p>

    <p class="card-text"><small class="text-muted">Lat: ${currPlace.lat} | Long: ${currPlace.lng}</small></p>
    <p class="card-text">${currPlace.details}</p>
    <a href="#" class="btn myBtn" id="triggerModal">Learn More</a>
  </div>
</div>`);

  var elementExists = document.getElementById("hasCard");
  console.log(elementExists)
  if (elementExists != null) {
    elementExists.remove();
  } else
  console.log(place)
  $('#modal').append(modal)

}


$(document).on('click', '#triggerModal', function() {
  event.preventDefault();

  let bigModal = $(`<div class="myModal animate__backInUp animate mx-auto my-5 shadow-lg rounded container"><i class="far fa-times-circle"></i></div>`);
  $("#modalHere").append(bigModal);
});



$(document).on('click', '#listView', function(){
  event.preventDefault();
  console.log("list")
  for(let i=0; i < data.length; i++){
    let card = $(`
      <div class="col mb-4"><div class="card"  style="width: 14rem" style="width: 18rem;">

    <img src="${data[i].img}" class="card-img-top mx-auto" alt="${data[i].name}" style="width: 50%">
    <div class="card-body">
      <h5 class="card-title">${data[i].name}</h5>
      <p class="card-text text-muted">Arrodisments: ${data[i].arr}</p>

      <p class="card-text"><small class="text-muted">Lat: ${data[i].lat} | Long: ${data[i].lng}</small></p>
      <a href="#" class="btn myBtn" id="triggerModal">Learn More</a>
    </div>
    </div>
    </div>`);
    $("#cardGrid").append(card);
  }
})
