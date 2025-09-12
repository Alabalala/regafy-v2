"use client"
import { useState } from "react";
import LogoSVG from "../SVGs/LogoSVG";
import Hamburger from 'hamburger-react'

export const NavBar = () => {
const [isOpen, setOpen] = useState(false)

  return (
    <nav className={"flex justify-between items-center p-4 bg-secondary dark:bg-secondary-dark border-b-2"}>
        <div className={"flex gap-1 items-center"}>
        <p className={"font-bold text-xl"}>REG</p>
        <div>
            <LogoSVG />
        </div>
        <p className={"font-bold text-xl"}>FY</p>
        </div>

        <Hamburger 
        size={24}
        toggled={isOpen}
        toggle={setOpen} 
        />
    </nav>
  );
};
