import React from "react";
// import { IMAGES,  } from "../constant/theme";
import Images from "../../photos/background.avif"


const Footer = () => {
 const currentYear = new Date().getFullYear();
 const handleEncipherhealthClick = () => {
   // You can use window.location.href or any router navigation method
   window.location.href = "https://encipherhealth.com/";
 };
 return (
   <footer className="text-center">
     <div className="d-flex">
       <div
         className=" d-flex flex-column align-items-center justify-content-center"
         style={{ margin: "0 auto" }}
       >
         <div className="d-flex align-items-center mb-3">
           <img
             src={Images}
             style={{ height: "30px", width: "30px", padding: "4px" }}
           />
           <p
            className="mb-0 hovered-text"
             style={{ fontSize: "14px", cursor: "pointer" }}
             onClick={handleEncipherhealthClick}
           >
             &copy; {currentYear} Encipherhealth.Pvt.Ltd
           </p>
           &nbsp; &nbsp;
           <ul className="list-inline mb-0">
             <li className="list-inline-item">
               <span href="#" style={{ fontSize: "14px" }}>
                 Terms
               </span>
             </li>
             <li className="list-inline-item">
               <span href="#" style={{ fontSize: "14px" }}>
                 Privacy
               </span>
             </li>
             <li className="list-inline-item">
               <span href="#" style={{ fontSize: "14px" }}>
                 Security
               </span>
             </li>
             <li className="list-inline-item">
               <span href="#" style={{ fontSize: "14px" }}>
                 Status
               </span>
             </li>
             <li className="list-inline-item">
               <span href="#" style={{ fontSize: "14px" }}>
                 Docs
               </span>
             </li>
             <li className="list-inline-item">
               <span href="#" style={{ fontSize: "14px" }}>
                 Contact &nbsp;{" "}
               </span>
             </li>
           </ul>
         </div>
       </div>
     </div>
   </footer>
 );
};


export default Footer;