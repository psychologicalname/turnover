import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from '~/components/Button';
import { User } from '~/utils/types';

interface LoginProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: target.email.value, password: target.password.value }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data: User) => {
                if (!data.isLoggedIn) {
                    alert('Invalid E-mail or Password');
                } else {
                    router.push('/')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className='border border-[#C1C1C1] rounded-[20px] bg-white p-10'>
            <h1 className='text-[32px] font-semibold mb-8 text-center'>
                Login
            </h1>
            <h3 className='text-[24px] font-medium mb-3'>
                Welcome back to ECOMMERCE
            </h3>
            <p className='text-[16px] text-center mb-8'>
                The next gen business marketplace
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col mb-8">
                <label htmlFor="email">
                    <span className="block mb-1 text-[16px]">Email</span>
                    <input
                        name="email"
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
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Enter"
                        className="form-input"
                        required
                    />
                </label>

                <Button disabled={loading} type="submit" title="login" styles="" />
            </form>

            <div className="border-b mb-8" />

            <div className="flex-center gap-2 text-[16px] mb-10">
                <p className="text-[#333333]">
                    Don&apos;t have an Account?
                </p>
                <Link href="/signup" className="font-medium text-black">
                    SIGN UP
                </Link>
            </div>
        </div>
    )
}

export default Login
