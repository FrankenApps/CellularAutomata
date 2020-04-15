let f7app, app, graphics, rect;

const cellSize = 10;

let gen1 = [ [ 1, 1, 1 ], [ 1, 1, 0 ], [ 1, 0, 1 ], [ 0, 1, 1 ], [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ], [ 0, 0, 0 ] ];
let gen2 = [ 0, 0, 0, 1, 1, 1, 1, 0 ];

document.addEventListener('DOMContentLoaded', function(event) {
	initControls();
	createControlBar();
	initBoard();
	updateGridAlgorithm(false, false, 5);	//150
});

function initControls() {
	f7app = new Framework7({
		root: '#app',
		name: 'Cellular Automata - Settings',
		id: 'de.frankenapps.cellular-automata',
		theme: 'aurora'
	});

	let mainView = f7app.views.create('.view-main');

	let randomStart = f7app.toggle.get('#randomStart');
	let showGrid = f7app.toggle.get('#showGrid');
	let iterations = f7app.range.get('#iterationSlider');

	//apply presets
	if(randomStart.checked){
		randomStart.toggle();
	}
	if(showGrid.checked){
		showGrid.toggle();
	}
	iterations.setValue(5);	//150

	document.querySelector('#updateGrid').addEventListener('click', ()=>{
		calcRule();
		updateGridAlgorithm(randomStart.checked, showGrid.checked, iterations.getValue());
	});
}

function createControlBar() {
	let controls = d3.select('#controlBar').append('svg').attr('width', '100%').attr('height', '100%');
	let visualOffset = 0;
	let centerOffset = 0;

	for (let i = 0; i < 24; i++) {
		if (i % 3 === 0) {
			visualOffset += 30;
		}
		controls
			.append('rect')
			.attr('x', i * 30 + visualOffset)
			.attr('y', 10)
			.attr('width', 29.5)
			.attr('height', 29.5)
			.attr('class', 'controlBarButton controlBarGen1')
			.style('stroke-width', '0.6')
			.style('stroke', '#999999')
			.attr('id', '_c' + String(i));
	}

	for (let i = 0; i < 8; i++) {
		centerOffset += 90;
		controls
			.append('rect')
			.attr('x', i * 30 + centerOffset - 30)
			.attr('y', 40)
			.attr('width', 29.5)
			.attr('height', 29.5)
			.attr('class', 'controlBarButton controlBarGen2')
			.style('stroke-width', '0.6')
			.style('stroke', '#999999')
			.attr('id', '_cM' + String(i));
	}

	d3
		.selectAll('.controlBarGen1')
		.classed('white', function(d, i) {
			return gen1[parseInt(i/3)][i%3] === 0;
		})
		.on('click', function() {
			d3.select(this).classed('white', !d3.select(this).classed('white'));
			if (d3.select(this).classed('white')) {
				gen1[parseInt(String(this.id).substr(2)/3)][String(this.id).substr(2)%3] = 0;
			} else {
				gen1[parseInt(String(this.id).substr(2)/3)][String(this.id).substr(2)%3] = 1;
			}

			//check for duplicate entries
			if(checkArrayForDuplicates(gen1)){
				document.getElementById('invalidRuleSelection').style.display = 'inline';
			}	else{
				document.getElementById('invalidRuleSelection').style.display = 'none';
			}
		});

	d3
		.selectAll('.controlBarGen2')
		.classed('white', function(d, i) {
			return gen2[i] === 0;
		})
		.on('click', function() {
			d3.select(this).classed('white', !d3.select(this).classed('white'));
			if (d3.select(this).classed('white')) {
				gen2[String(this.id).substr(3)] = 0;
			} else {
				gen2[String(this.id).substr(3)] = 1;
			}
		});
}

