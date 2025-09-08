import { Poppins, Open_Sans as OpenSans } from "next/font/google";

export const openSans = OpenSans({
  subsets: [ "latin" ],
  display: "swap",
})
  
export const poppins = Poppins({
  subsets: [ "latin" ],
  display: "swap",
  variable: "--font-poppins",
  weight: "600",
})