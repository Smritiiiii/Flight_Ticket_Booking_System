// import React, { useState } from "react";
// import axios from "axios";
// import'./userinfo.css';

// function UserInfo() {
//   const [title, setTitle] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [ticketNumber, setTicketNumber] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
    

//       const response = await axios.post("http://localhost:3001/userinfo", {
//         title,
//         firstName,
//         middleName,
//         lastName,
//         phoneNumber,
//         email,
//         ticketNumber
       
//       });
      
//       setSuccessMessage(`Your ticket has been successfully booked. Check your email (${email}) for further information. `);

     
//       await axios.post("http://localhost:3001/sendemail", {
//         email,
//         ticketNumber
//       });
      
//     } catch (error) {
//       console.error("Error submitting user details:", error);
//     }
//   };


  


//   return (
//     <div className="container">
//       {successMessage ? (
//         <p>{successMessage}</p>
//       ) : (
//         <>
//           <h2>User Details</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="title"><strong>Title</strong></label>
//               <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="firstName"><strong>First Name</strong></label>
//               <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="middleName"><strong>Middle Name</strong></label>
//               <input type="text" className="form-control" id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="lastName"><strong>Last Name</strong></label>
//               <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="phoneNumber"><strong>Phone Number</strong></label>
//               <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email"><strong>Email</strong></label>
//               <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             </div>
//             <button type="submit" className="btn btn-primary">Submit</button>
//           </form>
//         </>
//       )}
//     </div>
//   );
// }
// export default UserInfo;


import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import './userinfo.css';

function UserInfo() {
  const location = useLocation();
  const { ticketNumber: initialTicketNumber } = location.state || {};
  const [ticketNumber, setTicketNumber] = useState(initialTicketNumber || "");

  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/userinfo", {
        title,
        firstName,
        middleName,
        lastName,
        phoneNumber,
        email,
        ticketNumber
      });

      setSuccessMessage(`Your ticket has been successfully booked. Check your email (${email}) for further information.`);

     

      await axios.post("http://localhost:3001/sendemail", {
        email,
        ticketNumber
      });
    } catch (error) {
      console.error("Error submitting user details:", error);
    }
  };

  return (
    <div className="container">
      {successMessage ? (
        <p>{successMessage}</p>
      ) : (
        <>
          <h2>User Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title"><strong>Title</strong></label>
              <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="firstName"><strong>First Name</strong></label>
              <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="middleName"><strong>Middle Name</strong></label>
              <input type="text" className="form-control" id="middleName" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName"><strong>Last Name</strong></label>
              <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber"><strong>Phone Number</strong></label>
              <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default UserInfo;
