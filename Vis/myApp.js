'use strict';

var myApp = {};

myApp.chart01 = undefined;
myApp.chart02 = undefined;
myApp.chart03 = undefined;


myApp.run = function()
{
   
    myApp.chart01 = new map();
    myApp.chart01.run();
}


window.onload = myApp.run;