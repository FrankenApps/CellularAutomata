var iterations = 30;
var size = 10;
var rule = ['none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','rgb(0, 0, 0)','rgb(0, 0, 0)','none','rgb(0, 0, 0)','none','rgb(0, 0, 0)','none','none','rgb(0, 0, 0)','none','none','none','none'];
var randomStart = false;
var svg;
var stroke_color = "#999999";
var line = 0;
var fillTheGrid;
var isMobile = false; //initiate as false
// device detection (I know its bad...)
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

$( document ).ready(function() {

  calcRule();

  $('#wholeWrapper').slideUp('fast', function() {
  });

var switchery;
var switchery2;

//mobile Adjustments
if(!isMobile){
  switchery = new Switchery(randomSelect, { size: 'small' });
  switchery2 = new Switchery(gridSelect, { size: 'small' });
} else{
  switchery = new Switchery(randomSelect, { size: 'big' });
  switchery2 = new Switchery(gridSelect, { size: 'big' });
  $("#update").css('font-size', '35px');
  $("#cancel").css('font-size', '35px');
  $("#RuleIndenticator").css('font-size', '25px');
  $("#progressBarHandler").css('font-size', '20px');
  $("#Iterations").remove();
  $("#numberInput").css('display', 'inline');
  $("#iterationsLabel").css('font-size', '25px');
  $("#randomStartLabel").css('font-size', '25px');
  $("#gridSelectLabel").css('font-size', '25px');
  $("#numberInput").css('font-size', '35px');
  $('#numberInput').val('30');
  $('#menuWrapper').css('height', '400px');
}
  $('#randomSelect').prop( "checked", false );
  $('#gridSelect').prop( "checked", true );

  $("#Iterations").slider({
  min: 10,
  max: 1000001,
  scale: 'logarithmic',
  step: 2
  });


  //listener for two Dimensions
  $('#randomSelect').change(function () {
    if (randomStart) {
      randomStart=false;
    } else {
      randomStart=true;
    }
  });

  //listener for two Dimensions
  $('#gridSelect').change(function () {
    if (stroke_color=="#999999") {
      stroke_color='none';
    } else {
      stroke_color="#999999";
    }
  });

  $("#Iterations").on("slide", function(slideEvt) {
  	iterations=slideEvt.value;
  });

  $("#update").on("click", function() {
    if(isMobile){
      iterations=parseInt($('#numberInput').val());
    }
    calcRule();
    svg.remove();
    $('#mainSVG').remove();
    svg = d3.select("body")
              .append("svg")
              .attr("width", '100%')
              .attr("height", '100%')
              .attr('id', 'mainSVG')
              .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform);
              }))
          .append("g");
          if(randomStart){
            createGridRandom(svg);
            line=0;
            $('#wholeWrapper').slideDown('fast', function() {
            });
            $('#update').css('display', 'none');
            $('#cancel').css('display', 'inline');
            fillTheGrid=setInterval(fillGrid,1);
          } else {
            createGrid(svg);
            line=0;
            $('#wholeWrapper').slideDown('fast', function() {
            });
            $('#update').css('display', 'none');
            $('#cancel').css('display', 'inline');
            fillTheGrid=setInterval(fillGrid,1);
          }
  });

  $("#cancel").on("click", function() {
    clearInterval(fillTheGrid);
    $('#update').css('display', 'inline');
    $('#cancel').css('display', 'none');
  });

  svg = d3.select("body")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('id', 'mainSVG')
            .call(d3.zoom().on("zoom", function () {
              svg.attr("transform", d3.event.transform);
            }))
        .append("g");

        if(randomStart){
          createGridRandom(svg);
          createControlBar();
          $('#wholeWrapper').slideDown('fast', function() {
          });
          $('#update').css('display', 'none');
          $('#cancel').css('display', 'inline');
          fillTheGrid=setInterval(fillGrid,1);
        } else {
          createGrid(svg);
          createControlBar();
          $('#wholeWrapper').slideDown('fast', function() {
          });
          $('#update').css('display', 'none');
          $('#cancel').css('display', 'inline');
          fillTheGrid=setInterval(fillGrid,1);
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
            .attr("width", 10.1)
            .attr("height", 10.1)
            .style("fill", "none")
            .style("stroke-width", "0.6")
            .style("stroke", stroke_color)
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
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", "none")
            .style("stroke-width", "0.6")
            .style("stroke", stroke_color)
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
  line++;
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
      $('#progressBarHandler').css('width', Math.round((line+1)/iterations*100)+'%');
      $('#progressBarHandler').html(Math.round((line+1)/iterations*100)+'%');
  }
  if(line==iterations-1){
    clearInterval(fillTheGrid);
    $('#update').css('display', 'inline');
    $('#cancel').css('display', 'none');
    $('#wholeWrapper').slideUp('fast', function() {
    });
  }
}

function createControlBar(){
  var controls = d3.select("#controlBar")
            .append("svg")
            .attr("width", '100%')
            .attr("height", '100%');

  for (var i = 0; i < 32; i++) {
    if (i%4===0) {
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
    .classed("white",function(d,i){return rule[i] === "none";})
    .on("click",function(){
       d3.select(this).classed("white",!d3.select(this).classed("white"));
       if(d3.select(this).classed('white')){
         rule[String(this.id).substr(2)]='none';
       }  else {
         rule[String(this.id).substr(2)]='rgb(0, 0, 0)';
       }
    });
}

function calcRule(){
  var ruleNumber = 0;
  for (var i = 0; i < 8; i++) {
    if (rule[i*4]=='none') {
    } else if (rule[i*4]=='rgb(0, 0, 0)'){
      ruleNumber+=Math.pow(2,7-i);
    }
  }
  $('#RuleIndenticator').html('<b>Rule '+ ruleNumber +'</b> is currently displayed.');
  document.title = 'Cellular Automata: Rule ' + ruleNumber;
}
