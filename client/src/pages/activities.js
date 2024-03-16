import React from 'react'
import Navbar from "./components/navbar"
import "../App.css"
import { useState } from 'react'

const Activities = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [maxPlaces, setMaxPlaces] = useState('');
    const [duration, setDuration] = useState('');
    const [time, setTime] = useState('');
    const [category, setCategory] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState(100);


    return (

        <>
        <Navbar></Navbar> 
        
        <form className='form-style'>

            <label>Title</label>
            <input type="text" value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='title, for example: yoga course'/>
            

            <label>Description</label>
            <input type="textarea" value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='Description' className='form-desciption'/>
            

            <label>Date</label>
            <input type="date"value={date}
            onChange={(e)=>setDate(e.target.value)}/>


            <label>Location</label>
            <input type="text" value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='location'/>


            <div>

            <label>MaxPlaces</label>
            <input type="text" value={maxPlaces}
            onChange={(e)=>setMaxPlaces(e.target.value)}
            placeholder='50p'/>


            <label>Duration</label>
            <input type="text" value={duration}
            onChange={(e)=>setDuration(e.target.value)}
            placeholder='2h'/>


            <label>Time</label>
            <input type="text" value={time}
            onChange={(e)=>setTime(e.target.value)}
            placeholder='14:00'></input>

            </div>

            <label>category</label>
            <select value={category}
            onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Yoga</option>
            <option value="">Boxing</option>
            <option value="">Swimming</option>
            </select>
        
            <label>Photos</label>
            <div className='form-style-display'>
            <input type="text" value={photoLink}
            onChange={(e)=>setPhotoLink(e.target.value)}
            placeholder='add using a link ...'></input>
            <button>Add photo</button>
            </div>
            <button>+ Upload</button>
        </form>
        </>
       

    )
}

export default Activities;