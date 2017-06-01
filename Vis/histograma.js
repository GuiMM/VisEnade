    'use strict';

    function histograma(){
        var scope = {};
        var exports = {};
        
        scope.margins = {top: 10, bottom: 30, left: 25, right: 15};
        scope.cw = 500;
        scope.ch = 500;
        scope.labelX = undefined;
        scope.labelY = undefined;
        scope.ticks = undefined;
        
        scope.div      = undefined;
        scope.auxScale = undefined;
        scope.xScale0  = undefined;
        scope.xScale1  = undefined;
        scope.yScale   = undefined;
        scope.xAxis    = undefined;
        scope.yAxis    = undefined;
        scope.zScale    = undefined;    
        scope.data     = undefined;

        scope.appendSvg = function(div)
        {
            var node = d3.select(div).append('svg')
                .attr('width', scope.cw + scope.margins.left + scope.margins.right)
                .attr('height', scope.ch + scope.margins.top + scope.margins.bottom);

            return node;
        }
        
        scope.loadData = function(file)
        {
            d3.tsv(file, function(d, i, columns) {
            Object.keys(d).forEach(function(key){
                if (!isNaN(+d[key])) d[key] = +d[key]
            })
            return d;
            }, function(error, data) {
                if (error) throw error;

                scope.data=data;        
       
            });

}
        scope.appendChartGroup = function(svg)
        {
            var chart = svg.append('g')
                .attr('width', scope.cw)
                .attr('height', scope.ch)
                .attr('transform', 'translate('+ scope.margins.left +','+ scope.margins.top +')' );

            return chart;
        }

        scope.appendRects = function(div,keys)
        {
             var arr = scope.data;

         var rect = div.append("g")
            .selectAll("g")
            .data(arr)
            .enter().append("g")
            .attr("transform", function(d) { return "translate(" + scope.xScale0(d.contry) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { console.log(d.key);return scope.xScale1(d.key); })
            .attr("y", function(d) { console.log(d.value); return scope.yScale(d.value); })
            .attr("width", scope.xScale1.bandwidth())
            .attr("height", function(d) { return scope.ch -scope.margins.top - scope.yScale(d.value); })
            .attr("fill", function(d) { return scope.zScale(d.key); });

         return rect;
        }

        scope.createAxes = function(svg, keys)
        {   

            scope.xScale0 = d3.scaleBand()
                .rangeRound([0, scope.cw])
                .paddingInner(0.1)
                .domain(scope.data.map(function(d) { return d.contry; }));
            scope.xScale1 = d3.scaleBand()
                .padding(0.05)
                .domain(keys)
                .rangeRound([0, scope.xScale0.bandwidth()]);
            scope.yScale = d3.scaleLinear()
                .rangeRound([scope.ch, 0])
                .domain([0, d3.max(scope.data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
             scope.zScale = d3.scaleOrdinal(d3.schemeCategory20);

            svg.append("g")
                .attr('class', 'xAxis')
                .attr('transform', 'translate('+ scope.margins.left +','+ scope.ch + ')')
                .call(d3.axisBottom(scope.xScale0));

            var yAxisGroup = svg.append('g')
            .attr('class', 'yAxis')
            .attr('transform', 'translate('+ scope.margins.left +','+ scope.margins.top +')');

        
            scope.yAxis = d3.axisLeft(scope.yScale);

       
            yAxisGroup.call(scope.yAxis);    
            // svg.append('g')
            //     .attr('class', 'yAxis')
            //     .call(d3.axisLeft(scope.yScale).ticks(null, "s"))
            //     .attr("x", 2)
            //     .attr("y", scope.yScale(scope.yScale.ticks().pop()) + 0.5)
            //     .attr("dy", "0.32em")
            //     .attr("fill", "#000")
            //     .attr("font-weight", "bold")
            //     .attr("text-anchor", "start");

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

        exports.run = function() 
        {
          
            scope.loadData("../DataWorker/DataWorker/DataWorker/Output/CourseIncomeGrades.tsv");
            //var keys = scope.data.columns.slice(1);
            //var svg = scope.appendSvg("#chart02");
            //var cht = scope.appendChartGroup(svg); 

            //scope.createAxes(svg, keys); 
            //scope.createLabel(svg);   
            //scope.appendRects(cht,keys);
            //scope.appendLegenda(cht, keys);
           
        }
           return exports;

};
