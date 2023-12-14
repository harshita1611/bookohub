"use client"

import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const {user} = useUser();
    
    const checkUser=async ()=>{
        await fetch('/api/checkUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:user.emailAddresses[0].emailAddress,
                id:user.id,
                name:user.firstName,
            })
        })
    }

    if (user) {
        checkUser()
    }

    return (
        <div>
            <h1>Home</h1>
            <UserButton afterSignOutUrl="/"/>
            <button>Get Started</button>
            <div>
                user: {user ? user.id : "no user"}
            </div>
        </div>    
    )
}
