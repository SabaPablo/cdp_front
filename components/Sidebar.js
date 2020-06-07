import React from 'react'
import Link from 'next/link'
import { useRouter} from 'next/router'

const Sidebar = () => {

    const router = useRouter();
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-sceen p-5">
            <div>
                <p className="text-white text-2xl font-black">CDP</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-blue-800 p-2": "p-2"}>
                    <Link href="/">
                        <a className="text-white mb-2 block">
                            Inicio
                        </a>
                        
                    </Link>
                </li>
                <li className={router.pathname === "/beers" ? "bg-blue-800 p-2": "p-2"} >
                    <Link href="/beers">
                        <a className="text-white mb-2 block">
                            Beers
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/orders" ? "bg-blue-800 p-2": "p-2"} >
                    <Link href="/orders">
                        <a className="text-white mb-2 block">
                            Ordenes
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    );
}

export default Sidebar