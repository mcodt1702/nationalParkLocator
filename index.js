"use strict";

// When you're done, submit the link to your GitHub repo at the bottom of the page.
// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.
// As a stretch goal, try adding the park's address to the results.

//listen to input
function listenToForm() {
  $("form").submit((event) => {
    event.preventDefault();
    console.log("are you clicking??");
    createUrlstring();
  });
}

//create param for url

function createUrlstring() {
  let state = $("#stateInput").val();
  let howMany = $("#numberOfResultsinput").val();
  console.log(state, howMany);

  const api = "h3CUlOVYyQPS9k9vv4Om71GrwvbVJyhmmsuuGpkW";
  const baseUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${howMany}&api_key=${api}`;
  $("#stateInput").val("");
  $("#numberOfResultsinput").val("10");
  fetchUrl(baseUrl);
}

//fetch url
function fetchUrl(baseUrl) {
  console.log(baseUrl);
  fetch(baseUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })

    .then((responseJson) => renderResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

//render results from fetch to dom

function renderResults(responseJson) {
  console.log(responseJson);

  $("#results-list").empty();

  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<h2> ${responseJson.data[i].fullName}</h2>
        <div id="display">
        <img src=${responseJson.data[i].images[0].url}> 
        <ul>
            <li>Description: ${responseJson.data[i].description}</li>
            <br>
            <li>Website: <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>"</li>
        </ul>
        </div>
        <p>${responseJson.data[i].images[0].caption}</p>
        <br><br>`
    )
    $('#results').removeClass('hidden');
  }
}

//<li>Adress: ${responseJson.data[i].object.values(responseJson.data[i].addresses)}

$(function () {
  listenToForm();
});
