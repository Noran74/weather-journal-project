/* Global Variables */


// credentials and Api key
const baseURL='https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey='&appid=7c20457ba899b38d237786fe9e4337de&units=metric'
// Create a new date instance dynamically with JS
const date = new Date();
const newDate = date.getMonth() + 1 + '/'+ date.getDate() +'/'+ date.getFullYear();

//select generate button

const button=document.getElementById('generate');
//addEventListener to button
button.addEventListener('click',generateData);

    // callback function called by event listener
    function generateData(e){
        e.preventDefault();
    const zipCode=document.getElementById('zip').value;
    const feeling=document.getElementById('feelings').value;
    
    getWeather(baseURL,zipCode,apiKey).then
    (function(data){

console.log(data);
postData('/add',{date:newDate,temp:data.main.temp,content:feeling});

    }).then(()=>updateUI())

    }

    //function GET async api

    // async GET we callback with parameters
const getWeather= async(baseURL,zipCode,apiKey)=>{
try{
const response=await fetch(baseURL+zipCode+apiKey);


const data=await response.json();
console.log(data);
if(data.cod!= 200){

alert('City is not found');//alert message if you enter invalid zipcode

}

return data

}

catch(error){
    console.log('error',error);

}

};
//function POST async to add data
//chain Promise that makes a POST request
const postData=async(URL='',data={})=>
{

console.log(data);
const response=await fetch(URL,{
    method:'POST',
    credentials:'same-origin',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data),});//changing json into objects
    

try{const newData=await response.json();
console.log(newData);
return newData;}
 catch(error){console.log('error',error)}

}
//chain another Promise that update the UI dynamically using async
const updateUI=async()=>{

const request=await fetch('/all');//to retrieve the data from our app
try{
const allData=await request.json();//transform into JSON
console.log(allData);
//update the values needed to appear in our app
document.getElementById('date').innerHTML=`Date is:${allData.date}`;
document.getElementById('temp').innerHTML=`Temperture:${Math.round(allData.temp)} C`;
document.getElementById('content').innerHTML=`I feel ${allData.content}`;

}
//catch any error
catch(error){
    console.log('error',error);
}

}



