import {NextResponse} from "next/server";
import {configured,session,supabase} from "@/lib/server";
import {words} from "@/lib/data";
async function access(){if(!configured())return null;return session()}
export async function GET(){const s=await access();if(!s)return NextResponse.json({error:"Silakan masuk."},{status:401});const r=await supabase("/rest/v1/progress?select=data&user_id=eq."+s.user.id,{},s.token);if(!r.ok)return NextResponse.json({error:"Progres belum dapat dimuat."},{status:502});const rows=await r.json();return NextResponse.json({data:rows[0]?.data||null})}
export async function PUT(req:Request){const s=await access();if(!s)return NextResponse.json({error:"Silakan masuk."},{status:401});let data;try{data=await req.json()}catch{return NextResponse.json({error:"Data tidak valid."},{status:400})}
 const ids=new Set(words.map(w=>w.id));
 if(!data||!Array.isArray(data.known)||!Array.isArray(data.favorites)||data.known.length>30||data.favorites.length>30||![...data.known,...data.favorites].every(id=>ids.has(id))||!Number.isInteger(data.reviews)||data.reviews<0||data.reviews>1000000||![1,2,3].includes(data.lastTheme))return NextResponse.json({error:"Data progres tidak valid."},{status:400});
 const clean={known:[...new Set(data.known)],favorites:[...new Set(data.favorites)],reviews:data.reviews,lastTheme:data.lastTheme};
 const r=await supabase("/rest/v1/progress?on_conflict=user_id",{method:"POST",headers:{Prefer:"resolution=merge-duplicates"},body:JSON.stringify({user_id:s.user.id,data:clean,updated_at:new Date().toISOString()})},s.token);
 return NextResponse.json(r.ok?{ok:true}:{error:"Progres belum dapat disimpan."},{status:r.ok?200:502});
}
