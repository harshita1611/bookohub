"use client"
import { useEffect,useState } from "react"
import Navbar from "../components/navbar"
import { TextField } from "@mui/material"
import { IoSearch } from "react-icons/io5";
export default function BrowseBooks(){

    const [books,setBooks]=useState([])
    const [allBooks,setAllBooks]=useState([])
    const [focusedBook,setFocusedBook]=useState({"title":"","price":"","image":""})
    const [searchedBookName,setSearchedBookName]=useState()


    useEffect(()=>{ 
        fetch('/api/browseAllBooks')
        .then(res=>res.json())
        .then(res=>{
            setBooks(res)
            setAllBooks(res)
            setFocusedBook({...focusedBook,title:res[0].title,price:res[0].price,image:res[0].image})
        })
    },[])

    const showFocusedImage=(e)=>{
        const targetElem=e.target.parentNode
        console.log(e.target.parentNode.children[0].innerText,"showing focused things")
        setFocusedBook({...focusedBook,title:targetElem.children[2].children[0].innerText,price:targetElem.children[2].children[1].innerText,image:targetElem.children[1].src})
        console.log(focusedBook)
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

    const bookSearch=(e)=>{
        const search=e.target.value
        if (search.length==0){
            setBooks(allBooks)
            return 
        }
        const filteredBooks=books.filter(book=>{
            const title=book.title.toLowerCase()
            let i=0;
            let j=0;
            let count=0
            while (j<title.length){
                if (search[i]==title[j]){
                    i++;
                }
                j++;
            }
            if (i>(search.length-1)){
                return book
            }
        })
        setFocusedBook({...focusedBook,title:filteredBooks[0].title,price:filteredBooks[0].price,image:filteredBooks[0].image})
        setBooks(filteredBooks)
    }

    return (
        <div className="bg-[#101418] text-gray-200">
            <Navbar/>
            <div className="flex justify-around md:pt-12 ">

                <div className="highLightBooks w-[30%] h-[580px] bg-[#489AC8] rounded-xl text-[#040b0e] p-5">
                    <div className="pb-5 flex">
                        <TextField label="Search Books" variant="outlined" className="w-full " onChange={bookSearch}/>
                        {/* <div> */}
                            <IoSearch size={50} className="ml-2 hover: cursor-pointer" onClick={bookSearch}/>
                        {/* </div> */}
                    </div>

                    <div className="">
                        <img className="h-[400px]" src={focusedBook.image} alt="Image"/>
                    </div>
                    <div className="pt-4">
                        <h1 className="text-[20px]">{
                            focusedBook.title.toUpperCase()
                            }
                        </h1>
                        <h2 className="text-xl">{focusedBook.price}</h2>
                    </div>

                </div>
                {/* <iframe src="/lendBooks" title="W3Schools Free Online Web Tutorials"></iframe> */}
                <div className="grid grid-cols-5 justify-items-center gap-y-32 gap-x-5 min-[1536px]:gap-x-10 overflow-auto ">

                    {   
                        books.map(book=>(
                            <div className="h-56 w-48 bg-white rounded-xl" onClick={showFocusedImage}>
                                <div className="hidden" name="id">
                                    {book._id}
                                </div>
                                <img className="h-56 object-none rounded-xl w-48" src={book.image} alt="Images" />
                                <div className="mt-5">
                                    <h1 className="text-[20px]">{
                                        finalBookTitle(book.title).toUpperCase()
                                        }
                                    </h1>
                                    <h2 className="text-xl">₹{book.price}</h2>
                                </div>
                            </div>
                        )
                        )}
                </div>
            </div>
        </div>
    )
}