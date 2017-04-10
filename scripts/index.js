// Set width, height and padding constants

const w =  900;
const h = 600;
const p = 55;

//color from lowest temp to highest
const tempColors = ["#1813A8", "#625FAB", "#625FAB", 
					"#77E2FD", "#D4F1F9", "#E0F93F",
					"#EFFAA5", "#FDCB56", "#ECA501",
					"#FE9C8D", "#F74C32", "#971501"]

// Use D3 to select .graphContainer from index.html attach some attributes

const graph = d3.select(".graphContainer")
					.style('width', '1000px')
					.style('height', '700px')
					.style('border', '1px solid black')

//Create SVG and place inside graphContainer
const svg = graph.append("svg")
				.style('width', (w + 'px'))
				.style('height', (h+"px"))
				.style('border', '1px solid black')


//Get JSON data
const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json" 

d3.json(URL, (error, data)=> {
	if(error){ return console.error(error)};

	const baseTemp = data.baseTemperature;
	const monthData = data.monthlyVariance;
	const dataLength = monthData.length;
	let yearArr = [];
	let monthArr = [];
	let varianceArr = [];
	let tempArr = [];
	monthData.forEach ((d)=>{
		yearArr.push(d.year);
		monthArr.push(d.month);
		varianceArr.push(d.variance);
		tempArr.push(baseTemp + d.variance);
	})
	const yearMin = d3.min(yearArr);
	const yearMax = d3.max(yearArr);
	const monthMin = d3.min(monthArr);
	const monthMax = d3.max(monthArr);

	
	const tempMin = d3.min(tempArr);
	const tempMax = d3.max(tempArr);
	//console.log(tempMin, tempMax);
	//Total of 263 years.. So at 3px per year a total grid width of 789px..
	// Height per Unit should be 480/12= 40px;
	


	// Create Scales and axis types for X/Y
	const xScale = d3.scaleLinear() 
					.domain([yearMin, yearMax])
					.range([p , w-p]);

	const xAxis = d3.axisBottom(xScale)
					.tickFormat((d)=>String(d));

	const yScale =  d3.scaleLinear()
						.domain([0, monthMax])
						.range([h-p, p])

	const yAxis = d3.axisLeft(yScale)
					.tickFormat((d)=> {
						if(d === 1) {return "January"}
						else if(d === 2) {return "February"}
						else if(d === 3) {return "March"}
						else if(d === 4) {return "April"}
						else if(d === 5) {return "May"}
						else if(d === 6) {return "June"}
						else if(d === 7) {return "July"}
						else if(d === 8) {return "August"}
						else if(d === 9) {return "September"}
						else if(d === 10) {return "October"}
						else if(d === 11) {return "November"}
						else if(d === 12) {return "December"}
						else {return " "}
					})
		


	svg.append("g")
		.attr("transform", "translate(10,"+ (h-p) + ")")
		.call(xAxis)

	svg.append("g")
		.attr("transform", "translate("+ (p+10) + ",0)")
		.call(yAxis)


	svg.selectAll("rect")
		.data(monthData)
		.enter()
		.append("rect")
		 .attr("id", (d, i) => `${d.month}:${d.year}`)
		 .attr("x", (d,i)=> findXRect(d, i))
		 .attr("y", (d, i)=> findYRect(d, i))
		 .attr("width", 3)
		 .attr("height", 40)
		 .style("fill", (d, i)=> checkTemp(tempArr[i]))

	//Determine Location
	function findXRect (d, i) {
		 	if(d.month == 1) {
			return (p+10) + ((d.year - yearMin)*3)
		} else if (d.month == 2){
			return (p+10) + ((d.year - yearMin)*3);
		}else if (d.month == 3 ){
			return (p+10) + ((d.year - yearMin)*3);
		}else if ( d.month == 4){
			return (p+10) + ((d.year - yearMin)*3);
		}else if ( d.month == 5){
			return (p+10) + ((d.year - yearMin)*3);
		}else if (d.month == 6){
			return (p+10) + ((d.year - yearMin)*3);
		}else if ( d.month == 7){
			return (p+10) + ((d.year - yearMin)*3);
		}else if (d.month == 8){
			return (p+10) + ((d.year - yearMin)*3);
		}else if ( d.month == 9){
			return (p+10) + ((d.year - yearMin)*3);
		}else if ( d.month == 10){
			return (p+10) + ((d.year - yearMin)*3);
		}else if (d.month == 11){
			return (p+10) + ((d.year - yearMin)*3);
		}else if (d.month == 12){
			return (p+10) + ((d.year - yearMin)*3);
		}
	}

	function findYRect (d, i) {
		if(d.month == 1) {return (h-p) - 40}
	 	else if (d.month == 2) {return (h-p) - (41*2)}
	 	else if (d.month == 3) {return (h-p) - (41*3)}
	 	else if (d.month == 4) {return (h-p) - (41*4)}
	 	else if ( d.month == 5) {return (h-p) - (41*5)}
	 	else if (d.month == 6) {return (h-p) - (41*6)}
	 	else if (d.month == 7) {return (h-p) - (41*7)}
	 	else if (d.month == 8) {return (h-p) - (41*8)}
	 	else if (d.month == 9) {return (h-p) - (41*9)}
	 	else if (d.month == 10) {return (h-p) - (41*10)}
	 	else if (d.month == 11) {return (h-p) - (41*11)}
	 	else if (d.month == 12) {return (h-p) - (41*12)}
	}


	//CheckTemperature and assign Color
	function checkTemp(temp) {
		let color = "";
		if(temp < 2) { color = tempColors[0]}
		else if(temp >=2 && temp < 3.2) { color = tempColors[1]}
		else if(temp >=3.2 && temp < 4.4) { color = tempColors[2]}
		else if(temp >=4.4 && temp < 5.5) { color = tempColors[3]}
		else if(temp >=5.5 && temp < 6.7) { color = tempColors[4]}
		else if(temp >=6.7 && temp < 7.9) { color = tempColors[5]}
		else if(temp >=7.9 && temp < 9.0) { color = tempColors[6]}
		else if(temp >=9.0 && temp < 10.1) { color = tempColors[7]}
		else if(temp >=10.1 && temp < 11) { color = tempColors[8]}
		else if(temp >=11 && temp < 12.1) { color = tempColors[9]}
		else if(temp >=12.1 && temp < 13.0) { color = tempColors[10]}
		else if(temp >=13 &&temp < 14.0) { color = tempColors[11]}
		else {color = "white"}
		return String(color);
	}
})


