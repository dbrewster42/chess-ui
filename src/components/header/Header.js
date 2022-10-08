import React from "react";
import "./Header.css"
import pic from "./01.jpg"
import pic2 from "./2.jpg"
import pic3 from "./images.jpg"
import pic4 from "./4.jpg"

const Header = () => {
    return ( 
        <div id="header">
            <img className="imgs" src={pic} alt="pic" /> 
            <img className="imgs" src={pic2} alt="pic" />
            <img className="imgs2" src={pic4} alt="pic" />
            <img className="imgs2" src={pic3} alt="pic" />
            
            <h1 className="title">Mr Magoo's Master Chess</h1>
        </div>
     );
}
 
export default Header;