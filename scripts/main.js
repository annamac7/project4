// calls initMap
function resolveAfter5Sec() {
  return new Promise(resolve => {
    setTimeout(() => {
      initMap();


      // console.log("promise")
    }, 2000);
  });
}

//async get data
//calls loadData
async function getData() {
  loadData()
  var result = await resolveAfter5Sec();
}

let map;
let data = [];
let hasAppended = false;


//calls getData
$(document).ready(function() {
  // console.log('ready! line');
  getData();
  generateStars();

  $('#switch-view').on('click' , function(){
    console.log('toggle')
    $('.NKFvAb-local-context-overlapping-panel-map-layout-view--panel-container.NKFvtf-local-context-overlapping-panel-map-layout-view--layout-start').fadeToggle("slow");
    $('.maps-pin-view').fadeToggle()
  });

  // Wrap every letter in a span
  var textWrapper = document.querySelector('.ml12');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({loop: true})
    .add({
      targets: '.ml12 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    }).add({
      targets: '.ml12 .letter',
      translateX: [0,-30],
      opacity: [1,0],
      easing: "easeInExpo",
      duration: 1100,
      delay: (el, i) => 100 + 30 * i
    });

});

//loads data and saves it in data array when parse is called
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

//creates google map
function initMap() {
  // console.log(data)
  let styleArray = [
    {
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#f5f5f5" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#dadada" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [{ color: "#eeeeee" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c9c9c9" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
  ]

  // The location of florence
  const center = {
    lat: 48.870,
    lng: 2.3266
  };

  const bounds = {
    north: 48.927541,
    south: 48.788790,
    east: 2.475124,
    west: 2.186807
  }
  // map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 13.5,
  //   center: center,
  //   restrictions: {
  //     latLngBounds: bounds,
  //     strictBounds: true,
  //   },
  //   mapTypeId: "roadmap",
  //   styles: styleArray
  // });

  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: ["restaurant", "tourist_attraction"],
    maxPlaceCount: 12,
  });

  map = localContextMapView.map;
  map.setOptions({
    zoom: 13.5,
    center: center,
    mapTypeId: "roadmap",
    styles: styleArray
  });

  // localContextMapView.map.addListener('click', () => {
  //   localContextMapView.hidePlaceDetailsView();
  //   console.log('hey')
  // });


  let markerArr = [];
  const markers = data.forEach(k => {
    let latLng = new google.maps.LatLng(k.lat, k.lng);

    let icon = {
      url: k.img, // url
      scaledSize: new google.maps.Size(90, 90), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0)
    }

    let marker = new google.maps.Marker({
      position: latLng,
      icon: icon,
      map: map,
      clickable: true,
      id: k.name
    });
    markerArr.push(marker)
  });

  //makes makers
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
      markerClick(markerArr[i].id)
      map.setCenter(markerArr[i].getPosition());
    });
  }

}

//displays the card on marker click
function markerClick(place) {
  let currPlace = data.find(k => k.name == place)
  let modal = $(`<div class="card expandedCard myCard position-absolute shadow"  style="width: 14rem" id="hasCard" style="width: 18rem;">
  <a href="#"><i id="closeCard" class="far m-3 float-right fa-times-circle"></i></a>
  <img src="${currPlace.img_2}" class="card-img-top" alt="${currPlace.name}">
  <div class="card-body">
    <h5 class="card-title">${currPlace.name}</h5>
    <p class="card-text text-muted">Arrondissement: ${currPlace.arr}</p>

    <p class="card-text"><small class="text-muted">Lat: ${currPlace.lat} | Long: ${currPlace.lng}</small></p>
    <a href="#" class="myBtn btn" title="${currPlace.code}" id="triggerModal">Learn More</a>
  </div>
</div>`);

  var elementExists = document.getElementById("hasCard");
  if (elementExists != null) {
    elementExists.remove();
  } else
    $('#modal').append(modal)
}




//shows big modal
$(document).on('click', '#triggerModal', function(event) {

  event.preventDefault();
  var div = event.target;
  var divOffset = offset(div);
  console.log(divOffset.left, divOffset.top);

  let currCode = event.target.getAttribute('title');
  let position = divOffset.top - 600;

  let currPlace = data.find(k => k.code == currCode);
  // console.log(currPlace)
  let bigModal = $(`  <div class="myModal w-75 shadow-lg" style="position: absolute; top: ${position}px">
            <a href="#"><i style="color: #272643" id="closeModal" class="far fa-times-circle fa-2x float-right m-3"></i></a>
      <div class="jumbotron">

        <img src="${currPlace.img_2}" class="rounded float-left img-thumbnail m-4" alt="${currPlace.name}"/>
        <h1 class="display-4 m-4">${currPlace.name}</h1>
        <p><strong> ${currPlace.cat}</strong></p>

        <p class="text-muted" ><small>Arrondissement: ${currPlace.arr}</small></p>

        <p>${currPlace.details}</p>
      </div>
    </div>`);

  console.log(position)

  $('#modalHere').append(bigModal);
});

//closes modal
$(document).on('click', '#closeModal', function() {
  event.preventDefault();
  $('.myModal').fadeOut("fast");
})

//shows list view
$(document).on('click', '#listView', function() {
  //add an if statement so it doesnt get appended each time
  event.preventDefault();

  console.log("list");
  $('#map').css("display", "none");
  $('#switchIt').css("display", "none");
  if (hasAppended) {
    $('#cardGrid').css("display", "flex");
  } else {
    for (let i = 0; i < data.length; i++) {
      let card = $(`
      <div class="col mb-3"><div class="card hvr-bob shadow">

    <img src="${data[i].img_2}" class="card-img-top mx-auto" alt="${data[i].name}">
    <div class="card-body">
      <h5 class="card-title">${data[i].name}</h5>
      <p class="card-text text-muted">Arrodisments: ${data[i].arr}</p>

      <p class="card-text"><small class="text-muted">Lat: ${data[i].lat} | Long: ${data[i].lng}</small></p>
      <a href="#" class="btn myBtn" title="${data[i].code}" id="triggerModal">Learn More</a>
    </div>
    </div>
    </div>`);
      $("#cardGrid").append(card);
    };
  }
  hasAppended = true;
});

//toggles map view
$(document).on('click', '#mapView', function() {
  event.preventDefault();
  $('#map').css("display", "block");
  $('#switchIt').css("display", "block");

  $('#cardGrid').css("display", "none");
});

//closes marker card
$(document).on('click', '#closeCard', function() {
  event.preventDefault();
  $('.myCard').fadeOut("fast");
  $('.myCard').remove()
});


//puts the modal window in the current window view, pulled code from stack overflow
function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };

}

// inspired by https://jsfiddle.net/psullivan6/ma6e78m0/
var generateStars = function() {

  var $galaxy = $(".galaxy");
  var iterator = 0;

  while (iterator <= 100) {
    var xposition = Math.random();
    var yposition = Math.random();
    var star_type = Math.floor((Math.random() * 3) + 1);
    var position = {
      "x": $galaxy.width() * xposition,
      "y": $galaxy.height() * yposition,
    };

    $('<div class="star star-type' + star_type + '"></div>').appendTo($galaxy).css({
      "top": position.y,
      "left": position.x
    });

    iterator++;
  }

};
