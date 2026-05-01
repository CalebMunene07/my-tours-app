"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PRIMARY = "#07301d";

const COUNTRY_CODES = [
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1", flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91", flag: "🇮🇳", name: "India" },
];

const PACKAGES = [
  {
    id: "standard",
    label: "Standard",
    tagline: "Essential safari comfort",
    price: "From $890 / person",
    icon: "🏕️",
    color: "border-slate-300 bg-slate-50",
    activeColor: "border-[#07301d] bg-[#eef6f2]",
  },
  {
    id: "premium",
    label: "Premium",
    tagline: "Private vehicle & boutique camps",
    price: "From $1,450 / person",
    icon: "⭐",
    color: "border-slate-300 bg-slate-50",
    activeColor: "border-[#07301d] bg-[#eef6f2]",
    popular: true,
  },
  {
    id: "luxury",
    label: "Luxury",
    tagline: "Ultra-luxury with zero compromises",
    price: "From $2,800 / person",
    icon: "💎",
    color: "border-amber-200 bg-amber-50",
    activeColor: "border-amber-500 bg-amber-50",
  },
  {
    id: "romance",
    label: "Romance Escape",
    tagline: "Honeymoons & special occasions",
    price: "From $1,800 / couple",
    icon: "💍",
    color: "border-pink-200 bg-pink-50",
    activeColor: "border-pink-400 bg-pink-50",
  },
  {
    id: "custom",
    label: "Custom Itinerary",
    tagline: "Fully tailored to your needs",
    price: "Price on request",
    icon: "✨",
    color: "border-slate-300 bg-slate-50",
    activeColor: "border-[#07301d] bg-[#eef6f2]",
  },
];

const INTERESTS = [
  "Big Five Game Drive",
  "Birdwatching",
  "Beach & Coastal",
  "Mountain Trekking",
  "Cultural Visits",
  "Photography Safari",
  "Walking Safari",
  "Night Game Drive",
  "Balloon Safari",
  "Fishing",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Flexible / Not sure",
];

export default function EnquiryForm() {

const inputCls =
"w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#07301d] focus:ring-2 focus:ring-[#07301d]/20 transition-all placeholder:text-gray-400";

const labelCls =
"block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5";

const [step, setStep] = useState(1);
const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [form, setForm] = useState({
name:"",
email:"",
phoneLocal:"",
package:"",
interests:[],
destinations:"",
travelDate:"",
flexibility:"exact",
adults:"2",
children:"0",
duration:"5",
budget:"",
hearAboutUs:"",
message:""
});

const set = (field:any,value:any)=>setForm(prev=>({...prev,[field]:value}));

const handleSubmit = async () => {
setLoading(true);
setError("");

try {

const res = await fetch(`${API}/api/contact`,{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(form)
});

if(!res.ok) throw new Error("Failed to send enquiry");

setSubmitted(true);

} catch(err:any){

setError(err.message);

} finally {

setLoading(false);

}

};

if(submitted){
return(

<div className="text-center py-10 px-4">

<div className="w-16 h-16 bg-[#eef6f2] border-2 border-[#07301d] rounded-full flex items-center justify-center mx-auto mb-5">
<CheckCircle2 size={28} className="text-[#07301d]" />
</div>

<h3 className="text-xl font-bold text-gray-900 mb-2">
Enquiry Received!
</h3>

<p className="text-gray-500 text-sm">
Our team will contact you within 24 hours.
</p>

<button
onClick={()=>setSubmitted(false)}
className="mt-6 text-xs text-gray-400 hover:text-[#07301d] underline"
>
Send another enquiry
</button>

</div>

)
}

return (

<div className="max-w-2xl mx-auto">

<div className="flex items-center gap-2 mb-6">

{[1,2,3].map((s,i)=>(

<React.Fragment key={s}>

<div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
${s<step ? "bg-[#07301d] text-white" :
s===step ? "bg-[#07301d] text-white ring-4 ring-[#07301d]/20" :
"bg-gray-100 text-gray-400"}
`}>

{s}

</div>

{i<2 && <div className={`flex-1 h-0.5 ${s<step?"bg-[#07301d]":"bg-gray-200"}`}></div>}

</React.Fragment>

))}

</div>

{error && (
<div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-5">
<AlertCircle size={14}/> {error}
</div>
)}

{step===1 && (

<div className="space-y-4">

<div>

<label className={labelCls}>Full Name</label>

<input
className={inputCls}
value={form.name}
onChange={e=>set("name",e.target.value)}
placeholder="Jane Doe"
/>

</div>

<div>

<label className={labelCls}>Email</label>

<input
className={inputCls}
value={form.email}
onChange={e=>set("email",e.target.value)}
placeholder="email@example.com"
/>

</div>

</div>

)}

<div className="flex gap-3 mt-6">

{step>1 && (
<button
onClick={()=>setStep(step-1)}
className="px-5 py-3 border border-gray-200 rounded-xl text-sm"
>
← Back
</button>
)}

{step<3 ? (

<button
onClick={()=>setStep(step+1)}
className="flex-1 bg-[#07301d] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#052417]"
>
Continue →
</button>

):( 

<button
onClick={handleSubmit}
disabled={loading}
className="flex-1 bg-[#07301d] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#052417] flex items-center justify-center gap-2"
>

{loading ? (
<>
<Loader2 size={16} className="animate-spin"/>
Sending...
</>
):(
<>
<Send size={14}/>
Send Enquiry
</>
)}

</button>

)}

</div>

</div>

)

}