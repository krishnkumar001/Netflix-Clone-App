import React,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'

import {image_url,Api_Key} from '../constants/constants'
import axios from '../constants/axios'

function RowPost(props) {
  const [movies,setMovies] = useState([])
  const [UrlId,setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovies(response.data.results)
    }).catch(err=>{
      alert('Network error')
    })
  },[])

  const opts = {
    height: '200',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

const handleMovie=(id)=>{
  console.log(id)
  axios.get(`/movie/${id}/videos?api_key=${Api_Key}&language=en-US`).then(response=>{
    console.log(response.data)
    if(response.data.results.length !==0){
      setUrlId(response.data.results[0])
    }else{
      console.log('Array Empty')
    }
  })
}

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>
           <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} src={`${image_url+obj.backdrop_path}`} alt="Posters" />
        )}
       
      </div>
      { UrlId && <Youtube  opts={opts} videoId={UrlId.key} /> }
    </div>
  )
}

export default RowPost
