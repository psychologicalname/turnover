import { useState, FC } from 'react';
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation';

import Button from './Button';
import { User, UserSignupData } from '~/utils/types';
import { emailHide } from '~/utils/emailHide';

const EmailVerify: FC<{ user: UserSignupData }> = ({ user }) => {

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ ...user, otp }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data: User) => {
                if (!data?.isLoggedIn) {
                    alert('Looks like this e-mail already exists');
                    router.push('/login')
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
                Verify your email
            </h1>

            <p className='text-[16px] max-w-[334px] text-center mx-auto mb-10'>
                Enter the 8 digit code you have received on
                <span className='font-medium ml-1'>
                    {emailHide(user.email)}
                </span>
            </p>

            <p className='text-[16px] font-normal'>Code</p>

            <div className='w-full'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between mt-2'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={8}
                        renderInput={(props) => <input {...props} className='text-[18px] mr-4 text-center text-[#101920] outline-none rounded-lg border border-[#C1C1C1] text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 mb-12' />}
                        inputStyle={{
                            width: '3rem',
                            height: '3rem',
                        }}
                    />

                    <Button disabled={loading} type='submit' title={`${loading ? 'verifying' : 'verify'}`} />

                </form>
            </div>
        </div>
    )
}

export default EmailVerify
