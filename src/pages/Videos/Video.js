import React from 'react'
import './videos.css'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import {useParams} from 'react-router-dom' 
import Recommended from '../../components/Recommended/Recommended' 

const Video = () => {

    const{videoId,categoryId} = useParams();
    return (
        <div className='play-conatiner'>
            <PlayVideo videoId={videoId}/>
            <Recommended  categoryId={categoryId} />
        </div>
    )
}
export default Video