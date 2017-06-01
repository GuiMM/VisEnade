'use strict';


function map(){
    var myApp = this;
    var exports={};
   
    myApp.margins = {top: 10, bottom: 30, left: 25, right: 15};
    myApp.cw = 500;
    myApp.ch = 500;
    myApp.dt = [];
    myApp.medias = undefined;
    myApp.svgCon = undefined;
    myApp.svgMer = undefined;

    myApp.mapCon = undefined;
    myApp.mapMer = undefined;
    myApp.color = undefined;
    myApp.loadGeoJson = function(file)
    {
        d3.json(file, function(error, data)
        {
            myApp.dt = data.features;
            myApp.buildMapMercator();

        });
    }

    myApp.loadData = function(file)
    {
      d3.csv(file, function(d, i, columns) {
            Object.keys(d).forEach(function(key){
                if (!isNaN(+d[key])) d[key] = +d[key]
            })
            return d;
        }, function(error, data) {
        if (error) throw error;

            myApp.medias=data;        

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

        myApp.color = d3.scaleLinear().domain([0,25,35,45,55,75,100]).range(['#e6ffee','#4dff88','#00ff55','#00b33c','#006622','#003311','#000000']);
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
            .style('fill', function(d){
                for (var i = 0; i < myApp.medias.length; i++) {
                        if (d.properties.uf_05.localeCompare(myApp.medias[i].estado)==0) return myApp.color(myApp.medias[i].media);
                    };})
            .attr("d", path)
            .on('mouseover', myApp.mouseover)
            .on('mouseout', myApp.mouseout);
            //.on('click', myApp.clicked);
    }
    myApp.mouseout = function(d){
        myApp.mapMer.selectAll('path')
        .style('fill', function(d){
                for (var i = 0; i < myApp.medias.length; i++) {
                        if (d.properties.uf_05.localeCompare(myApp.medias[i].estado)==0) return myApp.color(myApp.medias[i].media);
                    };});
    }
    myApp.mouseover= function(d){
        // Highlight hovered province
        d3.select(this).style('fill', 'orange');

        console.log(d.properties.nome_uf);
        
    }
    myApp.legend =  function()
    {
        var domain =[0,25,35,45,55,75,100];
        myApp.color = d3.scaleLinear().domain([0,25,35,45,55,75,100]).range(['#e6ffee','#4dff88','#00ff55','#00b33c','#006622','#003311','#000000']);
       var legend = myApp.svgMer.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(domain)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

         legend.append("rect")
            .attr("x", myApp.cw - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", myApp.color);

         legend.append("text")
            .attr("x", myApp.cw - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
    }

    exports.run = function() 
    {        
        myApp.appendSvg("#chart01");
        myApp.appendMapGroups(); 
        
        myApp.loadData("../DataWorker/DataWorker/DataWorker/Output/StatesGrades.csv");    
        myApp.loadGeoJson("./brasil_estados.geojson");
        myApp.legend();
    }
           return exports;

};