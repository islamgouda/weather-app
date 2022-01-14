//get the date today
let date = new Date();
let newDate = date.toDateString();
// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=f8a771601a9624cb98f25476e904ee37&units=imperial";
// Event listener to add function to existing HTML DOM element
const server = "http://127.0.0.1:8000";


/* Function called by event listener */
/*this function calls getWeatherData to generate data */
/* getWeatherData returns the data from api */
/*get required data and send it to server */
/*and update the user interface */
const generateData = ()=>{
    //get data from document
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeatherData(zip).then((data)=>{
        if(data){
            //unpack data from json
            console.log(data);
             const  temp=data.main["temp"];
             const  city=data.name;
            const   description=data.weather["0"]["description"];

            const info ={
                newDate,city,
                temp:Math.round(temp),
                description,
                feelings,
            };//put data in container object to send to server
            console.log(info);
            postDataToServer(server+"/add",info);//send data to server
            updateForm();
        }
        });
    
};
document.querySelector("#generate").addEventListener("click",generateData);
/* Function to GET Web API Data*/
const getWeatherData = async(zip)=>{
    try{
        const response= await fetch(baseURL+zip+apiKey);
        const data = await response.json();
        console.log(data);
        if(data.cod!=200){
            alert("enter Right Data");
            throw `${data.message}`;
        }
        return data;
    }
    catch(error){
        console.log(error);
    }
};
/* Function to POST data */
const postDataToServer= async(URL="",info={})=>{
    const res=await fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(info),
    });
    try{
        const newData=await res.json();
        console.log("data saved",newData);
        return newData;
    }
    catch(error){
        console.log(error);
    }

    };
    const updateForm = async()=>{
        const res = await fetch(server+"/all");
        console.log("formUI",res);
        try{
            const savedData=await res.json();
            document.getElementById("date").innerHTML="";
            document.getElementById("city").innerHTML="";
            document.getElementById("temp").innerHTML="";
            document.getElementById("description").innerHTML="";
            document.getElementById("content").innerHTML="";
    /**************************** */
            document.getElementById("date").innerHTML="ToDay"+" : "+savedData.newDate;
            document.getElementById("city").innerHTML="City"+" : "+savedData.city;
            document.getElementById("temp").innerHTML="Temprature"+" : "+savedData.temp;
            document.getElementById("description").innerHTML="description"+" : "+savedData.description;
            document.getElementById("content").innerHTML="Feelings"+" : "+savedData.feelings;

        }
        catch(error){
            console.log(error);
        }
    }



