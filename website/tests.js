let date2 = new Date();
let newDate2 = date2.toDateString();
// Personal API Key for OpenWeatherMap API
const baseURL2 = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey2 = ",&appid=f8a771601a9624cb98f25476e904ee37&units=imperial";
var zip2 =[10001,10002,75000,06365];
const feelings2="happy";

const getWeatherData2 = async(zip)=>{
    try{
        const response= await fetch(baseURL2+zip+apiKey2);
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
for(var i=0;i<zip2.length;i++){
getWeatherData(zip2[i]).then((data)=>{
    if(data){
        //unpack data from json
        console.log(data);
         const  temp=data.main["temp"];
         const  city=data.name;
        const   description=data.weather["0"]["description"];

        const info ={
            newDate2,city,
            temp:Math.round(temp),
            description,
            feelings2,
        };//put data in container object to send to server
        console.log(info);}});}