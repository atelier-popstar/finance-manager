import Link from "next/link"
import Image from 'next/image'
import Logo from './financetrackerlogo.png'

export default function Header(){
    return(
        <div className="flex flex-row box-content h-16 border bg-red-100 border-red-950 shadow-md">
            <Link href="/"><div className="h-16 w-32 bg-red-500 place-content-center text-center">Home</div></Link>
            <Link href="/calendar"><div className="h-16 w-32 bg-red-400 place-content-center text-center">Transactions</div></Link>
            <Link href="/test2"><div className="h-16 w-32 bg-red-300 place-content-center text-center">Testing Page</div></Link>
            <p className="flex grow justify-end">
            <Image
                src={Logo}
                width={400}
                height={35}
                alt="logo"
            />
            </p>
        </div>
    )
}
