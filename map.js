google.charts.load('current', {
    packages: ['corechart']
      }).then(function () {
        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1nkYWE6fAV1PGb-YexmtkBOa8NHV4UijWh4e5lM051Q4/gviz/tq?gid=0&headers=1');
    query.send(function (response) {
      if (response.isError()) {
        console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
      };
      var dt = response.getDataTable();
      var markerJsonData = dt.toJSON();
      markerJsonData = JSON.parse(markerJsonData);
      markersData = markerJsonData.rows;
      markersFields = markerJsonData.cols;
      var rows = [];
      markersData.forEach((marker, i) =>
      {
        var rowObject = {};
        for (var j=0; j<marker.c.length; j++) {
            if (marker.c[j]) {
              rowObject[markersFields[j].label] = marker.c[j].v;
            }
            else {
              rowObject[markersFields[j].label] = "";
            }
        };
        rows.push(rowObject);
      });
      markers = rows;
      buildMap(markers);
      //resizeToolTips();
    });
  });

function buildMap (markers) {
 var map = L.map('map').setView([37.33556055149797, -121.88534082386907], 16
            );
            var myMarker  = L.marker(map.getCenter()).addTo(map);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                 maxZoom: 19,
                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            map.locate({setView: true, watch: true, maxZoom: 16});
            function onLocationFound(e) {

                marker.setLatLng(e.latlng);
                map.setView(marker.getLatLng(),map.getZoom()); 
                //alert('Marker has been set to position :'+marker.getLatLng().toString());
                //var radius = e.accuracy;

                //myMarker = L.marker(e.latlng).addTo(map)
                    //.bindPopup("You are within " + radius + " meters from this point").openPopup();

                //L.circle(e.latlng, radius).addTo(map);
            }


            map.on('locationfound', onLocationFound);

            function onLocationError(e) {
                alert(e.message);
            }

            map.on('locationerror', onLocationError);

            var marker = L.marker([37.33556055149797, -121.88534082386907], {alt:'King Library'}).bindPopup('<model-viewer src="assets/purple.glb" ar ar-scale="fixed" camera-controls touch-action="pan-y" alt="A 3D model of an astronaut" shadow-intensity="2" max-camera-orbit="auto 90deg auto" xr-environment></model-viewer>').addTo(map);


        }