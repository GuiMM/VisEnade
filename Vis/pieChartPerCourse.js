    'use strict';

    function pieChartPerCourse(){
        var scope = {};
        var exports = {};
        
        scope.margins = {top: 10, bottom: 250, left: 50, right: 15};
        scope.cw = 600;
        scope.ch = 600;
        scope.radius = scope.cw / 3;
        scope.div      = undefined;
        scope.color    = undefined;    
        scope.data     = [];
        scope.currState=undefined;
        scope.arc = undefined;
        scope.labelArc = undefined;
        scope.legends = [];
        scope.rendaObject = [];
        
        scope.appendSvg = function(div)
        {
           var node = d3.select(div).append("svg")
            .attr("width", scope.cw)
            .attr("height", scope.ch)
            .append("g")
            .attr("transform", "translate(" +scope.cw / 2 + "," + scope.ch / 2 + ")");

            return node;
        }
        
        
        scope.appendChartGroup = function(svg)
        {
            var chart = svg.append('g')
                .attr('class', 'chart-area')
                .attr('width', scope.cw)
                .attr('height', scope.ch)
                .attr('transform', 'translate('+ scope.margins.left +','+ scope.margins.top +')' );

            return chart;
        }

        scope.appendPie = function(div)
        {
            scope.color = d3.scaleOrdinal(d3.schemeCategory20);
            var keys = Object.keys(scope.data[0]);
            
            var pie = d3.pie()
            .sort(null)
            .value(function(d) {  return d.count; });
            
            var g = div.selectAll(".arc")
            .data(pie(scope.rendaObject))
            .enter().append("g")
            .attr("class", "arc");

            g.append("path")
            .attr("d", scope.arc)
            .style("fill", function(d) {  return scope.color(d.data.count); })
            .on('mouseover', scope.mouseover)
            .on('mouseout', scope.mouseout);

          g.append("text")
            .attr("transform", function(d) { return "translate(" + scope.labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.data.count; });
         
        }
        
        scope.mouseout = function(d){
        
         scope.div.transition()
         .duration(500)
         .style("opacity", 0);
         
    }
    scope.mouseover= function(d){
        
        
        scope.div.transition()
         .duration(200)
         .style("opacity", .9);
       scope.div.html(d.data.renda + "<br/>" + d.data.count)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       
        
    }

       

        scope.createLabel = function(svg)
    {
        scope.arc = d3.arc()
        .outerRadius(scope.radius - 10)
        .innerRadius(0);

        scope.labelArc = d3.arc()
        .outerRadius(scope.radius - 40)
        .innerRadius(scope.radius - 40);
    }

        //método que separa as legenda de renda
        scope.separateLegend = function(item,index)
        {
            
            scope.legends.push(item.income);
              
        }
        
         //método que separa os dados por curso
        scope.separate = function(item,index)
        {
            
            if (item.course==scope.currCourse){
                scope.data.push(item.incomes);
                
            }  
            
        }
       
        
        exports.run = function(data,div,course) 
        {
            //separar por estado 
            scope.currCourse = course;
            data.forEach(scope.separate);
            
           
            //formar object: renda/count
            for(var key in scope.data[0]){
                
                var c = {'renda': key, 'count': scope.data[0][key]};
                scope.rendaObject.push(c);
                
            }
            
            console.log(scope.rendaObject);
            var svg = scope.appendSvg(div);
            var cht = scope.appendChartGroup(svg); 
            
            scope.div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
          
            scope.createLabel(svg);   
            scope.appendPie(cht);
            
            
           
        }
           return exports;

};
