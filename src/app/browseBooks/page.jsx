export default function BrowseBooks(){
    return (
        <div className="h-screen bg-blue-400">
            Book Collections
            <div className="grid grid-cols-5 justify-items-center gap-10 w-full bg--900">
                <div>
                    <img className="h-96" src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/410nynxH30L.jpg" alt="" />
                    <div className="">
                        <h1 className="text-2xl">Titleaaa aaaa  sss... </h1>
                        <h2 className="text-xl">Author</h2>
                        <p className="text-lg">Description</p>
                    </div>
                </div>
            </div>
        </div>
    )
}