import Image from 'next/image';

import { navItems } from '~/constants';
import { User } from '~/utils/types';

const Navbar = ({ user }: { user: User }) => {

    const handleSignOut = () => {
        fetch('/api/login', {
            method: 'DELETE'
        }).then((res) => res.json()).then(() => {
            window.location.reload();
        })
    }

    return (
        <nav className='w-full mb-16'>
            <div className='py-4 px-6'>
                <div className='flex-end text-[#333333] font-normal tetx-[12px] gap-6 mb-4'>
                    <p className='cursor-pointer'>Help</p>
                    <p className='cursor-pointer'>Orders & Returns</p>
                    <p>Hi, {user?.isLoggedIn ? user.name : 'Guest'}</p>
                    {user?.isLoggedIn ?
                        <button onClick={handleSignOut}>
                            Sign out
                        </button>
                        : null}
                </div>
                <div className='flex-between'>
                    <h1 className='font-bold text-[32px]'>
                        ECOMMERCE
                    </h1>
                    <div>
                        <ul className="flex-between gap-10 font-semibold text-[16px]">
                            {navItems.map((item) => (
                                <li key={item.id} className='cursor-pointer'>
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex-between gap-4'>
                        <Image src='/Search.png' alt='search' width={32} height={32} />
                        <Image src='/Cart.png' alt='cart' width={32} height={32} />
                    </div>
                </div>
            </div>

            <div className='bg-gray-100 w-full h-10 flex-center gap-12'>
                <Image src='/arrow-left.png' width={16} height={16} alt='left' />
                <p className='text-[14px] font-medium'>Get 10% off on business sign up</p>
                <Image src='/arrow-right.png' width={16} height={16} alt='right' />
            </div>
        </nav>
    )
}

export default Navbar
