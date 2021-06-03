import React from "react"

const dateObj = new Date()
const currentYear = dateObj.getFullYear();
const Footer = () => {
    return <p>Copyright {currentYear}</p>
}
export default Footer