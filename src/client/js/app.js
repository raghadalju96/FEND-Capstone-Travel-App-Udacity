const myuser = "raghad96";
const submit = document.getElementById("btn");
const weatherBitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherBitKey = "&key=a84e89bcc5dc4bf6b433309fd772c3dc";

document.addEventListener("DOMContentLoaded", function () {
  submit.addEventListener("click", handleSubmit);
});

//main function
function handleSubmit(event) {
  event.preventDefault();
  const place = document.getElementById("place").value;
  const depDate = document.getElementById("depDate").value;
  const renDate = document.getElementById("renDate").value;
  const geoNames = `http://api.geonames.org/searchJSON?q=${place}&username=${myuser}`;
  const pixabayUrl = `https://pixabay.com/api/?key=19113700-42c3b223b004e42e72744fef8&q=${place}&image_type=photo`;
  myplace(geoNames).then(function (geoNamesData) {
    getweatherBit(
      geoNamesData.geonames[0].lat,
      geoNamesData.geonames[0].lng,
      depDate,
      renDate
    ).then(function (weatherbitData) {
      getPixabay(pixabayUrl).then(function (imageFormat) {
        postData("http://localhost:6060/postData", {
          imageUrl: imageFormat,
          latitude: geoNamesData.geonames[0].lat,
          longitude: geoNamesData.geonames[0].lng,
          high: weatherbitData.data[0].max_temp,
          low: weatherbitData.data[0].min_temp,
          country: geoNamesData.geonames[0].countryName,
        });
        updateUI();
      });
    });
  });
}

//loaction
const myplace = async (url) => {
  const res = await fetch(url);

  try {
    const placeinfo = await res.json();
    console.log(placeinfo);
    return placeinfo;
  } catch (error) {
    console.log("Error", error);
  }
};

//get the weather
const getweatherBit = async (lan, lot, depDate, renDate) => {
  const res = await fetch(
    weatherBitURL +
      "&lat=" +
      lan +
      "&lon=" +
      lot +
      "&start_date=" +
      depDate +
      "&end_date=" +
      renDate +
      "&units=I" +
      weatherBitKey
  );
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

//get the image
const getPixabay = async (pixabayUrl) => {
  const res = await fetch(pixabayUrl);
  try {
    let pixa = await res.json();
    const imageFormat = pixa.hits[0].webformatURL;
    console.log(pixa.hits[0]);
    return imageFormat;
  } catch (error) {
    console.log("Error", error);
  }
};

//post
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

//update UI
const updateUI = async () => {
  const req = await fetch("http://localhost:6060/all");
  const depDate = document.getElementById("depDate").value;
  const renDate = document.getElementById("renDate").value;

  const start = new Date(depDate);
  const end = new Date(renDate);
  const days = Math.round(Math.abs((start - end) / 86400000));

  try {
    const data = await req.json();
    document.getElementById("duration").innerHTML = days;
    document.getElementById("country").innerHTML = data.country;
    document.getElementById("latitude").innerHTML = data.latitude;
    document.getElementById("longitude").innerHTML = data.longitude;
    document.getElementById("high").innerHTML = data.high;
    document.getElementById("low").innerHTML = data.low;
    document.getElementById("img").setAttribute("src", data.imageUrl);
  } catch (error) {
    console.log("Error", error);
  }
};

export { handleSubmit };
