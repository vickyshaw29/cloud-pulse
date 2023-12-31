import { UserButton, SignInButton, SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeToggler } from './ThemeToggler'

const Header = () => {
  return (
    <header className='flex items-center justify-between py-2 px-4 shadow-md dark:shadow-black'>
        <Link href={"/"} className='flex items-center space-x-3'>
            <div className='w-fit'>
                <Image
                    height={40}
                    width={40}
                    src={"/pulse_logo.png"}
                    alt='logo'

                />
            </div>
            <h1 className='font-semibold md:text-xl'>Cloud Pulse</h1>
        </Link>

        <div className='flex space-x-3 items-center'>
              {/* Put theme toggle logic here */}
              <ThemeToggler/>
              <UserButton afterSignOutUrl='/'/>
              <SignedOut>
                 <SignInButton afterSignInUrl='/dashboard' mode='modal'/>
              </SignedOut>
            </div>
    </header>
  )
}

export default Header


//Primary - #01a275
//Secondary - #01354B