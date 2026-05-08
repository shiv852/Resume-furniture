import React from "react";
// import { Link } from "react-router-dom";
import { EmailShareButton, FacebookShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import AllContactbtn from "./AllContactbtn";



const ContactDetails = () => {
  return (
    <div className="detailscontainer  ">
      <div className="box1 md:px-14 pt-2 mx-3 mb-3 rounded-sm" style={{border: "solid 1px#eee"}}>
        <li className="list-none "> <h2>Jaipur Furniture</h2> </li>
        <span style={{fontFamily:" Gill Sans" }}>
          {" "}
          <strong>
            <i className="fa fa-map-marker " aria-hidden="true"></i>Chandpol
          </strong>{" "}
          , Jaipur • open at 8am to 9pm • 25Year of Experience
        </span>
        <AllContactbtn/>
      </div>
      <div className="lg:flex my-8">
                <div className="box2 md:flex   md:flex-row rounded-sm mx-3 " style={{border: "solid 1px#eee"}}>
                    <span className="px-10 flex flex-col justify-center" >
                        <h3>Quick Information</h3>
                        <span  style={{fontFamily:" Gill Sans" , fontsize:" 60px" , fontWeight:"600" }}>payment method</span>
                        <p style={{fontFamily:" Gill Sans" , fontsize:" 50px"}}>
                        Cash,Debit Card,Credit Card,
                        <br />
                        UPI,Paytm,Rupay Card,G pay,Phone pe{" "}
                        </p>
                    </span>

                    <span className=" px-10 flex flex-col justify-center">
                        <h5>Timing</h5>
                        <p>
                        <span style={{fontFamily:" Gill Sans" , fontsize:" 50px"}}>Mon - Sun </span>9:00 am - 9:00 pm
                        </p>
                    </span>

                    <span className=" px-10 flex flex-col justify-center ">
                        <h5>Year of Experience</h5>
                        <p style={{fontFamily:" Gill Sans"}}>25 Year</p>
                    </span>
                </div>
            <div className="categories mx-3 my-9 md:my-0 py-4  md:mx-14  border-2 px-10  rounded-sm" style={{border: "solid 1px#eee"}}>
                        <h4>Address</h4>
                    <p  style={{fontFamily:" Gill Sans" , fontsize:" 50px"}}>
                    Vivekanand marg Nahri ka Naka ,
                    <br />
                    Chandpol bajar , Jaipur
                    </p>

                   
                    <EmailShareButton url="https://kumarsainimahesh59@gmail..com/">
                    <span className="flex flex-row items-center gap-2 my-2" style={{fontFamily:" Gill Sans" }}>
                    <MdEmail/>
                    Send Enquiry by Email
                    </span>
                    </EmailShareButton>
                    
                    <FacebookShareButton url="https://www.facebook.com/mahesh.maheshkumarsaini">
                    <span className="flex mb-4 flex-row items-center gap-2" style={{fontFamily:" Gill Sans"}}>
                    <FaFacebook/>
                    Get info via facebook
                    </span>
                    </FacebookShareButton>
                    
            </div>
      </div>
    </div>
  );
};

export default ContactDetails;
