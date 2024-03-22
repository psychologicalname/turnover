import Link from 'next/link';
import { useState } from 'react';

import Button from './Button';
import { UserSignupData } from '~/utils/types';

interface SignupProps {
    setUser: React.Dispatch<React.SetStateAction<UserSignupData | null>>;
}


const Signup = ({ setUser }: SignupProps) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<UserSignupData>({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setUser(formData);
            setLoading(false);
        }, 1000);
    };

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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
