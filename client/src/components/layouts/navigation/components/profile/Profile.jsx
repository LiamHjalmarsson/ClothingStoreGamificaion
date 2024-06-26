import React from 'react';
import { useRootContext } from '../../../../../pages/Root';
import { firstLetter } from '../../../../../utils/textTransformation';
import LinkButton from '../../../../elements/LinkButton';
import { FiLogOut } from "react-icons/fi";
import { userLinks } from '../../../../../utils/links';

const Profile = ({ open }) => {
    let { user, logout } = useRootContext();

    return (
        <div className={`${open ? "translate-x-0" : "translate-x-full"} transform transition duration-300 p-8 bg-stone-200 dark:bg-stone-800 top-24 max-w-sm w-full right-0 fixed flex flex-col gap-8`}>
            {
                user && (
                    <h3 className='text-center text-lg font-bold tracking-wide'>
                        {firstLetter(user.firstName)}
                    </h3>
                )
            }

            {
                !user && (
                    <div className='flex justify-between items-center gap-6 w-full'>
                        <LinkButton href="login">
                            Login
                        </LinkButton>
                        <LinkButton href="register">
                            Register
                        </LinkButton>
                    </div>
                ) || (
                    <div className=' flex flex-wrap justify-center gap-6'>
                        <ul className='flex flex-wrap gap-6'>
                            <LinkButton href={`user/${user._id}`} custom="w-full">
                                Account
                            </LinkButton>
                            {
                                userLinks.map((link, index) => (
                                    <LinkButton href={`user/${user._id}/${link.url}`} key={index}>
                                        {firstLetter(link.url)}
                                    </LinkButton>
                                ))
                            }
                        </ul>
                        <button onClick={logout} className='flex gap-2 justify-center items-center'>
                            <span>
                                Logout
                            </span>
                            <FiLogOut />
                        </button>
                    </div>
                )
            }

        </div>
    );
}

export default Profile;
