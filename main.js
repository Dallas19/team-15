
function upload(evt) {
	if (!browserSupportFileUpload()) {
	alert('The File APIs are not fully supported in this browser!');
	} 
	else {
		var data = null;
		var file = evt.target.files[0];
		var reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function(event) {
			var csvData = event.target.result;
			data = $.csv.toArrays(csvData);
			if (data && data.length > 0) {
				alert('Imported -' + data.length + '- rows successfully!');
			} else {
				alert('No data to import!');
			}
		};
		reader.onerror = function() {
			alert('Unable to read ' + file.fileName);
		};
	}
};

function check() {
	if (document.getElementById("fileA-input").value == "" || 
	document.getElementById("fileB-input").value == "") {
		alert("Please upload both files at the same time before submitting...")
	} else {
		alert("both files there!");
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
		'American':  ['Brian', 'Faith', 'Jessica', 'George', 'Ian', 'Alex'],
		'City':  ['Brian', 'Alex', 'Cassie', 'Faith', 'George', 'Dana'],
		'County': ['Faith', 'Brian', 'Edward', 'George', 'Hannah', 'Cassie'],
		'Fairview':  ['Faith', 'Jessica', 'Cassie', 'Alex', 'Ian', 'Hannah'],
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