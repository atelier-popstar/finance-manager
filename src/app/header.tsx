import Link from "next/link"

export default function Header(){
    return(
        <div className="flex flex-row box-content h-32">
            <Link href="/calendar"><div className="h-32 w-32 bg-red-500">logo here eventually</div></Link>
        </div>
    )
}