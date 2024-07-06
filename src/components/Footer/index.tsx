import React from 'react'
import { Separator } from '../ui/separator'

export default function Footer() {
    return (
        <div className='bg-red-800 text-white mt-8 flex h-96 p-8 items-center justify-center'>
            
            <div className='w-full h-full bg-black'>div1</div>
            <Separator />
            <div className='w-full h-full'>div2</div>
        </div>
    )
}
