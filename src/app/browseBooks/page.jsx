"use client"
import { useEffect,useState } from "react"

export default function BrowseBooks(){

    const [books,setBooks]=useState([])
    useEffect(()=>{
        fetch('/api/browseAllBooks')
        .then(res=>res.json())
        .then(res=>{
            setBooks(res)
            console.log(res)
        })
    },[])

    books.map(book=>{
        console.log(book.title,"second check")
    })
    const style=""
    return (
        <div className="h-screen bg-blue-400">
            Book Collections
            <div className="grid grid-cols-5 justify-items-center gap-10 bg--900">

                {   
                    books.map(book=>(
                        <div className="bg-white ">
                            <img className="h-full object-contain" src={book.image} alt="Images" />
                            <div className="">
                                {console.log(book.title,"final check")}
                                <h1 className="text-2xl">Book Title : {book.title}</h1>
                                <h2 className="text-xl">Price : {book.price}</h2>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}