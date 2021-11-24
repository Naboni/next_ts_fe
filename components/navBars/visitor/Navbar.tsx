import { useState } from 'react';
import Link from 'next/link'
import { useSession, signOut } from "next-auth/client";

import { useRouter } from 'next/router'
import { Button } from 'antd';

import styles from './navbar.module.css'

// relative
import { Roles } from "../../../constants/roles";

// components
import Profile from "../../profile/ProfileDropDown";
import CenterContent from "@/components/CenterContent"


interface User {
    id: string;
    username: string;
    email: string;
    password: null;
    createdAt: string;
    updatedAt: string;
    role: string;
}


export default function Navbar() {

    const router = useRouter();
    const [session, loading] = useSession();

    function logoutHandler() {
        signOut().finally(() => {
            window.location.href = "/";
        });
    }

    const brandRoutes = [
        { path: "/my-activity", name: "My activity" },
        // { path: "/discover", name: "Discover" },
        { path: "/creators", name: "Creators" },
        { path: "/short-list", name: "Shortlist" },
    ];

    const creatorRoutes = [
        { href: "/activity", path: "/activity", name: "My activity" },
        {
            href: "/creator",
            path: `/creator/${(session?.user as User)?.id}`,
            name: "Profile",
        },
        { href: "/learn", path: "/learn", name: "Learn" },
    ];

    const adminRoutes = [
        { path: "/admin ", name: "Dashboard" },
        { path: "/admin/profile-claims", name: "Profile claims" },
        { path: "/admin/setup-profile", name: "Setup profile" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const openMenu = () => setIsOpen(!isOpen);

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push("https://next-ts-fe.vercel.app/auth/signup")
    }

    return (
        <div>
            <nav className={styles.navbar}>
                <Link href='/'>
                    <a className={styles.navlogo}>BETOPIA DIGITAL</a>
                </Link>
                <ul className={isOpen === false ?
                    styles.navmenu : styles.navmenu + ' ' + styles.active}>
                    {/* <input className={styles.search__input} type="text" placeholder="Analyze any influencer..." /> */}
                    <li className={styles.navitem}>
                        <Link href='/'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>Why Betopia?</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href=''>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>Resources</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href=''>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>About</a>
                        </Link>
                    </li>
                    <li className={styles.navitem}>
                        <Link href='https://next-ts-fe.vercel.app/auth/signin'>
                            <a className={isOpen === false ?
                                styles.navlink : styles.navlink + ' ' + styles.active}
                                onClick={openMenu}>Login</a>
                        </Link>
                    </li>
                    <button className={styles.navbarButton} onClick={handleClick}>GET STARTED</button>
                </ul>
                <button className={isOpen === false ?
                    styles.hamburger : styles.hamburger + ' ' + styles.active}
                    onClick={openMenu}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
            </nav>
        </div>
    )
}
