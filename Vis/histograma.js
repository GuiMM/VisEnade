    'use strict';

    function histograma(){
        var scope = {};
        var exports = {};
        
        scope.margins = {top: 10, bottom: 250, left: 50, right: 15};
        scope.cw = 600;
        scope.ch = 500;
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
        scope.zScale    = undefined;    
        scope.data     = [];
        scope.currState=undefined;
        scope.yAxisGroup = undefined;
        scope.zoom = undefined;
        scope.appendSvg = function(div)
        {
            var node = d3.select(div).append('svg')
                .attr('width', scope.cw + scope.margins.left + scope.margins.right)
                .attr('height', scope.ch + scope.margins.top + scope.margins.bottom);
                

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

        scope.appendRects = function(div)
        {
             var arr = scope.data;
            var keys = Object.keys(scope.data[0].incomes);
            
         scope.rect = div.append("g")
            .selectAll("g")
            .data(arr)
            .enter().append("g")
            .attr("transform", function(d) { return "translate(" + scope.xScale0(d.course) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d.incomes[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return scope.xScale1(d.key); })
            .attr("y", function(d) { return scope.yScale(d.value); })
            .attr("width", scope.xScale1.bandwidth())
            .attr("height", function(d) { if(scope.yScale(d.value)==scope.ch)return 0;    return scope.ch -scope.margins.top - scope.yScale(d.value); })
            .attr("fill", function(d) { return scope.zScale(d.key); });

         
        }

        scope.createAxes = function(svg)
        {   
            var keys = Object.keys(scope.data[0].incomes);
            scope.xScale0 = d3.scaleBand()
                .rangeRound([0, scope.cw])
                .paddingInner(0.1)
                .domain(scope.data.map(function(d) { return d.course; }));
            scope.xScale1 = d3.scaleBand()
                .padding(0.05)
                .domain(["a","b","c","d","e","f","g","naoInformado"])
                .rangeRound([0, scope.xScale0.bandwidth()]);
            scope.yScale = d3.scaleLinear()
                .rangeRound([scope.ch, 0]) //0 - 500   100 - 0
                .domain([0, d3.max(scope.data, function(d) { return d3.max(keys, function(key) { return d.incomes[key]; }); })]).nice();
             scope.zScale = d3.scaleOrdinal(d3.schemeCategory20);

            scope.xAxis = svg.append("g")
                .attr('class', 'xAxis')
                .attr('transform', 'translate('+ scope.margins.left +','+ scope.ch + ')')
                .call(d3.axisBottom(scope.xScale0).ticks(10))
                .selectAll("text")	
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
                
            scope.yAxis = d3.axisLeft(scope.yScale);
            
            scope.yAxisGroup = svg.append('g')
            .attr('class', 'yAxis')
            .attr('transform', 'translate('+ scope.margins.left +','+ scope.margins.top +')')
            .call(scope.yAxis);
           
            
            
            
        }
        scope.addZoom = function(svg)
        {
            function zoomed()
            {
                var t = d3.event.transform;
        
                var nScaleX = t.rescaleX(scope.xScale0);
                scope.xAxis.scale(nScaleX);
                
                var xAxisGroup = svg.select('.xAxis');
                xAxisGroup.call(scope.xAxis);

                svg.select('.chart-area')
                .selectAll('rect')
                .attr("x", function(d) { return scope.xScale1(d.key); });
            }
    
            scope.zoom = d3.zoom()
            .on("zoom", zoomed);

            svg.append("rect")
            .attr("class", "zoom")
            .attr("width", scope.cw)
            .attr("height", scope.margins.bottom)
            .attr('transform', 'translate('+ scope.margins.left +','+ (scope.ch+scope.margins.top) +')')
            .call(scope.zoom);   
        }

        scope.createLabel = function(svg)
    {
        var labelY = svg.append('g')
            .attr('class', 'yAxis')
            .append('text') // y-axis Label
            .attr('class','label')
            .attr('transform','translate('+ scope.margins.left +','+ scope.margins.top +')' + 'rotate(-90)')
            .attr('x',0)
            .attr('y',5)
            .attr('dy','.71em')
            .style('text-anchor','end')
            .text(scope.labelY)

        var labelX = svg.append('g')
            .attr('class', 'xAxis')
            .attr('transform', 'translate('+ scope.margins.left +','+ (scope.ch+scope.margins.top+scope.margins.bottom) +')')
            .append('text') // x-axis Label
            .attr('class','label')
            .attr("x", scope.cw/2 )
            .style("text-anchor", "middle")
            .text(scope.labelX);
    }

    scope.appendLegenda = function(svg, keys){
         var legend = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

         legend.append("rect")
            .attr("x", scope.cw - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", scope.zScale);

         legend.append("text")
            .attr("x", scope.cw - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
     }
        //método que separa os dados por estado
        scope.separate = function(item,index)
        {
            
            if (item.state==scope.currState){
                scope.data.push(item);
                
            }  
            
        }

        exports.run = function(data,div) 
        {
            //apenas testando para um estado qualquer
            //scope.currState = "MT";
            scope.data = data;
            
            //data.forEach(scope.separate);
            
            
            var svg = scope.appendSvg(div);
            var cht = scope.appendChartGroup(svg); 
            var keys = Object.keys(scope.data[0].incomes);
           
            scope.createAxes(svg); 
            scope.createLabel(svg);   
            scope.appendRects(cht);
            scope.appendLegenda(cht, keys);
           
        }
           return exports;

};