document.addEventListener("mouseover", (e)=> console.log(e.target))



	// function findXRect (d, i) {
	// 	 	if(i < 263) {
	// 		return (p+10) + (i*3)
	// 	} else if (i >=263 && i < (263 *2)){
	// 		var n = i - 263;
	// 		return (p+10) + (n *3);
	// 	}else if (i >=(263*2) && i < (263 *3) ){
	// 		var n = i - (263 * 2);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*3) && i < (263 *4)){
	// 		var n = i - (263 *3);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*4) && i < (263 *5)){
	// 		var n = i - (263 *4);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*5) && i < (263 *6)){
	// 		var n = i - (263 *5);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*6) && i < (263 *7)){
	// 		var n = i - (263 *6);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*7) && i < (263 *8)){
	// 		var n = i - (263 *7);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*8) && i < (263 *9)){
	// 		var n = i - (263 *8);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*9) && i < (263 *10)){
	// 		var n = i - (263 *9);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*10) && i < (263 *11)){
	// 		var n = i - (263 *10);
	// 		return (p+10) + (n *3);
	// 	}else if ( i >=(263*11) && i < (263 *12)){
	// 		var n = i - (263 *11);
	// 		return (p+10) + (n *3);
	// 	}
	// }

	// function findYRect (d, i) {
	// 	if(i<263) {return (h-p) - 40}
	//  	else if (i >=263 && i < (263 *2)) {return (h-p) - (41*2)}
	//  	else if (i >=(263*2) && i < (263 *3)) {return (h-p) - (41*3)}
	//  	else if ( i >=(263*3) && i < (263 *4)) {return (h-p) - (41*4)}
	//  	else if ( i >=(263*4) && i < (263 *5)) {return (h-p) - (41*5)}
	//  	else if ( i >=(263*5) && i < (263 *6)) {return (h-p) - (41*6)}
	//  	else if ( i >=(263*6) && i < (263 *7)) {return (h-p) - (41*7)}
	//  	else if ( i >=(263*7) && i < (263 *8)) {return (h-p) - (41*8)}
	//  	else if ( i >=(263*8) && i < (263 *9)) {return (h-p) - (41*9)}
	//  	else if (i >=(263*9) && i < (263 *10)) {return (h-p) - (41*10)}
	//  	else if ( i >=(263*10) && i < (263 *11)) {return (h-p) - (41*11)}
	//  	else if ( i >=(263*11) && i < (263 *12)) {return (h-p) - (41*12)}
	// }










