function post_request(fileA, fileB) {
	// $.ajax({
	// 	type: "POST",
	// 	url: "/test.py",
	// 	success: testFunction
	// });
	const url = "http://127.0.0.1:5000/upload";
	
	// response = fetch("http://127.0.0.1:5000/dict",{
	// 	method: 'GET', // *GET, POST, PUT, DELETE, etc.
	// 	//mode: 'no-cors', // no-cors, *cors, same-origin
	// 	//credentials: 'include', // include, *same-origin, omit
	// }).then(function(response) {
	// 	return response.json();
	// });
	// console.log(response);

	// fetch(url).then(response => 
	// 	response.json().then(data => ({
	// 		data: data,
	// 		status: response.status
	// 	})
	// ).then(res => {
	// 	console.log(res.status, res)
	// }));

	const data = {fileA_encoded: btoa(fileA), fileB_encoded: btoa(fileB)};	
	fetch(url, {
		method: 'POST', 
		body: JSON.stringify(data),
		headers: {
		'Content-Type': 'application/json'
		}
	}).then(response => {
		const reader = response.body.getReader();
		reader.read().then(({ done, value }) => {
			console.log(done);
			console.log(new TextDecoder("utf-8").decode(value));
		})
	}).catch(function(e) {
		console.log(e);
	});
};

function check() {
	var fileAinput = document.getElementById("fileA-input");
	var fileBinput = document.getElementById("fileB-input");
	if (fileAinput.value == "" || fileBinput.value == "") {
		alert("Please upload both files at the same time before submitting...")
	} else {
		console.log("both files there!");
		post_request(fileAinput.value, fileBinput.value);
		// clear the files after the upload
		fileAinput.value = "";
		fileBinput.value = "";
	}
};


function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
};

function exportCSVFile(headers, items, fileTitle) {
	
	if (headers) {
        items.unshift(headers);
    }
    var jsonObject = JSON.stringify(items);
	
    var csv = this.convertToCSV(jsonObject);

    var exportedFile = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
	var link = document.createElement("a");
	if (link.download !== undefined) { 
		var url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", exportedFile);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
    
}

function download(){
  	var headers = {
		company: 'Company',
		student_1: 'Student Ranking #1',
		student_2: 'Student Ranking #2',
		student_3: 'Student Ranking #3',
		student_4: 'Student Ranking #4',
		student_5: 'Student Ranking #5',
		student_6: 'Student Ranking #6',
  	}

	let dataSet = {
		'JPMorgan Chase':  ['Brian', 'Faith', 'Jessica', 'George', 'Ian', 'Alex'],
		'CitiBank':  ['Brian', 'Alex', 'Cassie', 'Faith', 'George', 'Dana'],
		'Bank Of America': ['Faith', 'Brian', 'Edward', 'George', 'Hannah', 'Cassie'],
		'Capital One':  ['Faith', 'Jessica', 'Cassie', 'Alex', 'Ian', 'Hannah'],
		'Mercy':  ['Jessica', 'Hannah', 'Faith', 'Dana', 'Alex', 'George'],
		'Saint Mark':  ['Brian', 'Alex', 'Edward', 'Ian', 'Jessica', 'Dana'],
		'Park':  ['Jessica', 'George', 'Hannah', 'Faith', 'Brian', 'Alex'],
		'Deaconess': ['George', 'Jessica', 'Brian', 'Alex', 'Ian', 'Dana'],
		'Mission':  ['Ian', 'Cassie', 'Hannah', 'George', 'Faith', 'Brian'],
		'General':  ['Edward', 'Hannah', 'George', 'Alex', 'Brian', 'Jessica'],
	}
  

	var output = [];

  	var keys = Object.keys(dataSet);
 	keys.forEach(function(key){
	  	let studentArray = dataSet[key];
		output.push({
			company: key,
			student_1: studentArray[0],
			student_2: studentArray[1],
			student_3: studentArray[2],
			student_4: studentArray[3],
			student_5: studentArray[4],
			student_6: studentArray[5],
		});
	})
	console.log(output);
  	var fileTitle = 'RankingFile'; 
  	exportCSVFile(headers, output, fileTitle); 
};
