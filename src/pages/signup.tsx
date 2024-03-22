import { useState } from "react";

import EmailVerify from "~/components/EmailVerify";
import Signup from "~/components/Signup";
import { UserSignupData } from "~/utils/types";

const SignupPage = () => {
    const [user, setUser] = useState<UserSignupData | null>(null);

    return (
        <main className='flex-center mb-16'>
            {user ?
                <EmailVerify user={user} />
                :
                <Signup setUser={setUser} />

            }
        </main>
    )
}

export default SignupPage
