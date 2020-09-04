const weatherForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const showLocation = document.querySelector(".location");
const showTemperature = document.querySelector(".temperature");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const weatherSearched = searchInput.value;
  const url = `/weather?address=${weatherSearched}`;

  showLocation.textContent = "loading...";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        return (showLocation.textContent = data.error);
      }

      showLocation.textContent = data.location;
      showTemperature.textContent = data.forecast;
    });
});
