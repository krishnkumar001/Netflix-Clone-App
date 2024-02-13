import React, { useEffect, useState } from 'react'
import axios from '../constants/axios'
import {Api_Key,image_url} from '../constants/constants'
import './Banner.css'

function Banner() {
  const [movie,setMovie] = useState()
 useEffect( ()=>{
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${Api_Key}&language=en-US`).then((response)=>{
      // console.log(response.data.results[0])
      // setMovie(response.data.results[0])

      if (response.data.results && response.data.results.length > 0){
        const randomIndex = Math.floor(Math.random() *response.data.results.length)
        setMovie(response.data.results[randomIndex])
      }
    })
 },[])

  return (
    
    <div 
    style={{backgroundImage:`url(${movie ? image_url+ movie.backdrop_path
      :""})`}}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title: ""}</h1>
            <div className='banner_buttons'>
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'>{movie ? movie.overview:""}</h1>
        </div>
      <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner
