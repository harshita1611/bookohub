"use client"
import { TextField,Button } from "@mui/material"
import { Poppins } from "next/font/google"
import { useEffect, useState,useRef } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import Navbar from "../components/navbar"

const poppins=Poppins({subsets:['latin'],
weight:['400','500','600','700','800','900']})


export default function RentBooks(){

    // const title=useRef()
    const [title,setTitle]=useState()
    const [price,setPrice]=useState()
  
    const [image,setImage]=useState()
    const [reader,setReader]=useState()
    const {isSignedIn,user} = useUser();
    const postImage=()=>{
        console.log(user.id,"inside postImage")
        fetch('/api/lendBook',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:title,
                price:price,
                owner:user.id,
                image:image
            })
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
        })
        alert("Book Uploaded")
    }

    const uploadBook=(e)=>{
        reader.onload=(e)=>{
            setImage(e.target.result)
            console.log(e.target.result)
        }
        const f=e.target.files[0];
        const check=reader.readAsDataURL(f);
    }

    const getFormData=(e)=>{
        e.preventDefault();
        // title.current.focus();
        // price.current.focus();      
        // console.log(title,price,"title,price,Not current")  
        // console.log(title,price,"title,price")
        postImage();
    }


    useEffect(()=>{
        setReader(new FileReader());
    },[])

    if (isSignedIn){

        return (
            <div className={`h-screen bg-blue-400 ${poppins.className} `}>
            <Navbar/>
            Book Decription
            <form action="" className="flex m-auto bg-white p-5 flex-col w-[500px] gap-5">
                <div className="font-bold text text-4xl">
                    Rent A Book
                </div>
                <div className="flex flex-col gap-2">
                    <TextField id="title" label="Title" variant="outlined" onChange={(e)=>{setTitle(e.target.value)}}  />
                </div>
                <div className="flex flex-col">
                    <TextField id="price" label="Price" variant="outlined" onChange={(e)=>{setPrice(e.target.value)}}  />
                </div>
                <div className="flex flex-col">
                    <Button component="label" variant="contained" >
                        Upload file
                        <input onChange={uploadBook} type="file" hidden />
                    </Button>
                </div>
                <div className="flex flex-col">
                    <Button onClick={getFormData} variant="contained" >
                        Submit
                    </Button>
                </div>

            </form>
        </div>
    )}

    else{
        return(
            <SignIn/>
        )
    }
}