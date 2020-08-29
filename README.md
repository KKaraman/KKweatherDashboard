# KKweatherDashboard

The HTML template for this app was created using BootStrap templates. 
The design was customized using CSS. 
JQuery and Javascript were used for functionality. 
Moment.Js was used to get the current date and time for display.

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
    - weather dashboard title block was written in sky blue with white font to represent the sky
WHEN I search for a city
    - to search, first enter the city name and then click submit button or press enter
    - if you mistype a city or dont type a city, the console log will display an error and nothing is done with that information
THEN I am presented with current and future conditions for that city and that city is added to the search history
    - Up to 6 recent searches are displayed
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    - there is a detailed description to communicate what the UV index means
    - there is also color coding, green, orange and red at different levels based on expert recommendations.
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
    - Up to 6 recent searches are displayed and the user can click on the name to pull the conditions back up
    - After the 6 different searches, the cities will go through a FIFO, first in first out elimination
    - The user can clear the search history by pushing clear button.  This will maintain only the last seach which has been sotred in local storage.
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
    -  When the page is refreshed, only the last city searched for will be stored in local storage and will be shown when the page comes back up

Link to an image of the app: ./images/projectScreenCapture.png 
Link to the code: https://kkaraman.github.io/KKweatherDashboard/
Link to the repo: https://github.com/KKaraman/KKweatherDashboard