'use strict';

var myApp = {};

myApp.chart01 = undefined;
myApp.chart02 = undefined;
myApp.chart03 = undefined;


myApp.run = function()
{
   
    myApp.chart01 = new map();
    myApp.chart01.run();
    
    
    //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseStateIncomeGrade - g1.json";
     d3.json(file, function(error, data)
            {
                myApp.chart02 = new histograma();
                myApp.chart02.run(data,"#chart02");
                      
            });
    
     //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseStateIncomeGrade - g2.json";
     d3.json(file, function(error, data)
            {
                myApp.chart03 = new histograma();
                myApp.chart03.run(data,"#chart03");
                      
            });
    
     //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/countIncome.json";
     d3.json(file, function(error, data)
            {
                myApp.chart04 = new pieChart();
                myApp.chart04.run(data,"#chart04");
                      
            });
    
   
}


window.onload = myApp.run;