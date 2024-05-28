import Link from 'next/link'
 
export default function Layout({
  children,
}: {
//   transactionmanager: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      {/* <nav>
        <Link href="/transactioneditor">Open Transaction Editor</Link>
      </nav>
      <div>{transactionmanager}</div> */}
      <div>{children}</div>
    </>
  )
}