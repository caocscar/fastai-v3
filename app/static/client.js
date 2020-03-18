let el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  d3.select('#upload-label').text(input.files[0].name);
  let reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  let uploadFiles = el("file-input").files;
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");

  d3.select('#analyze-button').text("Analyzing...");
  let xhr = new XMLHttpRequest();
  let loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`, true);
  xhr.onerror = () => alert(xhr.responseText);
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      let response = JSON.parse(e.target.responseText);
      d3.select('#result-label').text(`Result = ${response["result"]}`);
      d3.select('#prob-label').html(response['prob']);
    }
    d3.select('#analyze-button').text("Analyze");
  };

  let fileData = new FormData();
  fileData.append("file", uploadFiles[0]);
  xhr.send(fileData);
}

