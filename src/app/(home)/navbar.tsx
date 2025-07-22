import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

import { SearchInput } from './search-input'

export const Navbar = () => {
  return (
    <nav className="flex size-full items-center justify-between">
      <Link href="/" className="mr-6">
        <div className="flex shrink-0 items-center gap-3">
          <Image src="/logo.svg" alt="Docs logo" width={36} height={36} />
          <h3 className="text-2xl font-bold text-indigo-600">Docs</h3>
        </div>
      </Link>
      <SearchInput />
      <UserButton />
    </nav>
  )
}
