
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

function post_request(fileA, fileB) {
	// $.ajax({
	// 	type: "POST",
	// 	url: "/test.py",
	// 	success: testFunction
	// });

	// const request = async () => {
	// 	const response = await fetch("http://127.0.0.1:5000/dict",{
	// 		method: 'GET', // *GET, POST, PUT, DELETE, etc.
	// 		mode: 'no-cors', // no-cors, *cors, same-origin
	// 		credentials: 'include', // include, *same-origin, omit
	// 	});
	// 	const json = await response.json();
	// 	console.log(json);
	// }
	
	// request();
	// let formData = new FormData();
	// formData.append('name', 'John');
	// fetch("http://127.0.0.1:5000/upload", {
	// 	body: formData,
	// 	method: "post"
	// }).then(response => console.log(response));
}

function testFunction(response) {
	console.log("in callback. The python file must have responded.");
}

function check() {
	var fileAinput = document.getElementById("fileA-input");
	var fileBinput = document.getElementById("fileB-input");
	if (fileAinput.value == "" || fileBinput.value == "") {
		alert("Please upload both files at the same time before submitting...")
	} else {
		console.log("both files there!");
		// make POST request here
		post_request(fileAinput.value, fileBinput.value);
		// clear the files after the upload
		fileAinput.value = "";
		fileBinput.value = "";
	}
};