import React from "react"

const dateObj = new Date()
const currentYear = dateObj.getFullYear();

const Footer = () => {
    return <footer>
    <p>© Copyright {currentYear}</p>
    </footer>
}
export default Footer    