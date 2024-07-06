"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { IoMdHome } from "react-icons/io";

const formSchema = z.object({
  search: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).max(50),
})

export default function Header() {

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <div className='flex bg-red-900'>
      <ul className='flex md:p-4 p-2 '>
        <li><Button className='text-lg font-semibold hover:text-white text-gray-300' variant={'ghost'} onClick={() => changeRoute("")}><IoMdHome className='text-2xl' title='Home' /></Button></li>
      </ul>

      <div className={` flex items-center`}>

        <form onSubmit={handleSubmit((data: z.infer<typeof formSchema>) => changeRoute(`search/${data.search}`))} className=' min-w-[300px] relative' action='#'>
          <Input className={`rounded-xl bg-black border-white text-red-50 focus:bg-white focus:text-black  pr-12`}
            placeholder='Busque seu filme em inglês'
            {...register("search")}
          />
        </form>
      </div>
    </div>
  )
  function changeRoute(route: string) {

    navigate(`/${route}`)
  }
}
