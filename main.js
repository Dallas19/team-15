
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