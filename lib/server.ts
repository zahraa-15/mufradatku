import {cookies} from "next/headers";
export const configured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
export async function supabase(path:string,init:RequestInit={},token?:string) {
 if(!configured()) throw new Error("Backend belum dikonfigurasi.");
 return fetch(process.env.SUPABASE_URL+path,{...init,cache:"no-store",headers:{"Content-Type":"application/json",apikey:process.env.SUPABASE_ANON_KEY!,Authorization:"Bearer "+(token||process.env.SUPABASE_ANON_KEY),...init.headers}});
}
export async function session() {
 const token=(await cookies()).get("mf_access")?.value;
 if(!token) return null;
 const response=await supabase("/auth/v1/user",{},token);
 if(!response.ok) return null;
 return {token,user:await response.json()};
}
