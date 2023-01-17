import React,{useState,useEffect} from "react";
import Axios from "axios";
//import {BrowserRouter as Link,Router,Route,Switch} from 'react-router-dom';

//const api=require("axios");

function YoutubeAPI(){
    const [params,setParams]=useState({
        key:'fff64a121b32f29538c9682fca4f51422ea0201a',
        part:"snippet",
        q:encodeURI("asmr"),
        maxResult:2,
        type:'video',
        videoDuration:'long',      
    });

    const [playlist,setPlayList]=useState([]);
    Axios.defaults.baseURL='https://www.googleapis.com/youtube/v3/';
    
    useEffect(()=>{
        Axios.get('/search',{params})
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            setPlayList(res.data.items);
        })
        .catch((err)=>{console.log((err.message))});
    },[]);
    console.log(playlist);

    /*return(
        <div>
            <Switch>
                <Route exact path='/'>
                    <div>
                        {playlist && 
                            playlist.map((i,index)=>{
                                return(
                                    <div className='playlist' key={index}>
                                        <img src={i.snippet.thumnails.high["url"]} alt=""/>
                                        <Link to={"/playlist/"+i.id}>
                                            <h1>{i.snippet.localized["title"]}</h1>
                                        </Link>
                                        <p>{i.snippet.localized["description"]}</p>
                                    </div>
                                );
                            })
                        }               
                    </div>
                </Route>
            </Switch>
        </div>
    );*/
}

export default YoutubeAPI;