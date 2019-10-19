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