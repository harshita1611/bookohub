"use client"
import Link from 'next/link'
import { useUser,UserButton, SignIn } from '@clerk/nextjs'
import { useEffect,useState } from 'react'
// import { Button } from '@mui/material'
import Button from '@mui/material-next/Button';

export default function Navbar(){


    const {isLoaded,isSignedIn,user}=useUser()
    console.log(isSignedIn,"isSignedIn")
    // useEffect(()=>{
    //     if(isLoaded && isSignedIn){
    //         // setIsSignedIn(true)
    //     }
    // })

    return (
        <div className="flex gap-10 font-semibold text-lg justify-around w-screen h-20 items-center">
            <div>
                Logo
            </div>
            <div className='flex gap-5'>
              
                <Link href="/" className="hover:bg-[#1976d2] p-2 py-1 rounded duration-300"> 
                    <button href="/">
                        Home
                    </button>
                </Link>
                <Link href="/lendBooks" className="hover:bg-[#1976d2] p-2 py-1 rounded duration-300">
                    <button>
                        Lend Books
                    </button>
                </Link>
                <Link href="/browseBooks" className="hover:bg-[#1976d2] p-2 py-1 rounded duration-300">
                    <button>
                        Browse Books
                    </button>
                </Link>
            </div>
            <div>

            {
                (isSignedIn) &&
                (
                    <div className='flex gap-5 '>
                        <Link href="/profilePage">
                            {user.firstName}
                        </Link>
                        <UserButton/>
                    </div>   
                )                   
                }
            {
                (!isSignedIn) &&
                (
                    <Link href="/sign-in" className="hover:bg-[#1976d2] p-2 py-1 rounded duration-300">
                        <button>
                            Sign-in
                        </button>
                    </Link>
                )
            }
            </div>
        </div>
    )
}