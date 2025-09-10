import { useState } from 'react';
import { Eye, EyeOff, User, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Navigate to Diver Dashboard
        navigate('/diver');

    };

    return (
        <div className="min-h-screen relative overflow-hidden">


            <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">

                    {/* Header Card */}
                    <Card className="mb-6 bg-gradient-to-r from-primary to-primaryBlue border-none shadow-2xl">
                        <CardHeader className="text-center py-8 sm:py-10 lg:py-12">
                            <img
                                src="/src/assets/logo/hms_logo.png"
                                alt="Hydro Marine - The Subsea Specialist"
                                className="h-12 w-auto sm:h-16 sm:w-auto lg:h-20 lg:w-auto object-contain filter drop-shadow-lg"
                            />
                            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                                  THE SUBSEA SPECIALIST
                            </CardTitle>
                            <CardDescription className="text-blue-100 text-sm sm:text-base lg:text-lg">
                                    HYDRO MARINE
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Main Login Card */}
                    <Card className="bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                                Welcome Back
                            </CardTitle>
                            <CardDescription className="text-gray-600 text-sm sm:text-base">
                                Sign in to access the dashboard
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6 lg:space-y-8">

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm sm:text-base font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 sm:pl-12 h-12 sm:h-14 lg:h-16 text-sm sm:text-base bg-gray-50 border-gray-300 focus:bg-white hover:bg-white transition-all duration-200"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm sm:text-base font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 sm:pl-12 pr-12 sm:pr-14 h-12 sm:h-14 lg:h-16 text-sm sm:text-base bg-gray-50 border-gray-300 focus:bg-white hover:bg-white transition-all duration-200"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <Button
                                onClick={handleLogin}
                                disabled={isLoading || !email || !password}
                                className="w-full text-white bg-gradient-to-r from-primary to-primaryBlue hover:opacity-90 h-12 sm:h-14 lg:h-16 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02]"
                                size="lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In to Dashboard"
                                )}
                            </Button>

                            {/* Security Notice */}
                            <div className="pt-6 lg:pt-8 border-t border-gray-200 text-center space-y-3">
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Protected by advanced security protocols
                                </p>

                                {/* Security Badges */}
                                <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span>⚓ Secure Harbor</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                        <span>🌊 Encrypted Waters</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <span>🚢 IMO Compliant</span>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    {/* Bottom Text */}
                    <div className="text-center mt-6 lg:mt-8">
                        <p className="text-black/80 text-xs sm:text-sm">
                            © 2025 Ship Management System. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
