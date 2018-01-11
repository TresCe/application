var states = [];
var statesArray = [];
var towns = [];
var poblation = [];
var title;
var type = 1;
var update = 0;
angular.module('CENSO', [])
.controller('censoController', function($scope, $http) {
    $http.get('http://localhost:8080/allStates').
        then(function(response) {
            $scope.states = response.data;							
            states = response.data;
    		$scope.checkGraphic(0);
        });
    $http.get('http://localhost:8080/getDateOfStates').
    	then(function(response){
    		statesArray = [];
    		title = "Población por estado";
			for (i in states){
				for(o in response.data){
					if (states[i].id == response.data[o][0]) {
						var temp = [];
						temp.push(states[i].name);
						temp.push(response.data[o][3]);
						statesArray.push(temp);
					}
				}
			}
	    	$scope.checkGraphic(0);
	    	update = 1;
    	});
   $scope.getTowns = function($id){
	   $("#towns").val('0');
	   console.log($("#towns").val());
    	$http.get('http://localhost:8080/findTownsInState?id='+$id).
    		then(function(response){
    			$scope.towns = response.data;
    			if ($id == 0) {
            		title = "Población por estado";
    			} else {
    				title = "Población por municipios";
    			}
        		towns = [];
    			for(i in response.data){
    				var temp = [];
    				temp.push(response.data[i].name);
    				temp.push(response.data[i].male+response.data[i].female);
    				towns.push(temp);
    			}
    			if ($id == 0) {
        	    	$scope.checkGraphic(1);
    			} else {
    				$scope.checkGraphic(0);
    			}
    		});
    };

    $scope.getGraphic = function(item){
    	if (item != 0) {
    		$http.get('http://localhost:8080//getDateOfTowns?id='+item).
    		then(function(response){
    			title = "Población de "+ response.data[0].name;
    			poblation = [];
    			var temp = [];
    			temp.push("Hombres");
    			temp.push(response.data[0].male);
    			poblation.push(temp);
    			var temp = [];
    			temp.push("Mujeres");
    			temp.push(response.data[0].female);
    			poblation.push(temp);
    			console.log(poblation);
    	    	$scope.checkGraphic(0);
    		});
    	} else {
    		title = "Población por municipios";
    		$scope.checkGraphic(2);
    	}
    };
    
    $scope.clickColumn = function(){
    	$('#chart').empty();
    	$scope.checkGraphic(0);
    	getGraphicColumn();
    	update = 1;
    };
    
    $scope.clickPie = function(){
    	$('#chart').empty();
    	$scope.checkGraphic(0);
    	getGraphicPie();
    	update = 2;
    };
    
    $scope.clickDonut = function(){
    	$('#chart').empty();
    	$scope.checkGraphic(0);
    	getGraphicDonut();
    	update = 3;
    };
    
    $scope.checkGraphic = function($id){
    	/*
    	 * type = 1; all states
    	 * type = 2; all towns of the state
    	 * type = 3; all counts of the town
    	 */
    	if (($('#states').val() == 0 || $('#states').val() == "? undefined:undefined ?") && ($('#towns').val() == 0 || $('#towns').val() == "? undefined:undefined ?") || $id == 1){
    		type = 1;
    	} else if (($('#states').val() != 0 || $('#states').val() != "? undefined:undefined ?") && ($('#towns').val() == 0 || $('#towns').val() == "? undefined:undefined ?") || $id == 2) {
    		type = 2;
    	} else if (($('#states').val() != 0 || $('#states').val() != "? undefined:undefined ?") && ($('#towns').val() != 0 || $('#towns').val() != "? undefined:undefined ?")){
    		type = 3;
    	}
    	$scope.update();
    };
    
    $scope.update = function(){
    	if (update == 1){
    		getGraphicColumn();
    	} else if (update == 2){
    		getGraphicPie();
    	} else if (update == 3){
    		getGraphicDonut();
    	}
    };
});
function getGraphicColumn(){
	var propiedades = [];
	var graphicList = [];
	if (type == 1) {
		propiedades.push("Estado");
		graphicList = statesArray.slice();
	} else if(type == 2) {
		propiedades.push("Pueblos");
		graphicList = towns.slice();
	} else if (type == 3) {
		propiedades.push("Sexos");
		graphicList = poblation.slice();
	}
	propiedades.push("Población");
	graphicList.unshift(propiedades);

    var data = google.visualization.arrayToDataTable(graphicList);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" }]);

    var options = {
      title: title,
      bar: {groupWidth: "70%"},
      legend: { position: "none" }
    };
    
    var chart = new google.visualization.ColumnChart(document.getElementById("chart"));
    chart.draw(view, options);
}

function getGraphicPie(){
	var propiedades = [];
	var graphicList = [];
	if (type == 1) {
		propiedades.push("Estado");
		graphicList = statesArray.slice();
	} else if(type == 2) {
		propiedades.push("Pueblos");
		graphicList = towns.slice();
	} else if (type == 3) {
		propiedades.push("Sexos");
		graphicList = poblation.slice();
	}
	propiedades.push("Población");
	graphicList.unshift(propiedades);
	
	var data = google.visualization.arrayToDataTable(graphicList);

      var options = {
        title: title,
        is3D: true
      };

      var chart = new google.visualization.PieChart(document.getElementById('chart'));

      chart.draw(data, options);
}

function getGraphicDonut(){
	var propiedades = [];
	var graphicList = [];
	if (type == 1) {
		propiedades.push("Estado");
		graphicList = statesArray.slice();
	} else if(type == 2) {
		propiedades.push("Pueblos");
		graphicList = towns.slice();
	} else if (type == 3) {
		propiedades.push("Sexos");
		graphicList = poblation.slice();
	}
	propiedades.push("Población");
	graphicList.unshift(propiedades);

	var data = google.visualization.arrayToDataTable(graphicList);

      var options = {
        title: title,
        pieHole: 0.4
      };

      var chart = new google.visualization.PieChart(document.getElementById('chart'));
      chart.draw(data, options);
}