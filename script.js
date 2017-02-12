var iterations = 60;
var size = 10;
var rule = ['none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','none','none','none']

$( document ).ready(function() {

  $("#Iterations").slider({
	min: 10,
	max: 1000001,
	scale: 'logarithmic',
	step: 10
});
  $("#Iterations").on("slide", function(slideEvt) {
  	iterations=slideEvt.value;
  });

  var svg = d3.select("body")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .call(d3.zoom().on("zoom", function () {
              d3.event.transform.k;
              svg.attr("transform", d3.event.transform);
            }))
        .append("g");

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
            .style("fill", "none")
            .style("stroke-width", "0.6")
            .style("stroke", "#999999")
            .attr('id', "_"+String(i));
    }  else {
      controls.append("rect")
            .attr("x", i*30)
            .attr("y", 10)
            .attr("width", 29.5)
            .attr("height", 29.5)
            .style("fill", "none")
            .style("stroke-width", "0.6")
            .style("stroke", "#999999")
            .attr('id', "_"+String(i));
    }
  }

    createGrid(svg);
    fillGrid();
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

function fillGrid(){
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
