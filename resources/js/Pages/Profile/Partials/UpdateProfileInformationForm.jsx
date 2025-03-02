import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [userImg ,setUserImg] = useState(user.user_img);

    const { data, setData, post, errors ,setError , clearErrors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            phone: user.phone_number,
            photo: null
        });


    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        if (data.photo) {

            formData.append('photo', data.photo);

            setUserImg(URL.createObjectURL(data.photo));
        }
        formData.append('_method', 'PATCH');


        // post(route('profile.update'));
        try {

            const response = await axios.post(route('profile.update'), formData, {

                headers: {

                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response === 200) {


                toast.success((t) => (

                    <span className="flex">
                        Profile Updated Successfully.
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            }

        } catch (error) {

            clearErrors();

            if (error.response && error.response.data.errors) {

                const validation_errors = error.response.data.errors;

                Object.keys(validation_errors).forEach(key => {

                    setError(key, validation_errors[key][0]);
                });

            } else {

                toast.error((t) => (

                    <span className="flex">
                        {error.message}
                        <button className="text-orange-600 pl-3" onClick={() => toast.dismiss(t.id)}>
                            Close
                        </button>
                    </span>
                ));
            }

        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div>

                    {userImg && <img src={userImg} alt="Profile Pic" />}

                    <InputLabel htmlFor="photo" value="Profile Picture" />

                    <input
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('photo', e.target.files[0])}
                    />

                    <InputError className="mt-2" message={errors.photo} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel value="Phone Number" />

                    <TextInput
                        type="number"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>

            <Toaster />
        </section>
    );
}
