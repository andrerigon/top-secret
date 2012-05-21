Raphael.fn.percentageArc = function (x,y, radius, value) {
  var angle = 0;
  var endAngle = (value*180)/100;
  var path = "";
  var clockwise = 1;
  var translate = Math.PI;
  
  var cx = 0;
  var cy = 0;
    
  while(angle <= endAngle) {
        
    var radians= (angle/180) * Math.PI + translate;
    cx = x + Math.cos(radians) * radius;
    cy = y + Math.sin(radians) * radius * clockwise;
    
    path += (angle === 0) ? "M" : "L";
    path += [cx,cy];
    angle += 1;
 }  
  return this.path(path);
};

function percentageGraph( element, radius, x, y, perc, perc_params, params ){

var canvas = Raphael(element, 230, 120);

canvas.percentageArc(x,y, 45, 100).attr({ stroke : "white", "stroke-width" : 91 });

canvas.percentageArc(x,y, radius, 100).attr({ stroke : "white", "stroke-width" : 27 });

canvas.percentageArc(x,y, radius, 100).attr(params);   

canvas.percentageArc(x,y, radius, perc+1 ).attr({ stroke : "white", "stroke-width" : 23 });    
    
canvas.percentageArc(x,y, radius, perc).attr(perc_params);
   
    
var Font = {'text-anchor':'middle', 'font-size': 25, 'font-family' : 'helvetica', 'fill': '#F79518'};

//canvas.text( x, radius/2, perc + "%" ).attr( Font );  
    
Font = {'text-anchor':'middle', 'font-size': 11, 'font-family' : 'helvetica', 'fill': 'rgb(214, 214, 214)'};

canvas.text( x, radius/2 , 'FALTAM'  ).attr( Font );   

Font = {'text-anchor':'middle', 'font-size': 25, 'font-family' : 'helvetica', 'fill': '#F79518'};

canvas.text( x, radius/2 + 25 , '10:31:55'  ).attr( Font ); 

Font = {'text-anchor':'middle', 'font-size': 11, 'font-family' : 'helvetica', 'fill': 'rgb(214, 214, 214)'};

canvas.text( x, radius/2 + 50, 'PARA ENCERRAR A VOTAÇÃO'  ).attr( Font );     
 
}

var value = parseInt($("#percentage").attr("value"));

percentageGraph( "votes", 97, 110, 115, value, { stroke : "#F79518", "stroke-width" : 23 }, { stroke : "rgb(214, 214, 214)", "stroke-width" : 23 } );
