function showPicker() {
  d3.select('#file-input').node().click();
}

function showPicked(input) {
  d3.select('#upload-label').text(input.files[0].name);
  d3.select('#prob-label').text(null);
  let reader = new FileReader();
  reader.onload = function(e) {
    d3.select("#image-picked")
        .property('src', e.target.result)
        .attr('class', '') // needed for image to show for some reason
  };
  reader.readAsDataURL(input.files[0]);
}

async function analyzeImage() {
  let uploadFiles = d3.select('#file-input').property('files');
  if (uploadFiles.length !== 1) alert("Please select a file to analyze!");
  let imageData = new FormData();
  imageData.append("file", uploadFiles[0]);

  d3.select('#analyze-button').text("Processing...");
  response = await d3.json(`${window.location.href}analyze`, {
    method: 'POST',
    mode: 'cors',
    body: imageData,
  })
  d3.select('#prob-label').html(response['prob']);
  d3.select('#analyze-button').text("Analyze")
}
