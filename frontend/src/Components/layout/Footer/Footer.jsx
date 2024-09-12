import React from 'react';

const Footer = () => {
    return (
        <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8 flex flex-col items-center"> {/* Updated here */}
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="342px" height="210px" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
                            <g transform="matrix(.1 0 0 -.1 0 500)" fill="#000000" stroke="none">
                                <path d="M1808 3434c-70 -39 -106 -64 -98 -69 7 -4 59 -4 116 -1l103 7 -6 -147c-5 -125 -4 -146 8 -139 8 5 49 37 92 72 42 34 88 70 102 79 22 15 25 23 25 80v64l28 -5c15 -2 60 -7 100 -10s100 -14 133 -25c48 -17 70 -19 108 -12l48 9 34 -64c31 -58 32 -65 17 -74 -14 -8 -15 -14 -6 -40 6 -17 8 -71 6 -122 -5 -101 -26 -163 -78 -229 -17 -20 -30 -39 -30 -42s24 -6 53 -6c45 0 63 6 113 38 99 64 161 150 190 261 39 153 -35 306 -183 376 -109 51 -163 58 -477 59l-288 1z" />
                                <path d="M2399 3246c-129 -12 -195 -34 -259 -86l-25 -20 65 6c36 3 71 7 78 9 9 4 12 -40 12 -195v-200h170v133c0 72 3 169 7 214l6 82 51 27c95 49 97 49 -105 30" />
                                <path d="m2024 3053 -102 -15 -6 -37c-3 -20 -6 -82 -6 -138v-103h230v124c0 68 3 138 6 155 5 23 3 31 -7 30 -8 -1 -60 -8 -115 -16" />
                                <path d="M1965 2694c6 -2 9 -34 7 -79l-4 -75 28 1c18 1 22 3 11 6 -15 4 -17 14 -15 71 2 52 7 67 19 70 23 4 32 -28 14 -48 -14 -16 -14 -18 6 -23 18 -5 21 -11 15 -38 -5 -27 -4 -30 9 -19 19 16 19 45 1 62 -9 9 -10 17 -3 29 20 32 1 49 -50 48 -26 0 -43 -3 -38 -5" />
                                <path d="M2118 2633c2 -38 8 -74 14 -80 12 -15 64 -17 72 -4 3 4 -5 6 -17 4 -36 -7 -49 18 -45 87 2 48 0 60 -12 60s-14 -13 -12 -67" />
                                <path d="M2225 2620c0 -64 3 -80 15 -80s14 14 12 80c-2 53 -8 80 -15 80 -8 0 -12 -25 -12 -80" />
                                <path d="M2325 2658c14 -25 25 -59 25 -80 0 -33 3 -38 23 -37 12 0 16 3 10 6 -21 8 -15 57 13 107 22 39 23 46 9 46 -9 0 -13 -4 -10 -10 3 -5 0 -22 -8 -37l-14 -27 -24 37c-34 52 -54 47 -24 -5" />
                                <path d="M2548 2620c2 -53 8 -80 15 -80 8 0 12 25 12 80 0 64 -3 80 -15 80s-14 -14 -12 -80" />
                                <path d="m2649 2693 34 -4 -5 -75c-4 -59 -2 -74 9 -74 8 0 11 5 8 10 -4 6 -3 39 0 75 7 62 8 64 39 68 17 2 -3 4 -44 4s-60 -2 -41 -4" />
                                <path d="M1896 2378c-3 -51 -9 -194 -15 -318 -10 -246 -21 -303 -68 -353l-28 -29 230 5c181 5 249 10 320 27 353 80 562 224 635 436 26 74 28 190 6 268l-17 56h-134c-74 0 -135 -2 -135 -4s11 -26 25 -53c78 -151 36 -397 -90 -532 -75 -80 -113 -94 -263 -93 -70 0 -178 4 -240 7l-113 7 24 27c60 64 74 127 87 390 5 112 10 215 10 227 0 24 -1 24 -114 24h-114z" />
                                <path d="M2275 2458c-2 -7 -5 -103 -7 -213 -3 -183 -5 -204 -26 -250 -13 -27 -34 -62 -48 -76l-25 -26 109 -7c81 -5 119 -3 148 7 41 14 169 96 161 103 -2 2 -28 0 -57 -6 -65 -12 -170 -13 -170 -1 0 5 6 14 14 20 35 29 49 102 54 284l4 177h-76c-52 0 -78 -4 -81 -12" />
                            </g>
                        </svg>
                        <p className="text-base leading-relaxed text-gray-600 mt-7 text-center">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                        </p>

                        <ul className="flex items-center space-x-3 mt-9">
                            <li>
                                <a
                                    href="#"
                                    title=""
                                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.46 11.46 0 0 0 8.304 4.21 4.551 4.551 0 0 1-.099-.923c0-2.239 1.816-4.055 4.055-4.055 1.166 0 2.221.486 2.96 1.274a8.07 8.07 0 0 0 2.571-.973 4.045 4.045 0 0 1-1.781 2.238 8.11 8.11 0 0 0 2.324-.636 8.566 8.566 0 0 1-2.03 2.107z"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    title=""
                                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M12 2.04c-5.522 0-10 4.478-10 10 0 4.418 3.583 8.066 8.002 8.66v-6.13H7.9v-2.53h2.1v-1.9c0-2.07 1.243-3.2 3.145-3.2.913 0 1.868.165 1.868.165v2.065H14.9c-1.06 0-1.387.661-1.387 1.338v1.561h2.354l-.376 2.53H13.5v6.158C17.917 20.1 21.5 16.458 21.5 12.04c0-5.522-4.478-10-10-10z"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    title=""
                                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M16.98 2H7.02C4.79 2 3 3.79 3 6.02v9.96C3 19.21 4.79 21 7.02 21h9.96C19.21 21 21 19.21 21 16.98V6.02C21 3.79 19.21 2 16.98 2zm-1.743 9.327h-1.494v5.7h-2.292v-5.7H9.96V8.963h1.491V7.825c0-1.321.733-3.319 3.296-3.319l2.415.01v2.338h-1.75c-.285 0-.684.143-.684.754v1.355h2.436l-.457 2.364z"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-3 lg:col-span-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-16 gap-x-12">
                            <div>
                                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase"> Company </p>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About Us </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Features </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> News & Blog </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Careers </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> How It Works </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Testimonials </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase"> Support </p>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Help Center </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Terms of Service </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Legal </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Status </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase"> Contact </p>
                                <ul className="mt-6 space-y-4">
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Contact Us </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Support Chat </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Phone Support </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Email </a>
                                    </li>
                                    <li>
                                        <a href="#" title="" className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> Partners </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-10 border-gray-200" />
                </div>

              
            
        </section>
    );
};

export default Footer;
