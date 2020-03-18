function showPicker() {
  d3.select('#file-input').node().click();
}

function showPicked(input) {
  d3.select('#upload-label').text(input.files[0].name);
  let reader = new FileReader();
  reader.onload = function(e) {
    d3.select("#image-picked")
        .property('src', e.target.result)
        .attr('class', '')
  };
  reader.readAsDataURL(input.files[0]);
}

async function analyze() {
  let uploadFiles = d3.select('#file-input').property('files');
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");
  let fileData = new FormData();
  fileData.append("file", uploadFiles[0]);

  d3.select('#analyze-button').text("Analyzing...");
  response = await d3.json(`${window.location.href}analyze`, {
    method: 'POST',
    mode: 'cors',
    body: fileData,
  })
  d3.select('#result-label').text(`Result = ${response["result"]}`);
  d3.select('#prob-label').html(response['prob']);
  d3.select('#analyze-button').text("Analyze")
}
