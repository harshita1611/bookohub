"use client"
import { TextField } from "@mui/material"
import { Poppins } from "next/font/google"
import Button from '@mui/material/Button';
import { useEffect, useState,useRef } from "react";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUser } from "@clerk/nextjs";

const poppins=Poppins({subsets:['latin'],
weight:['400','500','600','700','800','900']})


export default function RentBooks(){

    const title=useRef()
    const price=useRef()
    const [image,setImage]=useState()
    const [reader,setReader]=useState()
    const {user} = useUser();
    const postImage=()=>{
        console.log(user.id,"inside postImage")
        fetch('/api/lendBook',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:title.current.value,
                price:price.current.value,
                owner:user.id,
                image:image
            })
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
        })
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
        // e.preventDefault();
        console.log("Worked ?")
        console.log(title.current.value,price.current.value,image)
        postImage();
    }

    useEffect(()=>{
        setReader(new FileReader());
    },[])

    return (
        <div className={`h-screen bg-blue-400 ${poppins.className} `}>
            Book Decription
            <form action="" className="flex m-auto bg-white p-5 flex-col w-[500px] gap-5">
                <div className="font-bold text text-4xl">
                    Rent A Book
                </div>
                <div className="flex flex-col gap-2">
                    <TextField id="title" label="Title" variant="outlined" ref={title}  />
                </div>
                <div className="flex flex-col">
                    <TextField id="price" label="Price" variant="outlined" ref={price}/>
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
    )
}