function initBoard() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	app = new PIXI.Application({
		width: width,
		height: height,
		backgroundColor: 0xffffff,
		resolution: window.devicePixelRatio || 1,
		autoResize: true,
		antialias: true
	});

	document.body.appendChild(app.view);
	graphics = new PIXI.Graphics();

	app.stage.addChild(graphics);

	//handle window resize
	window.addEventListener('resize', resize);
	resize();

	d3.select('canvas').call(d3.zoom().on('zoom', zoom));
}

function updateGridAlgorithm(randomStart, showGrid, iterations){
	console.log('Update grid: ' + randomStart + ' ' + showGrid + ' ' + iterations);
	f7app.progressbar.show('#progressBar', 0);
	graphics.removeChildren();
	graphics.clear();
	//---- Trying to free up memory ----//
/* 	document.body.removeChild(app.view);
 	const width = window.innerWidth;
	const height = window.innerHeight;
	app = new PIXI.Application({
		width: width,
		height: height,
		backgroundColor: 0xffffff,
		resolution: window.devicePixelRatio || 1,
		autoResize: true,
		antialias: true
	});
	document.body.appendChild(app.view);
	graphics = new PIXI.Graphics();
	app.stage.addChild(graphics);
	d3.select('canvas').call(d3.zoom().on('zoom', zoom)); */
	//----------------------------------//
	if(showGrid){
		drawNewGrid(iterations, randomStart);
	}	else{
		drawAutomata(iterations, randomStart);
	}
}

function calcRule(){
	var ruleNumber = 0;
	for (var i = 0; i < 8; i++) {
		if (gen2[i] > 0){
			ruleNumber+=Math.pow(2,7-i);
		}
	}
	document.querySelector('#displayRule').innerHTML = 'Rule ' + String(ruleNumber);
	document.title = 'Cellular Automata: Rule ' + ruleNumber;
}

function drawNewGrid(iterations, randomStart){
	const width = window.innerWidth;
	const gridWidth = iterations * 2 + 1;
	const startX = width/2 - gridWidth/2 * cellSize;
	const startY = 130;
	rect = new PIXI.Graphics();

	drawGridRecursive(0, iterations, startX, startY, gridWidth, 0, randomStart);
}

function drawGridRecursive(row, iterations, startX, startY, gridWidth, childCount, randomStart){
	if(row < iterations){
		for (let j = 0; j < gridWidth; j++) {
			childCount ++;
			rect.lineStyle(0.5, 0x999999);
			rect.drawRect(startX + j * cellSize, startY + row * cellSize, cellSize, cellSize);
			if(childCount > 3000){	//a graphics object of that specific type can not hold more than 5461 children (trial/error)
				graphics.addChild(rect);
				rect = new PIXI.Graphics();
				childCount = 0;
			}
		}
		row++;
		graphics.addChild(rect);
		f7app.progressbar.set('#progressBar', row/iterations*100);	
		window.requestAnimationFrame(()=>{drawGridRecursive(row, iterations, startX, startY, gridWidth, childCount, randomStart)});
	}
	else{
		graphics.addChild(rect);
		fillGrid(iterations, randomStart);
	}
}

function fillGrid(iterations, randomStart){
	const width = window.innerWidth;
	const gridWidth = iterations * 2 + 1;
	const startX = width/2 - gridWidth/2 * cellSize;
	const startY = 130;
	let arr = constructStartArray(randomStart, gridWidth);
	rect = new PIXI.Graphics();

	fillGridRecursive(0, iterations, arr, startX, startY, gridWidth, 0);
}

