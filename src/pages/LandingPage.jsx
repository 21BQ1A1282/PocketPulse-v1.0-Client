import { ArrowRight, BarChart3, CreditCard, Smartphone, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#demo", label: "Demo" },
        { href: "#about", label: "About" }
    ];

    const features = [
        { icon: CreditCard, title: "Expense Tracking", desc: "Track every expense with detailed categorization and get spending insights." },
        { icon: TrendingUp, title: "Income Management", desc: "Monitor all income sources and visualize your earnings in one place." },
        { icon: BarChart3, title: "Advanced Analytics", desc: "Beautiful charts to understand your financial patterns and make data-driven decisions." },
        { icon: Smartphone, title: "Mobile Friendly", desc: "Access your financial data anywhere, anytime on all devices." },
        { icon: ArrowRight, title: "Easy Export", desc: "Export data to Excel or receive reports via email for offline analysis." }
    ];

    const demoPoints = [
        "Real-time expense and income tracking",
        "Interactive charts and visualizations",
        "Customizable categories and filters"
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={assets.logo_pp} alt="Pocket Pulse" className="h-10 w-10" />
                        <span className={`text-2xl font-bold ${scrolled ? "text-black" : "text-black"}`}>
                            Pocket Pulse
                        </span>
                    </Link>

                    <div className="hidden md:flex gap-8">
                        {navLinks.map(link => (
                            <a key={link.label} href={link.href} className="text-gray-700 hover:text-black transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Link to="/login" className="mt-2 text-black hover:text-gray-700 transition-colors">Login</Link>
                        <Link to="/signup" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                                Take Control of Your{" "}
                                <span className="bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
                                    Financial Future
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Track income, manage expenses, analyze spending patterns, and achieve your financial goals with our intuitive dashboard.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/signup" className="flex items-center justify-center bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all">
                                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <a href="#demo" className="flex items-center justify-center border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-all">
                                View Demo
                            </a>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl p-4 shadow-2xl">
                            <img src={assets.income_analysis} alt="Dashboard" className="rounded-2xl w-full" />
                        </div>
                        <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg">
                            <BarChart3 className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                    <p className="text-xl text-gray-600 mb-16">Everything you need to manage your finances effectively</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all border border-gray-100">
                                <div className="bg-black rounded-xl w-16 h-16 flex items-center justify-center mb-6">
                                    <feature.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section id="demo" className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">See Pocket Pulse in Action</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Experience the intuitive interface that makes financial management effortless.
                        </p>
                        <ul className="space-y-4">
                            {demoPoints.map((point, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="bg-black rounded-full w-6 h-6 flex items-center justify-center mr-4">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <span className="text-gray-700">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl p-2 shadow-2xl">
                            <img src={assets.demo_img} alt="Demo" className="rounded-2xl w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Pocket Pulse</h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        Financial management should be accessible, intuitive, and powerful for everyone. Understanding your finances is the first step toward financial freedom.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-black">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Financial Life?</h2>
                    <p className="text-xl text-gray-300 mb-8">Join now to take control of your finances with Pocket Pulse.</p>
                    <Link to="/signup" className="inline-flex items-center bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                        Start Your Journey Today <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img src={assets.logo_pp} alt="Pocket Pulse" className="h-8 w-8" />
                                <span className="text-xl font-bold">Pocket Pulse</span>
                            </div>
                            <p className="text-gray-400">Your trusted partner in financial management.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                {navLinks.map(link => (
                                    <li key={link.label}><a href={link.href} className="hover:text-white transition-colors">{link.label}</a></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>madhavarapu.saimanikanta@gmail.com</li>
                                <li>+91 9014465918</li>
                                <li>Andhra Pradesh, India</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Pocket Pulse. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;