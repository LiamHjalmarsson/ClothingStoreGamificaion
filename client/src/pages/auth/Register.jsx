import React from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import Heading from '../../components/heading/Heading';
import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';

export const registerAction = async ({ request }) => {
    let formData = await request.formData();

    let data = Object.fromEntries(formData);

    try {
        let response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let recourse = await response.json();

        localStorage.setItem("userToken", JSON.stringify(recourse.token));

        return redirect("/");
    } catch (error) {
        console.log(error);
        return error;
    }
}

const Register = () => {
    return (
        <div className='relative min-h-[90vh] w-full flex justify-center items-center'>
            <div className='bg-stone-500 absolute h-full w-full'></div>

            <Form method='post' action='/register' className='p-8 bg-stone-200 dark:bg-stone-800 relative z-10 max-w-md w-full rounded-md transition duration-300'>
                <Heading title="Register" />

                <Input input={{ id: "firstName", placeholder: "Enter first name", name: "firstName" }} />
                <Input input={{ id: "lastName", placeholder: "Enter last name", name: "lastName" }} />
                <Input input={{ id: "email", placeholder: "Enter email", name: "email" }} />
                <Input input={{ id: "password", placeholder: "Enter password", name: "password" }} />

                <div className='text-center my-8'>
                    <p>
                        Already member?
                    </p>
                    <Link to="/login" className='text-blue-500 underline'>
                        Login
                    </Link>
                </div>

                <div className='flex gap-8 justify-between mt-12'>
                    <Button>
                        Cancel
                    </Button>
                    <Button>
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Register;
