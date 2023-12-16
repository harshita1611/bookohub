"use client"

import { useUser,UserButton,SignIn } from "@clerk/nextjs"
import { useEffect,useState } from "react"
import Link from 'next/link'
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
import { SiBookstack } from "react-icons/si";
import { TbBooks,TbBooksOff } from "react-icons/tb";
import Btn from "../components/button";
import { IoBookSharp } from "react-icons/io5";


export default function profilePage() {
    
    const {isSignedIn, user} = useUser()
    // console.log(user,"user")
    const [books,setBooks]=useState([])
    const [maxId,setMaxId]=useState(4)
    
    useEffect(() => {
        const width=window.innerWidth
        if(width>1919){
            setMaxId(18)
        }
        else if(width>1535){
            setMaxId(11)
        }
        fetch("/api/browseAllBooks")
        .then(res => res.json())
        .then(res => {
            setBooks(res)
            console.log(res)
        })
    }, [])

    const changeDisplay=(e)=>{
        console.log(e.target.innerText)
    }
    const finalBookTitle=(title)=>{
        console.log(title.length)        
        if(title.length>13){
            return title.slice(0,13)+"..."
        }
        else{
            return title
        }
    }
    // console.log(window.innerWidth,"width")

    const { signOut } = useClerk();
    const router = useRouter()
    if (isSignedIn){

        return (
            <div className="flex bg-[#101418] h-screen ">
            <div className="Navbar w-[16%] h-screen bg-white flex flex-col">
                {
                    (isSignedIn) &&
                    (
                        <div className='flex flex-col justify-center items-center '>
                                <img src={user.imageUrl} onClick={() => signOut(() => router.push("/"))} className="rounded-[100%] p-5" alt="" />
                            <div className="flex gap-5 items-center">
                                <Link href="/profilePage">
                                    {user.firstName}
                                </Link>
                                <UserButton/>
                            </div>
                        </div>   
                    )
                }
                <div className="flex flex-col p-5 min-[1535]:text-[80%] gap-2">

                    <Btn
                        title="Books Borrowed"
                        icon={<TbBooks size={20}/>}
                        onClick={changeDisplay}
                        />
                    <Btn
                        title="Books Lent"
                        icon={<TbBooksOff size={20}/>}
                        onClick={changeDisplay}
                        />
                    <Btn
                        title="Lent a Book"
                        icon={<IoBookSharp size={20}/>}
                        onClick={changeDisplay} 
                        />
                    <Btn
                        title="Get a Book"
                        icon={<IoBookSharp size={20}/>}
                        onClick={changeDisplay} 
                        />
                    <hr />
                    <div>
                        <Btn
                            title="Your Collection"
                            icon={<SiBookstack size={20}/>}
                            onClick={changeDisplay}
                            />

                        <div className="pl-4 gap-2">
                        {
                            books.map((book,index)=>
                            (book.owner==user.id) && (index<maxId)&&
                            (
                                <div className="flex font-semibold text-[13px] opacity-80">
                                    <li>
                                        {finalBookTitle(book.title).toUpperCase()}
                                    </li>
                                </div>
                                )
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full">
                    
            </div>
        </div>
    )
    }
    else{
        return (
            <div>
                <SignIn/>
            </div>
        )
    }
}