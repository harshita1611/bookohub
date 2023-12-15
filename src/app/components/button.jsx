export default function button(props){
    return(
        <div className="flex gap-1 font-semibold hover:bg-gray-300 hover:cursor-pointer rounded-xl p-2">
            {props.icon}
            {props.title}
        </div>
    )
}