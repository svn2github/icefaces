/*
 * Copyright 2004-2012 ICEsoft Technologies Canada Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 *  gMap Widget
 */
ice.ace.gMap = function (id, cfg) {
    this.id = id;
    this.cfg = cfg;
    this.jqId = ice.ace.escapeClientId(id);
    this.jq = ice.ace.jq(this.jqId + '_gMap');
    this.stateHolder = ice.ace.jq(this.jqId + '_active');
    var _self = this;

    //Create gMap
    this.jq.gMap(this.cfg);

    if (this.cfg.dynamic && this.cfg.cache) {
        this.markAsLoaded(this.jq.children('div').get(this.cfg.active));
    }
}

var GMapRepository = new Array();


function GMapWrapper(eleId, realGMap) {
    this.eleId = eleId;
    this.realGMap = realGMap;
    this.overlays = new Object();
    this.directions = new Object();
    this.services = new Object();
    this.layers = new Object();
    this.getElementId = ice.ace.gMap.getElementId;
    this.getRealGMap = ice.ace.gMap.getRealGMap;
}
ice.ace.gMap.getElementId = function () {
    return this.eleId;
}

ice.ace.gMap.getRealGMap = function () {
    return this.realGMap;
}

ice.ace.gMap.getGMapWrapper = function (id) {
    var gmapWrapper = GMapRepository[id];
    if (gmapWrapper) {
        var gmapComp = document.getElementById(id);
        //the googlemap view must be unrendered, however
        //javascript object still exist, so recreate the googlemap
        //with its old state.
        if (!gmapComp.hasChildNodes()) {
            gmapWrapper = ice.ace.gMap.recreate(id, gmapWrapper);
        }
    } else {
        //googleMap not found create a fresh new googleMap object
        gmapWrapper = ice.ace.gMap.create(id);
    }
    return gmapWrapper;
},

    ice.ace.gMap.addMapLayer = function (ele, layerId, layerType, sentOptions, url) {
        var gmapWrapper = ice.ace.gMap.getGMapWrapper(ele);
        var layer;
        if (sentOptions == "Skip")
            var options = "";
        else
            var options = sentOptions;
        switch (layerType.toLowerCase()) {
            case "bicycling":
            case "bicyclinglayer":
            case "bicycle":
                layer = new google.maps.BicyclingLayer();
                layer.setMap(gmapWrapper.getRealGMap());
                break;
            case "fusion":
            case "fusiontable":
            case "fusiontables":
                //This is still in it's experimental stage, and I can't get access to the API to make my own fusion table yet. (Google Trusted Testers Only)
                //So I cannot verify if it works. Double check when Fusion Tables is properly released.
                var markerOps = "({" + options + "})";
                layer = new google.maps.FusionTablesLayer(eval(options));
                layer.setMap(gmapWrapper.getRealGMap());
                break;
            case "kml":
            case "kmllayer":
                var markerOps = "({" + options + "})";
                layer = new google.maps.KmlLayer(url, eval(options));
                layer.setMap(gmapWrapper.getRealGMap());
                break;
            case "traffic":
            case "trafficlayer":
                layer = new google.maps.TrafficLayer();
                layer.setMap(gmapWrapper.getRealGMap());
                break;
            case "transit":
            case "transitlayer":
                layer = new google.maps.TransitLayer();
                layer.setMap(gmapWrapper.getRealGMap());
                break;
            default:
                console.log("ERROR: Not a valid layer type");
                return;
        }//switch
        gmapWrapper.layers[layerId] = layer;

    },

    ice.ace.gMap.removeMapLayer = function (ele, layerId) {
        var gmapWrapper = ice.ace.gMap.getGMapWrapper(ele);
        var layer = gmapWrapper.layers[layerId];
        if (layer != null) {
            layer.setMap(null);
        } else {
            //nothing found just return
            return;
        }
        var newLayerArray = new Object();
        for (layerObj in gmapWrapper.layers) {
            if (layerId != layerObj) {
                newLayerArray[layerObj] = gmapWrapper.layers[layerObj];
            }
        }
        gmapWrapper.layers = newLayerArray;
    },

    ice.ace.gMap.locateAddress = function (clientId, address) {
        var map = ice.ace.gMap.getGMapWrapper(clientId).getRealGMap();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address':address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },

    ice.ace.gMap.create = function (ele, lat, lng) {
        if(lat == undefined && lng == undefined)
            var gmapWrapper = new GMapWrapper(ele, new google.maps.Map(document.getElementById(ele), {mapTypeId:google.maps.MapTypeId.ROADMAP, zoom:5, center: new google.maps.LatLng(0,0)}));
        else
            var gmapWrapper = new GMapWrapper(ele, new google.maps.Map(document.getElementById(ele), {mapTypeId:google.maps.MapTypeId.ROADMAP, zoom:5, center: new google.maps.LatLng(lat,lng)}));
        var hiddenField = document.getElementById(ele);
        var mapTypedRegistered = false;
        //google.maps.event.addListener(gmapWrapper.getRealGMap(),"center_changed",function(){});
        initializing = false;
        GMapRepository[ele] = gmapWrapper;
        return gmapWrapper;
    },

    ice.ace.gMap.recreate = function (ele, gmapWrapper) {
        ice.ace.gMap.remove(ele);
        var map = gmapWrapper.getRealGMap();
        var lat = map.getCenter().lat();
        var lng = map.getCenter().lng();
        gmapWrapper = ice.ace.gMap.create(ele, lat, lng);
        map = gmapWrapper.getRealGMap();
        return gmapWrapper;
    },

    ice.ace.gMap.remove = function (ele) {
        var newRepository = new Array();
        for (map in GMapRepository) {
            if (map != ele) {
                newRepository[map] = GMapRepository[map];
            }
            else{

                var divParent = document.getElementById(ele).parentNode;
                var styleClass = document.getElementById(ele).getAttribute('class');
                var style = document.getElementById(ele).getAttribute('style');
                document.getElementById(ele).remove();
                var div = document.createElement("div");
                div.setAttribute("class",styleClass);
                div.setAttribute("style",style);
                div.setAttribute('id',ele);
                divParent.appendChild(div);
            }
        }
        GMapRepository = newRepository;
    },

    ice.ace.gMap.addMarker = function (ele, markerID, Lat, Lon, options) {
        var wrapper = ice.ace.gMap.getGMapWrapper(ele);
        var overlay = wrapper.overlays[markerID];
        if (overlay == null || overlay.getMap() == null) {
            if (options != null)
                var markerOps = "({map:wrapper.getRealGMap(), position: new google.maps.LatLng(" + Lat + "," + Lon + "), " + options + "});";
            else
                var markerOps = "({map:wrapper.getRealGMap(), position: new google.maps.LatLng(" + Lat + "," + Lon + ")});";
            var marker = new google.maps.Marker(eval(markerOps));
            wrapper.overlays[markerID] = marker;
        }
    },

    ice.ace.gMap.removeMarker = function (ele, overlayId) {
        var gmapWrapper = ice.ace.gMap.getGMapWrapper(ele);
        var overlay = gmapWrapper.overlays[overlayId];
        if (overlay != null) {
            overlay.setMap(null);
        } else {
            //nothing found just return
            return;
        }
        var newOvrLyArray = new Object();
        for (overlayObj in gmapWrapper.overlays) {
            if (overlay != overlayObj) {
                newOvrLyArray[overlayObj] = gmapWrapper.overlays[overlayObj];
            }
        }
        gmapWrapper.overlays = newOvrLyArray;
    },

    ice.ace.gMap.animateMarker = function (ele, overlayId, animation) {
        var gmapWrapper = ice.ace.gMap.getGMapWrapper(ele);
        var marker = gmapWrapper.overlays[overlayId];
        if(animation=="none")
            marker.setOptions({animation:null});
        else if(animation.toLowerCase()=="bounce")
            marker.setOptions({animation:google.maps.Animation.BOUNCE});
        else if(animation.toLowerCase()=="drop")
            marker.setOptions({animation:google.maps.Animation.DROP});
        else
            alert("Invalid Animation Type");
    },

    ice.ace.gMap.addOptions = function (ele, options) {
        var map = ice.ace.gMap.getGMapWrapper(ele).getRealGMap();
        var fullOps = "({" + options + "})";
        map.setOptions(eval(fullOps));
    },

    ice.ace.gMap.addAutoComplete = function(mapId, inputID, submit){
        var input = document.getElementById('autocomplete_input');
        var autocomplete = new google.maps.places.Autocomplete(input);
        var map = ice.ace.gMap.getGMapWrapper(mapId).getRealGMap();
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
            if(inputID != "none" && submit != "none"){
            document.getElementById(inputID).value = place.geometry.location.toString();
            document.getElementById(submit).click();
            }
            } );
    },

    ice.ace.gMap.addControl = function (ele, name, givenPosition, style) {
        var map = ice.ace.gMap.getGMapWrapper(ele).getRealGMap();
        if (name == "all")
            map.setOptions({disableDefaultUI:false});
        else {
            control = ice.ace.gMap.nameToControl(name);
            if (givenPosition != "none" || style != "none") {
                if (givenPosition != "none" && style == "none") {
                    var position = ice.ace.gMap.textToPosition(givenPosition);
                    map.setOptions(eval("({" + control + ":true," + control + "Options:{position:" + position + "}})"));
                }
                else if (givenPosition == "none" && style != "none") {
                    var fullStyle = ice.ace.gMap.textToStyle(name, style);
                    map.setOptions(eval("({" + control + ":true," + control + "Options:{style:" + fullStyle + "}})"));
                }
                else if (givenPosition != "none" && style != "none") {
                    var position = ice.ace.gMap.textToPosition(givenPosition);
                    var fullStyle = ice.ace.gMap.textToStyle(name, style);
                    map.setOptions(eval("({" + control + ":true," + control + "Options:{position:" + position + ", style:" + fullStyle + "}})"));
                }
            }
            else
                map.setOptions(eval("({" + control + ":true})"));
        }
    },

    ice.ace.gMap.removeControl = function (ele, name) {
        var map = ice.ace.gMap.getGMapWrapper(ele).getRealGMap();
        if (name == "all")
            map.setOptions({disableDefaultUI:true});
        else {
            control = ice.ace.gMap.nameToControl(name);
            map.setOptions(eval("({" + control + ":false})"));
        }
    },

    ice.ace.gMap.nameToControl = function (name) {
        switch (name.toLowerCase()) {
            case "type":
                return "mapTypeControl";
                break;
            case "overview":
                return "overviewControl";
                break;
            case "pan":
                return "panControl";
                break;
            case "rotate":
                return "rotateControl";
                break;
            case "scale":
                return "scaleControl";
                break;
            case "streetview":
                return "streetViewControl";
                break;
            case "zoom":
                return "zoomControl";
                break;
        }
    },

    ice.ace.gMap.textToPosition = function (position) {
        switch (position.toLowerCase()) {
            case "bottomcenter":
                return "google.maps.ControlPosition.BOTTOM_CENTER";
                break;
            case "bottomright":
                return "google.maps.ControlPosition.BOTTOM_RIGHT";
                break;
            case "bottomleft":
                return "google.maps.ControlPosition.BOTTOM_LEFT";
                break;
            case "topcenter":
                return "google.maps.ControlPosition.TOP_CENTER";
                break;
            case "topright":
                return "google.maps.ControlPosition.TOP_RIGHT";
                break;
            case "topleft":
                return "google.maps.ControlPosition.TOP_CENTER";
                break;
            case "lefttop":
                return "google.maps.ControlPosition.LEFT_TOP";
                break;
            case "leftcenter":
                return "google.maps.ControlPosition.LEFT_CENTER";
                break;
            case "leftbottom":
                return "google.maps.ControlPosition.LEFT_BOTTOM";
                break;
            case "righttop":
                return "google.maps.ControlPosition.RIGHT_TOP";
                break;
            case "rightcenter":
                return "google.maps.ControlPosition.RIGHT_CENTER";
                break;
            case "rightbottom":
                return "google.maps.ControlPosition.RIGHT_BOTTOM";
                break;
        }
    },

    ice.ace.gMap.textToStyle = function (name, style) {
        if (name == "type") {
            if (style == "default")
                return "google.maps.MapTypeControlStyle.DEFAULT";
            else if (style == "dropdown")
                return "google.maps.MapTypeControlStyle.DROPDOWN_MENU";
            else if (style == "bar")
                return "google.maps.MapTypeControlStyle.HORIZONTAL_BAR";
        }
        else if (name == "zoom") {
            if (style == "default")
                return "google.maps.ZoomControlStyle.DEFAULT";
            else if (style == "large")
                return "google.maps.ZoomControlStyle.LARGE";
            else if (style == "small")
                return "google.maps.ZoomControlStyle.SMALL";
        }
    },

    ice.ace.gMap.gService = function (ele, name, locationList, options, div) {
        var wrapper = ice.ace.gMap.getGMapWrapper(ele);
        var map = ice.ace.gMap.getGMapWrapper(ele).getRealGMap();
        var service;
        var points = locationList.split(":");
        switch (name.toLowerCase()) {
            case "direction":
            case "directions":
            case "directionsservice":
                //Required options: travelMode, 2 points/addresses (First=origin, last=dest, others=waypoints
                service = new google.maps.DirectionsService();
                var origin = (points[0].charAt(0) == "(") ? "origin: new google.maps.LatLng" + points[0] + ", " : "origin: \"" + points[0] + "\", ";
                var lastElement = points.length - 1;
                var destination = (points[lastElement].charAt(0) == "(") ? "destination: new google.maps.LatLng" + points[lastElement] + ", " : "destination: \"" + points[lastElement] + "\", ";
                if (points.length >= 3) {
                    var waypoints = [];
                    for (var i = 1; i < points.length - 1; i++) {
                        var point = (points[i].charAt(0) == "(") ? "{location:new google.maps.LatLng" + points[i] + "}" : "{location:\"" + points[i] + "\"}";
                        waypoints[i - 1] = point;
                    }
                    var waypointsString = "waypoints: [" + waypoints + "], ";
                    var request = "({" + origin + destination + waypointsString + options + "})";
                } else {
                    var request = "({" + origin + destination + options + "})";
                }
            function directionsCallback(response, status) {
                if (status != google.maps.DirectionsStatus.OK) {
                    alert('Error was: ' + status);
                } else {
                    var renderer = (wrapper.services[ele] != null) ? wrapper.services[ele] : new google.maps.DirectionsRenderer();
                    renderer.setMap(map);
                    renderer.setDirections(response);
                    renderer.setPanel(document.getElementById(div));
                    wrapper.services[ele] = renderer;
                }
            }

                service.route(eval(request), directionsCallback);
                break;
            case "elevation":
            case "elevationservice":
                service = new google.maps.ElevationService();
                var waypoints = [];
                for (var i = 0; i < points.length; i++) {
                    var point = "new google.maps.LatLng" + points[i];
                    waypoints[i] = point;
                }
                var waypointsString = "locations: [" + waypoints + "]";
                var request = "({" + waypointsString + "})";

            function elevationCallback(response, status) {
                if (status != google.maps.ElevationStatus.OK) {
                    alert('Error was: ' + status);
                } else {
                    for (var i = 0; i < response.length; i++) {
                        alert(response[i].elevation);
                    }
                }
            }

                service.getElevationForLocations(eval(request), elevationCallback);
                break;
            case "maxzoom":
            case "maxzoomservice":
                service = new google.maps.MaxZoomService();
                var point = eval("new google.maps.LatLng" + points[0]);

            function maxZoomCallback(response) {
                if (response.status != google.maps.MaxZoomStatus.OK) {
                    alert('Error occurred in contacting Google servers');
                } else {
                    alert("Max zoom at point is: " + response.zoom);
                }
            }

                service.getMaxZoomAtLatLng(point, maxZoomCallback);
                break;
            case "distance":
            case "distancematrix":
            case "distancematrixservice":
                //Required options: travelMode, 2 points/addresses
                service = new google.maps.DistanceMatrixService();
                var origin = (points[0].charAt(0) == "(") ? "origins: [new google.maps.LatLng" + points[0] + "], " : "origins: [\"" + points[0] + "\"], ";
                var destination = (points[1].charAt(0) == "(") ? "destinations: [new google.maps.LatLng" + points[1] + "], " : "destinations: [\"" + points[1] + "\"], ";
                var request = "({" + origin + destination + options + "})";

            function distanceCallback(response, status) {
                if (status != google.maps.DistanceMatrixStatus.OK) {
                    alert('Error was: ' + status);
                } else {
                    alert("Distance is:" + response.rows[0].elements[0].distance.text + " in " + response.rows[0].elements[0].duration.text);
                }
            }

                service.getDistanceMatrix(eval(request), distanceCallback);
                break;
            default:
                console.log("Not a valid service name");
                return;
        }//switch
    },

    ice.ace.gMap.removeGOverlay = function (ele, overlayID) {
        var wrapper = ice.ace.gMap.getGMapWrapper(ele);
        if (wrapper.overlays[overlayID] != null) {
            wrapper.overlays[overlayID].setMap(null);
        }
    },

    ice.ace.gMap.gOverlay = function (ele, overlayID, shape, locationList, options) {
        var wrapper = ice.ace.gMap.getGMapWrapper(ele);
        var map = ice.ace.gMap.getGMapWrapper(ele).getRealGMap();
        var overlay;
        var points = locationList.split(":");
        for (var i = 0; i < points.length; i++) {
            points[i] = "new google.maps.LatLng" + points[i] + "";
        }
        switch (shape.toLowerCase()) {
            case "line":
            case "polyline":
                var overlayOptions = (options != null && options.length > 0) ? "({map:map, path:[" + points + "], " + options + "})" : "({map:map, path:[" + points + "]})";
                overlay = new google.maps.Polyline(eval(overlayOptions));
                break;
            case "polygon":
                var overlayOptions = (options != null && options.length > 0) ? "({map:map, paths:[" + points + "], " + options + "})" : "({map:map, paths:[" + points + "]})";
                overlay = new google.maps.Polygon(eval(overlayOptions));
                break;
            case "rectangle":
                //needs SW corner in first point, NE in second
                var overlayOptions = (options != null && options.length > 0) ? "({map:map, bounds:new google.maps.LatLngBounds(" + points[0] +
                    "," + points[1] + "), " + options + "})" : "({map:map, bounds:new google.maps.LatLngBounds(" + points[0] + "," + points[1] + ")})";
                overlay = new google.maps.Rectangle(eval(overlayOptions));
                break;
            case "circle":
                //Requires radius option
                var overlayOptions = (options != null && options.length > 0) ? "({map:map, center: " + points[0] + ", " + options + "})" : "({map:map, center: " + points[0] + "})";
                overlay = new google.maps.Circle(eval(overlayOptions));
                break;
            default:
                console.log("Not a valid shape");
                return;
        }//switch
        wrapper.overlays[overlayID] = overlay;
    },

    ice.ace.gMap.addGWindow = function (ele, windowId, content, position,options,markerId) {
        var wrapper = ice.ace.gMap.getGMapWrapper(ele);
        var map = ice.ace.gMap.getGMapWrapper(ele).getRealGMap();
        var window = wrapper.overlays[windowId];
        if (window != null)
            window.close();
        window = new google.maps.InfoWindow();
        window.setPosition(position);
        window.setContent(content);
        if (options != "none")
        {
            window.setOptions(eval("({" + options + "})"));
        }
        if (markerId != "none")
        {
            var marker = wrapper.overlays[markerId];
            window.open(map,marker);
        }
        else
            window.open(map);
        wrapper.overlays[windowId] = window;
    },

    ice.ace.gMap.setMapType = function (ele, type) {
        var gmapWrapper = ice.ace.gMap.getGMapWrapper(ele);
        if (type == "MAP")
            type = "ROADMAP";
        if (gmapWrapper.getRealGMap().getMapTypeId() != null) {
            switch (type) {
                case "SATELLITE":
                    gmapWrapper.getRealGMap().setMapTypeId(google.maps.MapTypeId.SATELLITE);
                    break;
                case "HYBRID":
                    gmapWrapper.getRealGMap().setMapTypeId(google.maps.MapTypeId.HYBRID);
                    break;
                case "ROADMAP":
                    gmapWrapper.getRealGMap().setMapTypeId(google.maps.MapTypeId.ROADMAP);
                    break;
                case "TERRAIN":
                    gmapWrapper.getRealGMap().setMapTypeId(google.maps.MapTypeId.TERRAIN);
                    break;
            }
        }
    }
