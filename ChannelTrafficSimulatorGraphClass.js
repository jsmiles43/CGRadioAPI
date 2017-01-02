function CollisionCount() {
	this.count = 0;
	this.increment = function() {
		this.count = ++this.count
	}
}

function Graph(tableID) {
	this.LayoutObjects = []
	this.tableArray = []
	this.table
	this.createLayoutObjects = function() {
		var LayoutObjects = [];
		LayoutObjects.push(document.getElementById("channels").value)
		LayoutObjects.push(document.getElementById("pu").value)
		LayoutObjects.push(document.getElementById("w to b").value)
		LayoutObjects.push(document.getElementById("b to w").value)
		LayoutObjects.push( document.getElementById("un").value)
		LayoutObjects.push(10)
		this.LayoutObjects = LayoutObjects;
	}
	this.checkParameters = function() {
		//console.log(this.LayoutObjects)
		var bool = true;
		if (this.LayoutObjects[2] < 0 || this.LayoutObjects[2] > 1  || this.LayoutObjects[3] < 0 || this.LayoutObjects[3] > 1) {
			document.getElementById("parameter_error").innerHTML = "*Check Your Errors Parameters*";  bool = false;}  
		else if (parseInt(this.LayoutObjects[0]) < 4) {document.getElementById("parameter_error").innerHTML = "*Your Channels Parameter must be greater than 4*"; bool = false;} 
		else if ((parseInt(this.LayoutObjects[0]) < parseInt(this.LayoutObjects[1])) || (parseInt(this.LayoutObjects[0]) < parseInt(this.LayoutObjects[4]))) {
			document.getElementById("parameter_error").innerHTML = "*Your parameter PU or User Numberis greater than the number of channels you input*";  bool = false; } 
		else if (parseInt(this.LayoutObjects[1]) + parseInt(this.LayoutObjects[4]) > parseInt(this.LayoutObjects[0])) {
			document.getElementById("parameter_error").innerHTML = "*Your parameters Primary User Channel and User Number add up to more than the amount of Channels you input*"; bool = false;} 
		else if (parseInt(this.LayoutObjects[4]) > 6) {
			document.getElementById("parameter_error").innerHTML = "*Your user number parameter is greater than the allowed amount. It must be 6 or less*"; bool = false;} 
		else {document.getElementById("parameter_error").innerHTML = ""}
		return bool;
	}
	this.createBlankTable = function() { 
		var traffic_block_row = (this.table).insertRow(-1)
		for (var j = 0; j < 10; j++) {
			var traffic_block_cell = traffic_block_row.insertCell(-1)	
			traffic_block_cell.style.backgroundColor = "white"
		}
	}
	this.deleteTable = function() {
		if (this.table.rows.length == 0) {return}
		while(this.table.rows.length > 0) 
			this.table.deleteRow(-1)
	}
	this.addLabels = function() {
		var traffic_block_row = this.table.insertRow(-1)
		for (var i = 0; i < this.LayoutObjects[0]; i++) {
				var traffic_block_cell = traffic_block_row.insertCell(-1)
				traffic_block_cell.style.height = '30px'
				traffic_block_cell.style.width = '20px'
				traffic_block_cell.innerHTML = "Channel " + (i+1)
				traffic_block_cell.style.fontWeight = "bold"
				traffic_block_cell.align = "center"
			}
	}
	this.addInitLabels = function(initChannels) {
		var traffic_block_row = this.table.insertRow(-1)
		for (var i = 0; i < initChannels; i++) {
				var traffic_block_cell = traffic_block_row.insertCell(-1)
				traffic_block_cell.style.height = '30px'
				traffic_block_cell.style.width = '20px'
				traffic_block_cell.innerHTML = "Channel " + (i+1)
				traffic_block_cell.style.fontWeight = "bold"
				traffic_block_cell.align = "center"
				traffic_block_cell.style.backgroundColor = "white"
		}
	}
}

PrimaryUserGraph.prototype = new Graph()
SecondaryUserGraph.prototype = new Graph()
CollisionGraph.prototype = new Graph()

