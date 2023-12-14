import {client} from '../../../lib/mongodb';
import { NextResponse } from 'next/server';
export async function POST(request, response) {
    try {

        const {email,id,name} = request.json();
        const conn = await client.connect();
        const db = conn.db('bookohub');
        const user=await db.collection("users").findOne({email:email});
        if (!user){
            await db.collection("users").insertOne({
                email:email,
                id:id,
                name:name
            })
        }
        return NextResponse.json({
            msg: "New User Added",
        });
    } catch (err) {
        return NextResponse.error(err);
    }
} // Path: src/app/api/checkUser/route.js
    // Compare this snippet from src/app/api/lendBook/route.js:
