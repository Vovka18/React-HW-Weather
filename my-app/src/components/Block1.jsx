import React, { useState } from 'react'
import sortCities from "../jsonFiled/ukAllCities.jsx"


const Block1 = () => {
    const [nameCities, setNameCities] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [listWeather, setListWeather] = useState({})

    let renderListCity = []
    const CreateHelpList = (props) =>{
        return <ul className="helpUl">
            {props.props.map((city, idx)=><li onClick={()=>replaceValueInput(city)} key={idx}>{city}</li>)}
        </ul>
    }
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
    function replaceValueInput(nameCity){   //input.value = то что ты нажал
        setInputValue(nameCity)
        setNameCities([])
    }
    const helpSearch = async (e) =>{    //отбор подходящих поселений
        setInputValue(e.target.value)
        if(e.target.value.length > 1){
            for(let searchSymb in sortCities){
                if(searchSymb == e.target.value[0]){
                    sortCities[searchSymb].forEach(city=>{if(city.indexOf(e.target.value) != -1) renderListCity.push(city)})
                }
            }
            setNameCities(renderListCity)
            console.log(renderListCity)

        }else setNameCities([])
    }

    return (
        <div className="block1">
            <input type="text" placeholder='Введите город' onChange={helpSearch} value={inputValue} />
            <CreateHelpList props={nameCities}/>
            <input type="button" value="посмотреть" onClick={()=>getPrognoz(inputValue)}  />
            <DisplayList props={listWeather} />
        </div>
    )
}

export default Block1;