function fillGridRecursive(row, iterations, arr, startX, startY, gridWidth, childCount){
	if(row < iterations){
		for (let j = 0; j < gridWidth; j++) {
			if(arr[j] > 0){
				childCount ++;
				rect.lineStyle(0.5, 0x999999);
				rect.beginFill(0x000000);
				rect.drawRect(startX + j * cellSize, startY + row * cellSize, cellSize, cellSize);
				if(childCount > 3000){	//a graphics object can not hold more than ~4100 children
					graphics.addChild(rect);
					rect = new PIXI.Graphics();
					childCount = 0;
				}
			}
		}
		row++;
		f7app.progressbar.set('#progressBar', row/iterations*100);	
		arr = updateArray(arr, gridWidth);
		window.requestAnimationFrame(()=>{fillGridRecursive(row, iterations, arr, startX, startY, gridWidth, childCount)});
	} else{
		graphics.addChild(rect);
		f7app.progressbar.hide('#progressBar');	//done...
	}
}

function drawAutomata(iterations, randomStart){
	const width = window.innerWidth;
	const gridWidth = iterations * 2 + 1;
	const startX = width/2 - gridWidth/2 * cellSize;
	const startY = 130;
	let arr = constructStartArray(randomStart, gridWidth);
	rect = new PIXI.Graphics();

	drawAutomataRecursive(0, iterations, arr, startX, startY, gridWidth, 0);
}

function drawAutomataRecursive(row, iterations, arr, startX, startY, gridWidth, childCount){
	if(row < iterations){
		for (let j = 0; j < gridWidth; j++) {
			if(arr[j] > 0){
				childCount ++;
				rect.beginFill(0x000000);
				rect.drawRect(startX + j * cellSize, startY + row * cellSize, cellSize, cellSize);
				if(childCount > 3000){	//a graphics object can not hold more than ~4100 children
					graphics.addChild(rect);
					rect = new PIXI.Graphics();
					childCount = 0;
				}
			}
		}
		row++;
		f7app.progressbar.set('#progressBar', row/iterations*100);	
		arr = updateArray(arr, gridWidth);
		window.requestAnimationFrame(()=>{drawAutomataRecursive(row, iterations, arr, startX, startY, gridWidth, childCount)});
	} else{
		graphics.addChild(rect);
		f7app.progressbar.hide('#progressBar');	//done...
	}
}

function constructStartArray(randomStart, gridWidth){
	let arr = Array(gridWidth).fill(0);
	if(randomStart){
		for (let i = 0; i < arr.length; i++) {
			if(Math.random() > 0.5){
				arr[i] = 1;
			}
		}
	} else{
		arr[Math.ceil(gridWidth/2)-1] = 1;
	}
	return arr;
}

function updateArray(previousRow, gridWidth){
	let arr = Array(gridWidth).fill(0);
	//special handling for first element
	let currentLocal = [previousRow[previousRow.length-1], previousRow[0], previousRow[1]]
	for (let i = 0; i < gen1.length; i++) {
		if(_.isEqual(currentLocal, gen1[i])){
			arr[0] = gen2[i];
		}
	}
	for (let i = 1; i < previousRow.length - 1; i++) {
		currentLocal = [previousRow[i - 1], previousRow[i], previousRow[i + 1]]
		for (let j = 0; j < gen1.length; j++) {
			if(_.isEqual(currentLocal, gen1[j])){
				arr[i] = gen2[j];
			}
		}
	}
	//special handling for last element
	currentLocal = [previousRow[previousRow.length-2], previousRow[previousRow.length-1], previousRow[0]]
	for (let i = 0; i < gen1.length; i++) {
		if(_.isEqual(currentLocal, gen1[i])){
			arr[arr.length-1] = gen2[i];
		}
	}
	previousRow = null; //trying to clear heap
	return arr;
}

function resize() {
	//resize renderer
	app.renderer.resize(window.innerWidth, window.innerHeight);
	//TODO: Check further implications...
}

function zoom() {
	graphics.position.x = d3.event.transform.x;
	graphics.position.y = d3.event.transform.y;
	graphics.scale.x = d3.event.transform.k;
	graphics.scale.y = d3.event.transform.k;
}

function checkArrayForDuplicates(arr){
	const distinctArr = Array.from((new Map(arr.map((item) => [item.join(), item]))).values());
	return arr.length != distinctArr.length;
}