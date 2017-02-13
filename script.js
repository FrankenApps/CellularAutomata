var iterations = 30;
var size = 10;
var rule = ['none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','none','none','none']
var randomStart = false;
var svg;

$( document ).ready(function() {

  $("#Iterations").slider({
	min: 10,
	max: 1000001,
	scale: 'logarithmic',
	step: 2
  });

  var switchery = new Switchery(randomSelect, { size: 'small' });
  $('#randomSelect').prop( "checked", false );

  //listener for two Dimensions
  $('#randomSelect').change(function () {
    if (randomStart) {
      randomStart=false;
    } else {
      randomStart=true;
    }
  });

  $("#Iterations").on("slide", function(slideEvt) {
  	iterations=slideEvt.value;
  });

  $("#update").on("click", function() {
    svg.remove();
    $('#mainSVG').remove();
    svg = d3.select("body")
              .append("svg")
              .attr("width", '100%')
              .attr("height", '100%')
              .attr('id', 'mainSVG')
              .call(d3.zoom().on("zoom", function () {
                d3.event.transform.k;
                svg.attr("transform", d3.event.transform);
              }))
          .append("g");
          if(randomStart){
            createGridRandom(svg);
            fillGridRandom();
          } else {
            createGrid(svg);
            fillGrid();
          }
  });

  svg = d3.select("body")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('id', 'mainSVG')
            .call(d3.zoom().on("zoom", function () {
              d3.event.transform.k;
              svg.attr("transform", d3.event.transform);
            }))
        .append("g");

        if(randomStart){
          createGridRandom(svg);
          fillGridRandom();
          createControlBar();
        } else {
          createGrid(svg);
          fillGrid();
          createControlBar();
        }
});

function createGrid(svg){
  var width_adjust = $( window ).width()*1/3+15;
  var posx = 0-((size/2)*iterations)-size;
  var posy = 0;
  for (var i = 0; i < iterations; i++) {
    posy = i*size;
    for (var j=0; j<Math.ceil(2*iterations+1); j++) {
      posx += size;
      svg.append("rect")
            .attr("x", posx+width_adjust)
            .attr("y", posy+90)
            .attr("width", 9.5)
            .attr("height", 9.5)
            .style("fill", "none")
            .style("stroke-width", "0.6")
            .style("stroke", "#999999")
            .attr('id', "_"+String(j)+"_"+String(i)); //because ids cant start with a number
    }
    posx = 0-((size/2)*iterations)-size;
  }
  d3.select("#_"+String(iterations)+"_0").style("fill", "#000000");
}

function createGridRandom(svg){
  var width_adjust = $( window ).width()*1/3+15;
  var posx = 0-((size/2)*iterations)-size;
  var posy = 0;
  for (var i = 0; i < iterations; i++) {
    posy = i*size;
    for (var j=0; j<Math.ceil(2*iterations+1); j++) {
      posx += size;
      svg.append("rect")
            .attr("x", posx+width_adjust)
            .attr("y", posy+90)
            .attr("width", 9.5)
            .attr("height", 9.5)
            .style("fill", "none")
            .style("stroke-width", "0.6")
            .style("stroke", "#999999")
            .attr('id', "_"+String(j)+"_"+String(i)); //because ids cant start with a number
    }
    posx = 0-((size/2)*iterations)-size;
  }
  for(var k=0;k<2*iterations+3;k++){
    if(Math.random()>=0.5){
      d3.select("#_"+String(k)+"_0").style("fill", "#000000");
    }
  }
}

function fillGrid(){
  var columnStartingPoint=iterations-1;
  var columnEndPoint = iterations+2;
  for (var line = 1; line < iterations; line++) {
    for (var i = columnStartingPoint; i < columnEndPoint; i++) {
      if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[1]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[2]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[3]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[0]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[5]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[6]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[7]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[4]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[9]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[10]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[11]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[8]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[13]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[14]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[15]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[12]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[17]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[18]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[19]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[16]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[21]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[22]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[23]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[20]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[25]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[26]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[27]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[24]);
      } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[29]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[30]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[31]) {
        d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[28]);
      }
    }
    columnStartingPoint--;
    columnEndPoint++;
  }
}

function fillGridRandom(){
  for (var line = 1; line < iterations; line++) {
  for (var i = 1; i < Math.ceil(2*iterations); i++) {
    if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[1]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[2]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[3]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[0]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[5]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[6]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[7]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[4]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[9]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[10]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[11]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[8]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[13]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[14]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[15]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[12]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[17]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[18]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[19]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[16]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[21]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[22]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[23]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[20]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[25]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[26]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[27]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[24]);
    } else if (d3.select('#_' + String(i-1) + '_' + String(line-1)).style('fill')==rule[29]&&d3.select('#_' + String(i) + '_' + String(line-1)).style('fill')==rule[30]&&d3.select('#_' + String(i+1) + '_' + String(line-1)).style('fill')==rule[31]) {
      d3.select('#_' + String(i) + '_' + String(line)).style('fill', rule[28]);
    }
  }
}
}

function createControlBar(){
  var controls = d3.select("#controlBar")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%');

  for (var i = 0; i < 32; i++) {
    if (i%4==0) {
      controls.append("rect")
            .attr("x", i*30+60)
            .attr("y", 40)
            .attr("width", 29.5)
            .attr("height", 29.5)
            .attr('class', 'controlBarButton')
            .style("stroke-width", "0.6")
            .style("stroke", "#999999")
            .attr('id', "_c"+String(i));
    }  else {
      controls.append("rect")
            .attr("x", i*30)
            .attr("y", 10)
            .attr("width", 29.5)
            .attr("height", 29.5)
            .attr('class', 'controlBarButton')
            .style("stroke-width", "0.6")
            .style("stroke", "#999999")
            .attr('id', "_c"+String(i));
    }
  }

  d3.selectAll(".controlBarButton")
    .classed("white",function(d,i){return rule[i] === "none"})
    .on("click",function(){
       d3.select(this).classed("white",!d3.select(this).classed("white"));
       if(d3.select(this).classed('white')){
         rule[String(this.id).substr(2)]='none';
       }  else {
         rule[String(this.id).substr(2)]='rgb(0, 0, 0)';
       }
    });
}
