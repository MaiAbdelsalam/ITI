import { dbConnections } from "../../lib/dbConnections";

dbConnections()
export async function GET() {
    return NextResponse.json({message:"hello route"},{status:200})

    
}