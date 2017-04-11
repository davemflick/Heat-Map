// Set width, height and padding constants

const w =  900;
const h = 600;
const p = 55;

//color from lowest temp to highest
const tempColors = ["#0010e5", "#0053e1", "#0094dd", 
					"#00d3d9", "#00d259", "#BEFE1F",
					"#bfb000", "#B68F02", "#FFED00",
					"#FFBB04", "#d500ba", "#D82B18"]

const tempScale = ["Temp < 2℃", "Temp < 3.2℃", "Temp < 4.4℃", "Temp < 5.5℃",
					"Temp < 6.7℃", "Temp < 7.7℃", "Temp < 8.5℃","Temp < 9.4℃", 
					"Temp < 10.7℃", "Temp < 12.1℃", "Temp < 13℃", "Temp < 14℃"];

// Use D3 to select .graphContainer from index.html attach some attributes

const graph = d3.select(".graphContainer")
					.style('width', '1000px')
					.style('height', '700px')
					.style('border', '1px solid black')

//Create SVG and place inside graphContainer
const svg = graph.append("svg")
				.style('width', (w + 'px'))
				.style('height', (h+"px"))

//Create a Div for a tooltip
const toolTip = graph.append("div")
				.attr("class", "tooltip")

const legend = graph.append("div")
				.attr("class", "legend")


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

	const month = d3.timeFormat("%B")
	const tempMin = d3.min(tempArr);
	const tempMax = d3.max(tempArr);
	console.log(month(new Date("2-2-2015")));
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
						.range([(h-p), p])
						

	const yAxis = d3.axisLeft(yScale)
					
					.tickSize(0)
					.tickPadding(5)
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
		.attr("class", "fillColor")
		.attr("transform", "translate(10,"+ (h-p) + ")")
		.style('font-size', "15px")
		.call(xAxis)

	svg.append("g")
		.attr("class", "fillColor")
		.attr("transform", "translate("+ (p+10) + ",0)")
		.style('font-size', "12px")
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
		 .on("mouseover", (d, i) => {
		 	toolTip.style("visibility", "visible")
						.style("width", "170px")
						.style("height", "60px")
						.style("background-color", "rgba(150,150,150,.7)")
						.style("border", "1px solid black")
						.style("top", (event.pageY-10)+"px")
						.style("left",(event.pageX+10)+"px")
						.html(`${month(new Date(d.month + '-2-2000'))}, ${d.year}
									<br> Temperature: ${(baseTemp + d.variance).toFixed(3)}℃
									<br> Variance: ${d.variance}℃`)			   
		 })
		 .on("mouseout", (d,i) => toolTip.style("visibility", "hidden"))

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
		else if(temp >=6.7 && temp < 7.7) { color = tempColors[5]}
		else if(temp >=7.7 && temp < 8.5) { color = tempColors[6]}
		else if(temp >=8.5 && temp < 9.4) { color = tempColors[7]}
		else if(temp >=9.4 && temp < 10.7) { color = tempColors[8]}
		else if(temp >=10.7 && temp < 12.1) { color = tempColors[9]}
		else if(temp >=12.1 && temp < 13.0) { color = tempColors[10]}
		else if(temp >=13 &&temp < 14.0) { color = tempColors[11]}
		else {color = "white"}
		return String(color);
	}

	//Add A color legend
	svg.selectAll("circle")
		.data(tempColors)
		.enter()
		.append("circle")
		.attr("cx", (d, i) => ((w/2)+ 50) + (i*25))
		.attr("cy", 10)
		.attr("r", 10)
		.attr("fill", (d) => d)
		.on("mouseover",(d, i)=>{
				legend.style("visibility", "visible")
					.style("width", "130px")
					.style("height", "40px")
					.style("font-size", "20px")
					
					.style("color", d)
					.style("top", (100)+"px")
					.style("left",(event.pageX)+"px")
					.html(`${tempScale[i]}`)			   
		 })
		 .on("mouseout", (d,i) => legend.style("visibility", "hidden"))
})


// document.addEventListener("mouseover", (e)=> console.log(e.target))



	









