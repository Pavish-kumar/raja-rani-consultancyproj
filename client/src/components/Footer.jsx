import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10 rounded-t-3xl shadow-inner">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-gray-300 text-gray-600">
                {/* Logo + Description */}
                <div className="max-w-md">
                    <div className="flex items-center gap-2">
                        <img className="h-14" src={assets.logo} alt="logo" />
                        <h1 className="text-palegreen text-3xl md:text-4xl font-bold">Raja Rani Bakers</h1>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed">
                        We deliver fresh breads, cakes, and pastries straight to your door. 
                        Trusted by thousands, we’re here to make your bakery experience delightful and convenient.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap w-full md:w-[50%] gap-6 md:gap-10">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 mb-3">{section.title}</h3>
                            <ul className="text-sm space-y-1.5">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href={link.url}
                                            className="text-gray-500 hover:text-palegreen hover:underline transition-colors duration-200"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Copyright */}
            <p className="py-5 text-center text-sm md:text-base text-gray-400">
                © {new Date().getFullYear()} rajarani.com — All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;
