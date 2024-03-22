import { useState } from "react";

import EmailVerify from "~/components/EmailVerify";
import Signup from "~/components/Signup";

const signup = () => {
    const [user, setUser] = useState(null)

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

export default signup
