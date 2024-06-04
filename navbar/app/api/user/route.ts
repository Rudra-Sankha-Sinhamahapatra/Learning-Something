import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    const session=await getServerSession(NEXT_AUTH);
    if(!session){
        return NextResponse.json({
          message:"You are logged out please log in"
        })
    }
    return NextResponse.json({session});
}