var PrimaryUserDataGraph = new PrimaryUserGraph("table1")
var SecondaryUserDataGraph = new SecondaryUserGraph("table2")
var CollisionDataGraph = new CollisionGraph("table3")
PrimaryUserDataGraph.createBlankTable()
SecondaryUserDataGraph.createBlankTable()
CollisionDataGraph.createBlankTable()
PrimaryUserDataGraph.addInitLabels(10)
SecondaryUserDataGraph.addInitLabels(10)
CollisionDataGraph.addInitLabels(10)

	//var array2 = createArrayTableTwo(array1, parameters[3], parameters[4], parameters[2])
	//var array3 = createArrayTableThree(array1, array2)

//create tables using Graph object methods
var GlobalArray = []
var layoutobject = []
var countStat = 0
var stats = []
var c = new CollisionCount()

function CreatePrimaryUserGraph(PrimaryUserDataGraph) {
	PrimaryUserDataGraph.deleteTable()
	PrimaryUserDataGraph = new PrimaryUserGraph("table1")
	PrimaryUserDataGraph.createLayoutObjects()
	if(!PrimaryUserDataGraph.checkParameters()) { return}
	//PrimaryUserDataGraph.createBlankTable()
	PrimaryUserDataGraph.createTableArray()
	PrimaryUserDataGraph.createTable()
	PrimaryUserDataGraph.addLabels()
	GlobalArray[0] =PrimaryUserDataGraph.tableArray.slice()
}

function CreateSecondaryUserGraph(SecondaryUserDataGraph) {
	SecondaryUserDataGraph.deleteTable()
	SecondaryUserDataGraph = new SecondaryUserGraph("table2",[])
	SecondaryUserDataGraph.createLayoutObjects()
	if(!SecondaryUserDataGraph.checkParameters()) {return}
	//SecondaryUserDataGraph.createBlankTable()
	//console.log("Global" + GlobalArray[0])
	SecondaryUserDataGraph.createTableArray(GlobalArray)
	SecondaryUserDataGraph.createTable()
	SecondaryUserDataGraph.addLabels()
	GlobalArray[1] = SecondaryUserDataGraph.tableArray.slice()
}

function CreateCollisionGraph(CollisionDataGraph) {
	CollisionDataGraph.deleteTable()
	CollisionDataGraph = new CollisionGraph("table3",[])
	CollisionDataGraph.createLayoutObjects()
	layoutobject = CollisionDataGraph.LayoutObjects
	if(!CollisionDataGraph.checkParameters) {return}
	//CollisionDataGraph.createBlankTable()
	CollisionDataGraph.tableArray(GlobalArray)
	CollisionDataGraph.createTable()
	CollisionDataGraph.addLabels()
}






//functions to create arrays for HTML tables********************************



document.getElementById("run1").addEventListener("click",function() {CreatePrimaryUserGraph(PrimaryUserDataGraph)})
document.getElementById("run2").addEventListener("click",function() {CreateSecondaryUserGraph(SecondaryUserDataGraph)})
document.getElementById("run3").addEventListener("click",function() {CreateCollisionGraph(CollisionDataGraph)})
document.getElementById("RunOnce").addEventListener("click",function() {CreatePrimaryUserGraph(PrimaryUserDataGraph); CreateSecondaryUserGraph(SecondaryUserDataGraph); CreateCollisionGraph(CollisionDataGraph);})
document.getElementById("runall").addEventListener("click",function() { RunIterations(document.getElementById("iterations").value)})


document.getElementById("channeldata").addEventListener("click",function() {DataTable()})














function RunOnce() {
	CreatePrimaryUserGraph(PrimaryUserDataGraph); 
	CreateSecondaryUserGraph(SecondaryUserDataGraph); 
	CreateCollisionGraph(CollisionDataGraph)
}

var timeOut
function RunIterations(iterations) {
		var timeInterval = 100;
		timeOut = setInterval(RunOnce,timeInterval)
		setTimeout(StopIteration, (iterations)*timeInterval)
		setTimeout(function(){
			countStat = c.count
			stats.push(layoutobject)
			stats.push(countStat)
			stats.push(iterations)
			c.count = 0
		},(iterations)*timeInterval)
}


function StopIteration() {
	clearInterval(timeOut)
}


function DataTable() {
	//var stats = stats
	var DataWindow = window.open("", "", "width=1200,height=800")
	DataWindow.document.write("Number of Channels: " + this.stats[0][0] + "<br>")
	DataWindow.document.write("Number of Channels used by Primary User: " + this.stats[0][1] + "<br>")
	DataWindow.document.write("Chance of Error of selecting an open channel percieved to be in use: " + this.stats[0][2] + "<br>")
	DataWindow.document.write("Chance of Error of selecting a used channel percieved to be open: " + this.stats[0][3] + "<br>")
	DataWindow.document.write("Number of Secondary Users: " + this.stats[0][4] + "<br>")
	DataWindow.document.write("Number of Collisions: " + this.stats[1] + "<br>")
	DataWindow.document.write("Number of Iterations of Channel Traffic: " + this.stats[2] + "<br>")
	DataWindow.document.write("Average Collisions per Channel Traffic Transaction:" + this.stats[1]/(this.stats[0][0]*this.stats[2]))
	stats = []
}  