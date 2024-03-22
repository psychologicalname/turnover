import Link from 'next/link';

import Button from './Button';
import { useState } from 'react';

interface SignupProps {
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const Signup = ({ setUser }: SignupProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
        };
        const user = {
            name: target.name.value,
            email: target.email.value,
            password: target.password.value
        }
        setTimeout(() => {
            setUser(user)
            setLoading(false)
        }, 1000)
    }

    return (
        <div className='border border-[#C1C1C1] rounded-[20px] bg-white p-10'>
            <h1 className='text-[32px] font-semibold mb-8 text-center'>
                Create your account
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col mb-12">
                <label htmlFor="name">
                    <span className="block mb-1 text-[16px]">Name</span>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter"
                        className="form-input"
                        required
                    />
                </label>
                <label htmlFor="email">
                    <span className="block mb-1 text-[16px]">Email</span>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter"
                        className="form-input"
                        required
                    />
                </label>
                <label htmlFor="password">
                    <span className="block mb-1 text-[16px]">Password</span>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter"
                        className="form-input"
                        required
                    />
                </label>

                <Button disabled={loading} type="submit" title="create account" styles="" />
            </form>

            <div className="flex-center gap-2 text-[16px] mb-10">
                <p className="text-[#333333]">
                    Have an Account?
                </p>
                <Link href="/login" className="font-medium text-black">
                    LOGIN
                </Link>
            </div>
        </div>
    )
}

export default Signup
