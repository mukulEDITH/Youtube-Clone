import React, { useEffect, useState } from 'react';
import './PlayVideo.css'; // Assuming you meant to import a CSS file, adjust if necessary

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';

import { API_KEY } from '../../data';   
import { value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
// import uimage from '../../assets/dp.jpeg'; // Check this path

const PlayVideo = () => {
    const{videoId} = useParams();
    console.log(videoId)


  
 const [apiData , setApiData] = useState([]);
 const [channelData,setChannelData]= useState([]);

const fetchVideoData = async () =>{
    //fetching videos data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`

    await fetch(videoDetails_url).then(res=>res.json()).then(data => setApiData(data.items[0]))
}       

const fetchOtherData = async ()=>{  

    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet?.channelId}&key=${API_KEY}`
    await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data?.items?.[0]))
}


useEffect(()=>{
    fetchOtherData();
},[apiData])


 useEffect(()=>{
    fetchVideoData();

 },[videoId])

    return (
        <div className='play-video'>
            {/* <video src={video1} controls autoPlay muted ></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1` }  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <h3>{apiData ? apiData?.snippet?.title:"Titlehere"}</h3>
            <div className='play-video-info'>
                <p>{apiData ? value_converter(apiData?.statistics?.viewCount): "15k"} views {moment(apiData?.snippet?.publishedAt).fromNow()}</p>
                <div>
                    <span><img src={like} alt=""/>{apiData ? value_converter(apiData?.statistics?.likeCount): "15k"}</span>
                    <span><img src={dislike} alt=""/>{apiData ? value_converter(apiData?.statistics?.likeCount): "15k"}</span>
                    <span><img src={share} alt=""/>{apiData ? value_converter(apiData?.statistics?.likeCount): "15k"}</span>
                    <span><img src={save} alt=""/>{apiData ? value_converter(apiData?.statistics?.likeCount): "15k"}</span> 
                </div>
            </div>
            <hr/>
            <div className='publisher'>
                <img src={channelData ? channelData?.snippet?.thumbnails?.default.url : ""} alt=''/>
                <div>
                    <p>{apiData ?  apiData?.snippet?.channelTitle : "Mukul Kaushal"}</p>
                    <span>{channelData ? value_converter(channelData?.statistics?.subscriberCount) : "1M"}</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className='video-description'>
                <p>{apiData ? apiData?.snippet?.description.slice(0,250): "15k"}</p>
                  
                <hr/>
                <h4>{apiData ? value_converter(apiData?.statistics?.commentCount) : "155"} </h4>
                <div className='comment'>
                    
                    <div>
                        <h3>Mukul kaushal <span>1 day ago</span></h3>
                        <p>A global computer network providinng a variety of information of interconnected network</p>
                        <div className='comment-action'>
                            <img src={like} alt=''/>
                            <span>244</span>
                            <img src={dislike} alt=''/>
                        </div>
                    </div>
                </div>
                {/* Additional comments... */}
            </div>
        </div>
    );
};

export default PlayVideo;
