'use strict';

var myApp = {};

myApp.margins = {top: 10, bottom: 30, left: 25, right: 15};
myApp.cw = 500;
myApp.ch = 500;
myApp.dt = [];

myApp.svgCon = undefined;
myApp.svgMer = undefined;

myApp.mapCon = undefined;
myApp.mapMer = undefined;

myApp.loadGeoJson = function(file)
{
    d3.json(file, function(error, data)
    {
        myApp.dt = data.features;
        myApp.buildMapMercator();
        
    });
}

myApp.appendSvg = function(div)
{
    
    myApp.svgMer = d3.select(div).append('svg')
        .attr('width', myApp.cw + myApp.margins.left + myApp.margins.right)
        .attr('height', myApp.ch + myApp.margins.top + myApp.margins.bottom);
}

myApp.appendMapGroups = function(svg)
{
   
    myApp.mapMer = myApp.svgMer.append('g')
        .attr('class', 'map-area')
        .attr('width', myApp.cw)
        .attr('height', myApp.ch)
        .attr('transform', 'translate('+ myApp.margins.left +','+ myApp.margins.top +')' );

}

myApp.buildMapConic = function()
{
    var projection = d3.geoConicConformal()
        .center([-55, -10])
        .scale(500)
        .translate([myApp.cw / 2, myApp.ch / 2]);

    var path = d3.geoPath()
        .projection(projection);

    myApp.mapCon.selectAll("path")
        .data(myApp.dt)
        .enter()
        .append("path")
        .attr("d", path);
}

myApp.buildMapMercator = function()
{
    
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var projection = d3.geoMercator()
        .center([-50,-15])
        .scale(550)
        .translate([myApp.cw / 2, myApp.ch / 2]);

    var path = d3.geoPath()
        .projection(projection);

    myApp.mapMer.selectAll("path")
        .data(myApp.dt)
        .enter()
        .append("path")
        .style('fill', function(d){return color(d.properties.geocodigo);})
        .attr("d", path);
}


myApp.run = function() 
{        
    myApp.appendSvg("#mainDiv");
    myApp.appendMapGroups(); 
        
    myApp.loadGeoJson("./brasil_estados.geojson");
}

window.onload = myApp.run;