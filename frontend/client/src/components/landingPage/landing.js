import React from 'react';
import './landing.css'; 
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import backgroundImage from './flight.jpg'; 

export default function LandingPage() {

    const Navigate = useNavigate();
  
    const enterSite = () => {

        console.log("button clicked ")
        
      Navigate('/homepage')
    }

    const goToLogin = () => {
        Navigate('/login');
    }

    return (
        <div className="landing-container">
            <div className="image-container">
                <div className="image" style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover'
                }}>
                </div>
            </div>
            <nav className="navbar">
                <div className="brand">RA </div>
                <div className="login-icon" onClick={goToLogin}><FaSignInAlt /></div>
            </nav>
            <div className="slogan-container">
                <div className="main-slogan">Always Travel</div>
                <div className="sub-slogan">WITH YOUR OWN, FOR YOUR OWN</div>
            </div>
            <button onClick={enterSite} className="get-started-btn">Get Started</button>
        </div>
    );
    
    
}




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaSignInAlt } from 'react-icons/fa';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './landing.css';
// import backgroundImage from './flight.jpg'; 

// export default function LandingPage() {

//     const Navigate = useNavigate();
  
//     const enterSite = () => {
//         console.log("button clicked ");
//         Navigate('/homepage');
//     }

//     const goToLogin = () => {
//         Navigate('/login');
//     }

//     return (
//         <div className="landing-container">
//             <div className="image-container">
//                 <div className="image" style={{
//                     backgroundImage: `url(${backgroundImage})`,
//                     backgroundSize: 'cover'
//                 }}>
//                 </div>
//             </div>
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container">
//                     <a className="navbar-brand" href="/">RA</a>
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav ml-auto">
//                             <li className="nav-item">
//                                 <button className="btn btn-primary" onClick={goToLogin}><FaSignInAlt /> Login</button>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div className="slogan-container text-center text-white">
//                 <div className="main-slogan">Always Travel</div>
//                 <div className="sub-slogan">WITH YOUR OWN, FOR YOUR OWN</div>
//             </div>
//             <div className="text-center mt-4">
//                 <button onClick={enterSite} className="btn btn-lg btn-success">Get Started</button>
//             </div>
//         </div>
//     );
// }
