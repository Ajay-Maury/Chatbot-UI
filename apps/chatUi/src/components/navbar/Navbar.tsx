import React, { useState } from 'react'
import { useLocalization } from '../../hooks/useLocatization'
import UserSelect from '../ui-components/UserSelect'
import styles from './index.module.css'
import LanguagePopup from './LanguagePopup'
const Navbar = () => {
const [isOpen,setIsOpen]=useState(false)
    const t = useLocalization();
    const storedUserData = localStorage.getItem('userData');
    let userName =  ""
    if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        userName = parsedUserData?.firstName
    }
    const userProfile = ""

    return (
        <div
            className={styles.container}
        >
             <div>
             <LanguagePopup isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
            <div className={styles.menuContainer}>
                {/*<Image src={Menu.src} height={25} width={25} alt='menu' className={styles.menu} />*/}
            </div>
            <div className={styles.navbarHeading}>
            {/* <Image src={logo} height={30} alt='logo' /> */}
            <h3>Chat UI</h3>
            </div>
            <div onClick={()=>setIsOpen(true)} style={{cursor:'pointer'}}>
                {/*<Image src={NavIcon.src} height={24} width={24} alt='menu' className={styles.navIcon}/> */}
            </div>

             </div>
            <div>
            {/* <Image src={ISBLogo.src} height={30} width={66} alt='menu' className={styles.menu} /> */}
            {/* {userName} */}
            {userName && <UserSelect value={userName} logo={userProfile} />
}
            </div>
        </div>
    )
}

export default Navbar