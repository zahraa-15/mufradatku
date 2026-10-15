import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {configured,session,supabase} from "@/lib/server";
export async function GET(){if(!configured())return NextResponse.json({configured:false,user:null});const s=await session();return NextResponse.json({configured:true,user:s?{id:s.user.id,email:s.user.email}:null})}
export async function POST(request:Request){
 if(!configured())return NextResponse.json({error:"Login tersedia setelah Supabase dikonfigurasi."},{status:503});
 let body;try{body=await request.json()}catch{return NextResponse.json({error:"Permintaan tidak valid."},{status:400})}
 const {email,password,action}=body;
 if(typeof email!=="string"||!email.includes("@")||email.length>254||typeof password!=="string"||password.length<8||password.length>128||!["login","signup"].includes(action))return NextResponse.json({error:"Gunakan email valid dan kata sandi 8–128 karakter."},{status:400});
 const r=await supabase(action==="signup"?"/auth/v1/signup":"/auth/v1/token?grant_type=password",{method:"POST",body:JSON.stringify({email,password})});
 const data=await r.json();
 if(!r.ok)return NextResponse.json({error:action==="login"?"Email atau kata sandi tidak sesuai.":"Pendaftaran gagal. Periksa email atau coba lagi."},{status:400});
 if(data.access_token){const jar=await cookies();jar.set("mf_access",data.access_token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:data.expires_in||3600})}
 return NextResponse.json({confirmation:!data.access_token,user:data.user?{id:data.user.id,email:data.user.email}:null});
}
export async function DELETE(){(await cookies()).delete("mf_access");return NextResponse.json({ok:true})}
