/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=95369f4ca68bc9aeb5bdfa6d2f3331fc';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Get weather data from the weather API
const weatherData = async (baseURL, zipCode, key)=>{

    const res = await fetch(baseURL+zipCode+key)
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
    }
}

// Post data to the server
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log('error', error);
  }
}
  
// Fetches the data if no data is passed to the route
const updateUi = async (data) => {
    if (!data) {
        const request = await fetch('/all');
        try {
            data = await request.json();
          } catch(error) {
            console.log('error', error);
          }
    }

    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.userResponse;
  }

// On click handler
const clickHandler = (event) =>{
    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;
   
    weatherData(baseURL, zipCode, apiKey)
  
    .then(function(data) {
      postData('/add', {temperature: data.main.temp, date: newDate, userResponse: userFeelings})
        .then(res => updateUi(res));
    })
  }


document.getElementById('generate').addEventListener('click', clickHandler);