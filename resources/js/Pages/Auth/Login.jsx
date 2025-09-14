import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-extrabold text-indigo-700 mb-2">Sign in to your account</h2>
                        <p className="text-gray-500">Welcome back! Please enter your details.</p>
                    </div>
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <div>
                            <PrimaryButton className="w-full py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                        <div className="text-center mt-4">
                            <span className="text-gray-500">Don't have an account? </span>
                            <Link href={route('register')} className="text-indigo-600 hover:text-indigo-800 font-medium">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
