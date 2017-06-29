'use strict';

var myApp = {};

myApp.chart01 = undefined;
myApp.chart02 = undefined;
myApp.chart03 = undefined;

myApp.geraHistograma = function(state)
{
     var file = "../DataWorker/DataWorker/DataWorker/Output/courseStateIncomeGrade - g1.json";
     d3.json(file, function(error, data)
            {       
                myApp.chart02 = undefined;
                myApp.chart02 = new histograma();
                myApp.chart02.run(data,"#chart02",state);
                      
            });
    
     //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseStateIncomeGrade - g2.json";
     d3.json(file, function(error, data)
            {
                myApp.chart03 = undefined;
                myApp.chart03 = new histograma();
                myApp.chart03.run(data,"#chart03",state);
                      
            });
    
}
myApp.geraGraficosPorCurso = function()
{
    var curso = document.getElementById("mySelect")
    document.getElementById("chart02").innerHTML = "";
    document.getElementById("chart03").innerHTML = "";
    document.getElementById("chart04").innerHTML = "";
    
    if (curso.options[curso.selectedIndex].text=="TODOS")
        window.location.reload(false);
    
      //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/CourseIncomeCount.json";
     d3.json(file, function(error, data)
            {
                myApp.chart02 = new pieChartPerCourse();
                myApp.chart02.run(data,"#chart02",curso.options[curso.selectedIndex].text);
                      
            });
    
     //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseStateIncomeGrade.json";
     d3.json(file, function(error, data)
            {
                myApp.chart04 = new histogramaCurso();
                myApp.chart04.run(data,"#chart04",curso.options[curso.selectedIndex].text);
                      
            });
}
myApp.run = function()
{
   
    myApp.chart01 = new map();
    myApp.chart01.run();
    
     //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/countIncome.json";
     d3.json(file, function(error, data)
            {
                myApp.chart02 = new pieChart();
                myApp.chart02.run(data,"#chart02");
                      
            });
    
    //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseIncomeGrade - g1.json";
     d3.json(file, function(error, data)
            {
                myApp.chart03 = new histograma();
                myApp.chart03.run(data,"#chart03","");
                      
            });
    
     //loading data
    var file = "../DataWorker/DataWorker/DataWorker/Output/courseIncomeGrade - g2.json";
     d3.json(file, function(error, data)
            {
                myApp.chart04 = new histograma();
                myApp.chart04.run(data,"#chart04","");
                      
            });
    
   
    
     
   
}


window.onload = myApp.run;