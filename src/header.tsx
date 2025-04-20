import React from 'react';

const Header: React.FC = () => {
    return (
        <div>
            <div className="fixed w-10/12 top-0 z-50 flex justify-between bg-slate-50 p-4">

                {/* brand-image */}
                <div className="w-4/12 mx-auto items-center">
                    <img className="h-12"
                        src="https://raw.githubusercontent.com/DinukaDilshan415/images/e901f9915a4c2352ca11d97a9fde00698b100e14/edumart-svg-diga.svg"
                        alt="" />
                </div>

                {/* <!-- search bar --> */}
                <div className="w-8/12 flex items-center justify-center">
                    <div className="w-full max-w-2xl min-w-[200px]">
                        <div className="relative flex items-center">
                            <div className="absolute flex items-center">

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 top-2.5 ml-3 text-slate-600"
                                    viewBox="0,0,256,256">
                                    <g fill="#696969" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt"
                                        strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0"
                                        fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"
                                        style={{ mixBlendMode: "normal" }}>
                                        <g transform="scale(5.12,5.12)">
                                            <path
                                                d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z">
                                            </path>
                                        </g>
                                    </g>
                                </svg>

                                <div className="h-6 border-l border-slate-200 ml-2.5"></div>
                            </div>

                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-edumart-secondary hover:border-edumart-hover shadow-sm focus:shadow"
                                placeholder="Find Here..." />

                            <button
                                className="rounded-md ml-2 bg-edumart-primary p-2 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg hover:bg-edumart-hover active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd"
                                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                        clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>



                {/* <!-- cart/login --> */}
                <div className="w-4/12 flex items-center justify-center text-right">

                    {/* <!-- cart --> */}
                    <div className="w-6/12">
                        <button type="button"
                            className="relative inline-flex items-center text-sm font-medium text-center text-white mt-1 p-1 hover:shadow-lg hover:border-2 hover:border-sky-300 rounded-xl">

                            <svg version="1.1" id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1"
                                xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.9 107.5"
                                >
                                <g>
                                    <path
                                        d="M3.9,7.9C1.8,7.9,0,6.1,0,3.9C0,1.8,1.8,0,3.9,0h10.2c0.1,0,0.3,0,0.4,0c3.6,0.1,6.8,0.8,9.5,2.5c3,1.9,5.2,4.8,6.4,9.1 c0,0.1,0,0.2,0.1,0.3l1,4H119c2.2,0,3.9,1.8,3.9,3.9c0,0.4-0.1,0.8-0.2,1.2l-10.2,41.1c-0.4,1.8-2,3-3.8,3v0H44.7 c1.4,5.2,2.8,8,4.7,9.3c2.3,1.5,6.3,1.6,13,1.5h0.1v0h45.2c2.2,0,3.9,1.8,3.9,3.9c0,2.2-1.8,3.9-3.9,3.9H62.5v0 c-8.3,0.1-13.4-0.1-17.5-2.8c-4.2-2.8-6.4-7.6-8.6-16.3l0,0L23,13.9c0-0.1,0-0.1-0.1-0.2c-0.6-2.2-1.6-3.7-3-4.5 c-1.4-0.9-3.3-1.3-5.5-1.3c-0.1,0-0.2,0-0.3,0H3.9L3.9,7.9z M96,88.3c5.3,0,9.6,4.3,9.6,9.6c0,5.3-4.3,9.6-9.6,9.6 c-5.3,0-9.6-4.3-9.6-9.6C86.4,92.6,90.7,88.3,96,88.3L96,88.3z M53.9,88.3c5.3,0,9.6,4.3,9.6,9.6c0,5.3-4.3,9.6-9.6,9.6 c-5.3,0-9.6-4.3-9.6-9.6C44.3,92.6,48.6,88.3,53.9,88.3L53.9,88.3z M33.7,23.7l8.9,33.5h63.1l8.3-33.5H33.7L33.7,23.7z" />
                                </g>
                            </svg>

                            <span className="sr-only">Notifications</span>
                            <div
                                className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                20</div>
                        </button>
                    </div>

                    {/* <!-- profile/login --> */}
                    <div className="w-6/12 flex items-center justify-center">
                        <button type="button"
                            className="relative inline-flex items-center text-sm font-medium text-center text-white">

                            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 mr-1">
                                <title></title>
                                <g id="User">
                                    <path
                                        d="M41.2452,33.0349a16,16,0,1,0-18.49,0A26.0412,26.0412,0,0,0,4,58a2,2,0,0,0,2,2H58a2,2,0,0,0,2-2A26.0412,26.0412,0,0,0,41.2452,33.0349ZM20,20A12,12,0,1,1,32,32,12.0137,12.0137,0,0,1,20,20ZM8.09,56A22.0293,22.0293,0,0,1,30,36h4A22.0293,22.0293,0,0,1,55.91,56Z">
                                    </path>
                                </g>
                            </svg>
                        </button>

                        <button type="button"
                            className="text-black hover:text-edumart-hover font-bold text-xl">
                            Login
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;