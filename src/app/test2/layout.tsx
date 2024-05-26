import Link from 'next/link'
 
export default function Layout({
  transactionmanager,
  children,
}: {
  transactionmanager: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href="/transactioneditor">Open modal</Link>
      </nav>
      <div>{transactionmanager}</div>
      <div>{children}</div>
    </>
  )
}