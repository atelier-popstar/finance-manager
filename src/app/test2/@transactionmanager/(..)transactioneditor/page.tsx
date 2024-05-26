'use client'

import { AddForm } from "@/app/add-form"
import { useRouter } from 'next/navigation'


export default function TransactionEditor () {
    const router = useRouter();
    return(
        <>
            <AddForm/>
            <button onClick={()=>{
                router.back();
            }}
            >
                Close Transaction Editor
            </button>
        </>
        
    )
}