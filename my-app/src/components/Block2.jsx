import React from "react";
import { useState } from "react";

const Block2 = () => {
    const [displayBlock2, setDisplayBlock2] = useState(false)
    const [listWeather, setListWeather] = useState({})

    let arrCities = ['Kyiv', 'Dnipro', 'Kryvyi Rih', 'Kharkiv', 'Odessa']

    const DisplayList = (props) =>{
        console.log(props)
        if(props.props.cod == 400){
            return <h2 className='info'>Не найдено</h2>
        }else if(props.props.cod == 200){
            return <ul className='info'>
                <li>Город: {props.props.name}</li>
                <li>Облака: {props.props.clouds.all}</li>
                <li>температура: {props.props.main.temp}</li>
                <li>манимальная: {props.props.main.temp_min}, максимальная: {props.props.main.temp_max}, ощущается как: {props.props.main.feels_like}</li>
                <li>Видимиость: {props.props.visibility}</li>
                <li>main: {props.props.weather[0].main}</li>
                <li>тип облачности: {props.props.weather[0].description}</li>
                <li>скорость ветра: {props.props.wind.speed}</li>
                <li>направление ветра: {props.props.wind.deg} deg</li>
                <li>порыв ветра: {props.props.wind.gust}</li>
            </ul>
        }
    }

    const getPrognoz = async (cityName) =>{
        let prognoz = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4f2046a70811752d8e02bbb08a692585`)
        let infoPrognoz = await prognoz.json()
        setListWeather(infoPrognoz)
    }
    window.onscroll = () =>{
        setDisplayBlock2(true)
    }

    if(displayBlock2 == true) return (
        <div className="block2">
            <p>{arrCities.map((nameCity, idx)=> <span key={idx} onClick={()=>getPrognoz(nameCity)}>{nameCity} </span> )}</p>
            <DisplayList props={listWeather}/>
        </div>
    )
    else{return }
    
}

export default Block2