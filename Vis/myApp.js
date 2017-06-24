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
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseIncomeGrade.json";
     d3.json(file, function(error, data)
            {
                myApp.chart02 = new histograma();
                myApp.chart02.run(data);
                      
            });
    
    
    
   
}


window.onload = myApp.run;