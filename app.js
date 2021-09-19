/* Global Variables */
const zip = document.getElementById('zip');
const planning = document.getElementById('planning');
const searchBtn = document.getElementById('searchBtn');

// Create a new date instance dynamically with JS
let d = new Date();
let dateNow = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '59c6d9f2283e68647beb84308ae10643';

/* Function to GET Web API Data*/
const collectData = async (url='') =>{ 
    const req = await fetch(url);
    try {
        return  await req.json();
    }
    catch(error) {
      console.log("Error is: ", error);
    }
  }
  
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    data.planning = planning.value;
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },     
        body: JSON.stringify(data)
    });
    try {
        console.log(response);
        return await response.json();
      } catch(error) {
            console.log("Error", error);
      }
  }

// Function to update the app with the required information
const updatePage = async (url = '') => {
    const updateRequest = await fetch(url);
    try {
        const updateResponse = await updateRequest.json();
        const userPlans = document.getElementById('userPlans');
        const date = document.getElementById('date');
        const temp = document.getElementById('temp');
        const content = document.getElementById('content');
        date.innerHTML = `Today's date: ${dateNow}`;
        temp.innerHTML = `Temperature: ${updateResponse.temp} ${'&deg;'}C`;
        content.innerHTML = `Your plans for today: ${planning.value}`;
        userPlans.classList.remove('hide');
    } catch (error){
        console.log('Error is',error);
    }
}

// Event listener to check validation of zip code
searchBtn.onclick = (event) => {
    event.preventDefault();
    const isValidUSZip = /^\d{5}(-\d{4})?$/.test(zip.value);
    zip.onclick = () => zip.classList.remove('alert');
    if (isValidUSZip) {
        const requiredURL = `${baseURL}${zip.value},us&appid=${apiKey}&units=metric`;
        collectData(requiredURL)
        .then(data => postData('/all', data))
        .then(updatePage('/get'));
        zip.value = '';
    } else {
        zip.classList.add('alert');
        window.alert('Please enter a valid US Zip Code.'); 
    }
    
}