function PrimaryUserGraph(tableID)  {
	var table = document.getElementById(tableID)
	this.table = table;
	this.createTableArray = function() {
		var tableArray = [];
		for (var i = 0; i < this.LayoutObjects[0]; i++) {
			tableArray.push(0)
		}
		for (var i = 0; i < this.LayoutObjects[1]; i++) {
			var signal = Math.floor(Math.random()*this.LayoutObjects[0]+1);
			if (tableArray[signal-1] != 1)
				tableArray[signal-1] = 1;
			else
				i--
		}
		this.tableArray =  tableArray
	}
	this.createTable = function() {
		var traffic_block_row = this.table.insertRow(-1)
			for (var j = 0; j < this.LayoutObjects[0]; j++) {
				var traffic_block_cell = traffic_block_row.insertCell(-1)
				if (this.tableArray[j] == 1)
					traffic_block_cell.style.backgroundColor = "black"
				else 
					traffic_block_cell.style.backgroundColor = "white"
			}
		}
}

function SecondaryUserGraph(tableID) {
	var table = document.getElementById(tableID)
	this.table = table;
	this.createTableArray = function(globalArray) {
		if (globalArray[0] == null) {document.getElementById("parameter_error").innerHTML = "*You must run the primary traffic before you may run the secondary traffic*"; } 
		else {document.getElementById("parameter_error").innerHTML = ""}
		var table1Array = globalArray[0].slice()
		var userTrafficArray = []
		var table2Array = []
		for (var j = 1; j <= this.LayoutObjects[4]; j++)	{
			table2Array = table1Array.slice()
			for (var i = 0; i < table1Array.length; i++) {           
				if (table2Array[i] == 1) {                //miss detection algorithm
					if (Math.random() < this.LayoutObjects[3])
						table2Array[i] = 0
				}
				else {
					if (Math.random() < this.LayoutObjects[2])
						table2Array[i] = 1
				}
			}			
			userTrafficArray.push(table2Array)
		}
		this.tableArray = userTrafficArray
	}
	this.createTable = function() {
		var traffic_block_table = document.getElementById(this.table)
		for (var i = 0; i < this.LayoutObjects[4]; i++) {
			var traffic_block_row = this.table.insertRow(-1)
			for (var j = 0; j < this.LayoutObjects[0]; j++) {
				var traffic_block_cell = traffic_block_row.insertCell(-1)
				if (this.tableArray[i][j] == 1)
					traffic_block_cell.style.backgroundColor = "black"
				else 
					traffic_block_cell.style.backgroundColor = "white"
			}
		}
	}
}
function CollisionGraph(tableID) {
	var table = document.getElementById(tableID)
	this.table = table;
	this.tableArray = function(globalArray) {
		if (globalArray[1] == null) {document.getElementById("parameter_error").innerHTML = "*You must run the primary and secondary view traffic before you may run the secondary traffic*"; } 
		else {document.getElementById("parameter_error").innerHTML = ""}
		var primaryArray = globalArray[0].slice()
		var secondaryViewArray = globalArray[1].slice()
		//console.log(primaryArray)
		//console.log(secondaryViewArray)
		var secondaryArray = []
		secondaryArray.push(primaryArray);               //push primary user channels to array characteristics
		for (var i = 0; i < secondaryViewArray.length; i++) {
			var openChannelsArray = []
			var newArray = []
			for (var j = 1; j <= secondaryViewArray[i].length; j++) {
				if (secondaryViewArray[i][j] == 0)
					openChannelsArray.push(j)
			}
			var rand = openChannelsArray[Math.floor(Math.random() * openChannelsArray.length)]    //select random open channel for secondary user
			for (var j = 0; j < secondaryViewArray[i].length; j++) {
				if (j == rand) 
					newArray.push(1)
				else
					newArray.push(0)
			}
			secondaryArray.push(newArray)
		}
		this.tableArray = secondaryArray
	}
	this.createTable = function() {
		var traffic_block_row = this.table.insertRow(-1)
		for (var j = 0; j < this.LayoutObjects[0]; j++) {
			var traffic_block_cell = traffic_block_row.insertCell(-1)
			if (this.tableArray[0][j] == 1)
				traffic_block_cell.style.backgroundColor = "black"
			else 
				traffic_block_cell.style.backgroundColor = "white"
		}
		for (var i = 1; i <= this.LayoutObjects[4]; i++) {
			var traffic_block_row = this.table.insertRow(-1)
			for (var j = 0; j < this.LayoutObjects[0]; j++) {
				var traffic_block_cell = traffic_block_row.insertCell(-1)
				if (this.tableArray[i][j] == 1 && this.tableArray[0][j] != 1)
					traffic_block_cell.style.backgroundColor = "black"
				else if (this.tableArray[i][j] == 1 && this.tableArray[i][j] == 1) {
					traffic_block_cell.style.backgroundColor = "red"
					c.increment()
				}
				else 
					traffic_block_cell.style.backgroundColor = "white"
			}
		}
	}
}


