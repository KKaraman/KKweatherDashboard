$(document).ready(function() {
    var APIKey = "44d6ff71d8ce28ae05cda22947cc55c5";
    var searchHistory = [];
    var viewCity = "";

    if (localStorage.getItem("lastCity")) {
        viewCity = JSON.parse(localStorage.getItem("lastCity"));
        displayInformation(viewCity);
    }

    //check for an event listener that is waiting for a click
    $("#citySearch").click(function(event) {
        event.preventDefault();
        // console.log("button clicked");
        viewCity = $("#cityName").val();
        viewCity = viewCity.toLowerCase();
        console.log(viewCity);
        displayInformation(viewCity);
        $("#cityName").val("");
    })

    $("#clearSearch").click(function(event) {
        event.preventDefault();
        console.log("clear button clicked");
        clearHistory();
    })


    function clearHistory() {
        console.log("clear history");
        $("#previousSearches").empty();
    }

    function displayInformation(city) {
        var currentWeatherQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        console.log(currentWeatherQueryURL)
        $.ajax({
            url: currentWeatherQueryURL,
            method: "GET"
        }).then(function(response) {
            // console.log(response);

            // var weatherDate = convertUnixDate(response.dt_txt);
            // console.log(moment().format('l'));
            // var day = (weatherDate.getDate() < 10 ? '0' : '') + weatherDate.getDate();
            // var month = (weatherDate.getMonth() < 9 ? '0' : '') + (weatherDate.getMonth() + 1);
            // var year = weatherDate.getFullYear();
            // console.log(month + "/" + day + "/" + year);
            $("#cityDate").text(response.name + ", " + response.sys.country + " (" +
                moment().format('l') +
                ")");
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" +
                response.weather[0].icon + ".png");
            $("#cityDate").append(image);

            // console.log(response.main.temp);
            var cityTemp = kelvintoFahr(response.main.temp);
            // console.log(cityTemp);
            $("#cityTemperature").text("Temperature is currently " + cityTemp + " degrees Fahrenheit.");

            var cityHumidity = response.main.humidity;
            // console.log(cityHumidity);
            $("#cityHumidity").text("Humidity is currently " + cityHumidity + "%.")

            var speedWind = response.wind.speed;
            // console.log(speedWind);
            $("#cityWindSpeed").text("Wind is currently blowing at " + speedWind + "  mph.")

            var cityLon = response.coord.lon;
            var cityLat = response.coord.lat;
            var UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
            $.ajax({
                url: UVQueryURL,
                method: "GET"
            }).then(function(response) {
                // console.log(response);
                $("#cityUVIndex").text("The UV Index at the city is currently " + response.value)
                if (response.value < 2) {
                    $("#cityUVIndex").attr("class", "bg-success");
                    $("#cityUVIndex").text("The UV Index at the city is currently " + response.value + " and is not dangerous.")
                } else if (response.value < 6) {
                    $("#cityUVIndex").attr("class", "bg-warning");
                    $("#cityUVIndex").text("The UV Index at the city is currently " + response.value + " and is moderately dangerous.")
                } else {
                    $("#cityUVIndex").attr("class", "bg-danger");
                    $("#cityUVIndex").text("The UV Index at the city is currently " + response.value + " and is dangerous.")
                }

                addToArray(city);

            }).catch(function(error) {
                console.log("Error! Can't find this city, please check the spelling." + error);
            });
        });

        var fiveDayForecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        console.log(fiveDayForecastQueryURL);
        $.ajax({
            url: fiveDayForecastQueryURL,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            let t = 6;
            for (var i = 1; i < 6; i++) {
                // console.log("i=" + i);
                // console.log("t=" + t);
                var temperatureKelvin = response.list[t].main.temp;
                // console.log(temperatureKelvin);
                var timeStamp = response.list[t].dt_txt;
                var time = moment(timeStamp).format('l');
                // console.log("TIME" + time);
                // // console.log(timeStamp);
                // var forecastDate = convertUnixDate(timeStamp);
                // let day = (forecastDate.getDate() < 10 ? '0' : '') + forecastDate.getDate();
                // let month = (forecastDate.getMonth() < 9 ? '0' : '') + (forecastDate.getMonth() + 1);
                // let year = forecastDate.getFullYear();
                $("#day" + i + "Date").text(time);

                var temperatureKelvin = response.list[t].main.temp;
                var tempF = kelvintoFahr(temperatureKelvin);
                $("#day" + i + "Temp").text("Temp: " + tempF + " F");

                //get and display the humidity for the city
                var humidity = response.list[t].main.humidity;
                $("#day" + i + "Humidity").text("Humidity: " + humidity + " % ")

                //get the icon for the weather
                var iconCode = response.list[t].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                $("#" + i + "Icon").attr("src", iconURL);
                // console.log(iconCode);
                t = t + 8;
            }
        }).catch(function(error) {
            console.log("error!" + error);
        });
    }

    $(document).on("click", ".historyButton", function(event) {
        event.preventDefault();
        console.log("History button clicked");
        let newCity = $(this).attr("value");
        console.log(newCity);
        displayInformation(newCity);
        newCity = "";

    })

    function addToArray(city) {
        console.log(searchHistory.length);
        var cityDNE = true;
        if (searchHistory.length < 6) {

            // console.log(cityDNE);
            for (let i = 0; i < searchHistory.length; i++) {
                if (city === searchHistory[i]) {
                    cityDNE = false;
                    console.log("city already exists in array");
                }
            }
            // console.log(cityDNE);
            if (cityDNE) {
                searchHistory.push(city);
                console.log(searchHistory);
                // historyCount++;
                // console.log(searchHistory.length);
                prependCity(searchHistory);
            }
        } else {

            for (let x = 0; x < searchHistory.length; x++) {
                if (city === searchHistory[x]) {
                    cityDNE = false;
                    console.log("city already exists in array");
                }
            }
            if (cityDNE) {
                searchHistory.push(city);
                searchHistory.shift();
                console.log(searchHistory);
                prependCity(searchHistory);
                // historyCount++;
                // console.log(searchHistory.length);
            }
        }
    }

    function prependCity(searchHistory) {
        $("#previousSearches").empty();
        for (let i = 0; i < searchHistory.length; i++) {
            var buttonEl = $("<button>");
            buttonEl.text(searchHistory[i]);
            buttonEl.attr("class", "historyButton");
            buttonEl.attr("type", "submit");
            buttonEl.attr("value", searchHistory[i]);
            $("#previousSearches").prepend(buttonEl);
        }
        let lastCity = searchHistory[searchHistory.length - 1];
        localStorage.setItem("lastCity", JSON.stringify(lastCity));
    }

    // function convertUnixDate(unixValue) {
    //     var unixTime = unixValue;
    //     // console.log(unixTime);
    //     var dt = unixTime * 1000;
    //     var date = new Date(dt);
    //     return (date);
    // }

    function kelvintoFahr(kelvinTemp) {
        var temperatureKelvin = kelvinTemp;
        // console.log(temperatureKelvin);
        var tempF = parseInt((temperatureKelvin - 273.15) * 1.8 + 32);
        // console.log(tempF);
        return tempF;
    }
})