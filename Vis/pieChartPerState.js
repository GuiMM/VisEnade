    'use strict';

    function pieChartPerState(){
        var scope = {};
        var exports = {};
        
        scope.margins = {top: 10, bottom: 250, left: 50, right: 15};
        scope.cw = 600;
        scope.ch = 500;
        scope.radius = 500 / 2;
        scope.labelX = undefined;
        scope.labelY = undefined;
        scope.ticks = undefined;
        scope.rect = undefined;
        scope.div      = undefined;
        scope.auxScale = undefined;
        scope.xScale0  = undefined;
        scope.xScale1  = undefined;
        scope.yScale   = undefined;
        scope.xAxis    = undefined;
        scope.yAxis    = undefined;
        scope.color    = undefined;    
        scope.data     = [];
        scope.currState=undefined;
        scope.yAxisGroup = undefined;
        scope.arc = undefined;
        scope.labelArc = undefined;
        scope.legends = [];
        
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
            
            
            var pie = d3.pie()
            .sort(null)
            .value(function(d) {  return d; });
            
            var g = div.selectAll(".arc")
            .data(pie(scope.data))
            .enter().append("g")
            .attr("class", "arc");

            g.append("path")
            .attr("d", scope.arc)
            .style("fill", function(d) {  return scope.color(d.value); });

          g.append("text")
            .attr("transform", function(d) { return "translate(" + scope.labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.value; });
         
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

    scope.appendLegenda = function(svg){
         var legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(scope.legends.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

         legend.append("rect")
            .attr("x", scope.cw - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", scope.color);

         legend.append("text")
            .attr("x", scope.cw - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
     }
        //método que separa as legenda de renda
        scope.separateLegend = function(item,index)
        {
            
            scope.legends.push(item.income);
              
        }
        
         //método que separa os dados por estado
        scope.separate = function(item,index)
        {
            
            if (item.state==scope.currState){
                scope.data.push(item.incomes);
                
            }  
            
        }
       
        
        exports.run = function(data,div,state) 
        {
             
                scope.currState = state;
                data.forEach(scope.separate);
            
           
            //scope.data = data;
            //scope.data.forEach(scope.separateLegend);
            
            var svg = scope.appendSvg(div);
            var cht = scope.appendChartGroup(svg); 
            
          
            scope.createLabel(svg);   
            scope.appendPie(cht);
            
            scope.appendLegenda(cht);
           
        }
           return exports;

};
