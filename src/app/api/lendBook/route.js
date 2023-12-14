// console.log(db);
import {client} from '../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request,response){
    try{
        console.log(request.body)
        const res=await request.json()
        const {title,price,owner,image}=res;
        // console.log(title,price,owner,image,"lendBook");
        const conn=await client.connect();
        const db=conn.db('bookohub');
        await db
            .collection("booksOnRent")
            .insertOne({
                title:title,
                price:price,
                owner:owner,
                image:image,
                onRent:false
            })
        console.log("request.body");
        
        return NextResponse.json({msg:"success"})
    }
    catch(err){
        return NextResponse.error(err);
    }
}