import {useEffect } from "react"


const MainNav = () => {

    useEffect(() => {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        const megaMenus = document.querySelectorAll('#productMegaMenu, #brandMegaMenu');
        const productCategoryItems = document.querySelectorAll('#productCategoryMenu .category-item');
        const brandCategoryItems = document.querySelectorAll('#brandCategoryMenu .brand-item');
        const productSubmenus = document.querySelectorAll('#productMegaMenu .submenu');
        const brandSubmenus = document.querySelectorAll('#brandMegaMenu .submenu');

        // Function to close all dropdowns
        function closeAllMenus() {
            megaMenus.forEach(menu => {
                menu.classList.remove('active');
            });
        }

        // Function to activate a category
        function activateCategory(item: Element, allItems: NodeListOf<Element>, allSubmenus: NodeListOf<Element>) {
            allItems.forEach(item => {
                item.classList.remove('active');
            });

            item.classList.add('active');

            allSubmenus.forEach(submenu => {
                submenu.classList.remove('active');
            });

            let categoryId: string | null = null;
            if (item.classList.contains('category-item')) {
                categoryId = item.getAttribute('data-category');
            } else if (item.classList.contains('brand-item')) {
                categoryId = item.getAttribute('data-brand');
            }

            if (categoryId) {
                const targetSubmenu = document.getElementById(categoryId);
                if (targetSubmenu) {
                    targetSubmenu.classList.add('active');
                }
            }
        }

        // Add event listeners to dropdown triggers
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.currentTarget as HTMLElement;
                const targetId = target.getAttribute('data-target');
                if (!targetId) return;
                const targetMenu = document.getElementById(targetId);
                if (!targetMenu) return;

                closeAllMenus();
                targetMenu.classList.toggle('active');

                if (targetMenu.classList.contains('active')) {
                    if (targetId === 'productMegaMenu') {
                        const firstCategory = document.querySelector('#productCategoryMenu .category-item') as HTMLElement | null;
                        if (firstCategory) {
                            activateCategory(firstCategory, productCategoryItems, productSubmenus);
                        }
                    } else if (targetId === 'brandMegaMenu') {
                        const firstBrand = document.querySelector('#brandCategoryMenu .brand-item') as HTMLElement | null;
                        if (firstBrand) {
                            activateCategory(firstBrand, brandCategoryItems, brandSubmenus);
                        }
                    }
                }
            });

            trigger.addEventListener('mouseenter', (e) => {
                const target = e.currentTarget as HTMLElement;
                const targetId = target.getAttribute('data-target');
                if (!targetId) return;
                const targetMenu = document.getElementById(targetId);
                if (!targetMenu) return;

                closeAllMenus();
                targetMenu.classList.add('active');

                if (targetId === 'productMegaMenu') {
                    const firstCategory = document.querySelector('#productCategoryMenu .category-item') as HTMLElement | null;
                    if (firstCategory) {
                        activateCategory(firstCategory, productCategoryItems, productSubmenus);
                    }
                } else if (targetId === 'brandMegaMenu') {
                    const firstBrand = document.querySelector('#brandCategoryMenu .brand-item') as HTMLElement | null;
                    if (firstBrand) {
                        activateCategory(firstBrand, brandCategoryItems, brandSubmenus);
                    }
                }
            });
        });


        // Add event listeners to megaMenus
        megaMenus.forEach(menu => {
            menu.addEventListener('mouseleave', closeAllMenus);
        });

        // Add event listeners to product category items
        productCategoryItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                activateCategory(item, productCategoryItems, productSubmenus);
            });

            item.addEventListener('mouseenter', function () {
                activateCategory(item, productCategoryItems, productSubmenus);
            });
        });

        // Add event listeners to brand category items
        brandCategoryItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                activateCategory(item, brandCategoryItems, brandSubmenus);
            });

            item.addEventListener('mouseenter', function () {
                activateCategory(item, brandCategoryItems, brandSubmenus);
            });
        });

        // Close dropdowns when clicking outside
        function handleDocumentClick(e: MouseEvent) {
            const isClickInsideMenu = Array.from(megaMenus).some(menu => menu.contains(e.target as Node));
            const isClickOnTrigger = Array.from(dropdownTriggers).some(trigger => trigger.contains(e.target as Node));

            if (!isClickInsideMenu && !isClickOnTrigger) {
                closeAllMenus();
            }
        }

        document.addEventListener('click', handleDocumentClick);

        // Cleanup event listeners on unmount
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

    }, []); // Empty dependency array => runs once when mounted

    return (
        <>
            {/* <!-- Main Navigation --> */}
            <nav className="bg-lime-500">
                <div className="container mx-auto px-4">
                    <ul className="flex">
                        <li className="relative">
                            <a href="#" className="dropdown-trigger text-white py-4 px-6 hover:bg-lime-600 flex items-center" data-target="productMegaMenu">
                                Products
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </li>
                        <li className="relative">
                            <a href="#" className="dropdown-trigger text-white py-4 px-6 hover:bg-lime-600 flex items-center" data-target="brandMegaMenu">
                                Brands
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </li>
                        <li><a href="#" className="text-white block py-4 px-6 hover:bg-lime-600">About us</a></li>
                        <li><a href="#" className="text-white block py-4 px-6 hover:bg-lime-600">FAQs</a></li>
                        <li><a href="#" className="text-white block py-4 px-6 hover:bg-lime-600">Contact Us</a></li>
                        <li><a href="#" className="text-white block py-4 px-6 hover:bg-lime-600">School Book Lists</a></li>
                        <li><a href="#" className="text-white block py-4 px-6 hover:bg-lime-600">Office Supplies</a></li>
                    </ul>
                </div>
            </nav>

            {/* <!-- Products Mega Menu Container --> */}
            <div id="productMegaMenu" className="container mx-auto shadow-md">
                <div className="flex">
                    {/* <!-- Left sidebar menu --> */}
                    <div className="w-64 bg-white border-r border-gray-200">
                        <ul id="productCategoryMenu">
                            <li className="category-item border-b border-gray-100" data-category="books">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-yellow-700 mr-2">📚</span>
                                    Books
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="school-stationery">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-blue-500 mr-2">📄</span>
                                    School Stationery
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="office-stationery">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-gray-500 mr-2">📎</span>
                                    Office Stationery
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="writing-tools">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-lime-600 mr-2">✏️</span>
                                    Writing Tools
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="adhesives">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-amber-500 mr-2">🧴</span>
                                    Adhesives
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="files-folders">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-indigo-500 mr-2">📁</span>
                                    Files & Folders
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="colouring-products">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-pink-500 mr-2">🎨</span>
                                    Colouring Products
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="category-item border-b border-gray-100" data-category="accounting-books">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-green-500 mr-2">📊</span>
                                    Accounting Books
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            {/* <!-- More categories as needed --> */}
                        </ul>
                    </div>

                    {/* <!-- Right expanded submenu content --> */}
                    <div className="flex-1 bg-white p-6">
                        {/* <!-- Writing Tools Submenu --> */}
                        <div id="writing-tools" className="submenu">
                            <div className="grid grid-cols-3 gap-8 w-full">
                                {/* <!-- Column 1 --> */}
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Pens</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Ball Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Gel Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Colouring Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Other Pens</a></li>
                                    </ul>
                                </div>

                                {/* <!-- Column 2 --> */}
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Highlighter Pens</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Chisel Narrow Tip</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Chisel Tip</a></li>
                                    </ul>
                                </div>

                                {/* <!-- Column 3 --> */}
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Marker Pens</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Permanent Markers</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Whiteboard Markers</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Books Submenu --> */}
                        <div id="books" className="submenu">
                            <div className="grid grid-cols-3 gap-8 w-full">
                                <div>
                                    <h3 className="font-bold text-lg mb-4">School Composition Books</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">School Composition Books</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Drawing Books</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">CR Science Range</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Notebooks & Notepads</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Books For Office</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">School Stationery</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Pencils</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Geometric Tools</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">General Purpose</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Writing Tools</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Highlighter Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Marker Pens</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <!-- More submenus for other categories --> */}
                    </div>
                </div>
            </div>

            {/* <!-- Brands Mega Menu Container --> */}
            <div id="brandMegaMenu" className="container mx-auto shadow-md">
                <div className="flex">
                    {/* <!-- Left sidebar menu --> */}
                    <div className="w-64 bg-white border-r border-gray-200">
                        <ul id="brandCategoryMenu">
                            <li className="brand-item border-b border-gray-100" data-brand="promate">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-green-700 mr-2">🔷</span>
                                    ProMate
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="brand-item border-b border-gray-100" data-brand="rathna">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-blue-500 mr-2">🔶</span>
                                    Rathna
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="brand-item border-b border-gray-100" data-brand="mango">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-yellow-500 mr-2">🔸</span>
                                    Mango
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="brand-item border-b border-gray-100" data-brand="rathna-publications">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-red-500 mr-2">📕</span>
                                    Rathna Publications
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="brand-item border-b border-gray-100" data-brand="platignum">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-purple-500 mr-2">✒️</span>
                                    Platignum
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="brand-item border-b border-gray-100" data-brand="maped">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-indigo-500 mr-2">✂️</span>
                                    Maped
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                            <li className="brand-item border-b border-gray-100" data-brand="babson">
                                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <span className="text-amber-500 mr-2">📓</span>
                                    Babson
                                    <span className="ml-auto text-gray-400">›</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Right expanded submenu content --> */}
                    <div className="flex-1 bg-white p-6">
                        {/* <!-- Rathna Submenu --> */}
                        <div id="rathna" className="submenu">
                            <div className="grid grid-cols-4 gap-6 w-full">
                                <div className="col-span-4">
                                    <div className="flex items-center mb-6">
                                        <img src="/api/placeholder/150/80" alt="Rathna Logo" className="mr-4" />
                                        <h2 className="text-xl font-bold">Rathna Exercise Books</h2>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Books</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">School Composition Books</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Drawing Books</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">CR Science Range</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Notebooks & Notepads</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Books For Office</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">School Stationery</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Pencils</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Geometric Tools</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">General Purpose</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Writing Tools</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Highlighter Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Marker Pens</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Office Stationery</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Office</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Modeling Clay Range</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Other Papers</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <!-- ProMate Submenu --> */}
                        <div id="promate" className="submenu">
                            <div className="grid grid-cols-3 gap-8 w-full">
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Books</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">School Composition Books</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Drawing Books</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">CR Science Range</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Notebooks & Notepads</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Books For Office</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">School Stationery</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Pencils</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Geometric Tools</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">General Purpose</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Writing Tools</h3>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Highlighter Pens</a></li>
                                        <li><a href="#" className="text-gray-700 hover:text-lime-600">Marker Pens</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Other brand submenus will be added here --> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainNav