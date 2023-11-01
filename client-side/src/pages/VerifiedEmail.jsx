import React , {useEffect, useState} from "react";
import { MdVerifiedUser  , MdError} from "react-icons/md";
import {  useParams , useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
function VerifiedEmail() {
  const [verified, setVerified] = useState(false); // [1]
  const [loading, setLoading] = useState(true); 
  const otp = useParams().otp;
  const token = useParams().token;

  console.log(currentUser)
  useEffect(() => {
    const fetchVerifiedEmail = async () => {
        const response = await axios.get(`/api/auth/verifyEmail/${token}/${otp}`, {
          validateStatus: false
        });

        if (response.status === 200) {
          setVerified(true);
          setLoading(false);
        } else {
          setVerified(false);
          setLoading(false);
        }
      }
  
    fetchVerifiedEmail();
  }, [currentUser]);
  

  if (loading) {
    return (
      <section className="container flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 shadow-sm rounded-md p-6">
          <ClipLoader color="#639cff" size={150} />
        </div>
      </section>
    );
  }

  if (!verified) {
    return (
      <section className="container flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 rounded-md p-6">
          <div>
            <MdError className="text-9xl text-red-500" />
          </div>
          <h1
          className="text-3xl font-bold text-center"
          >Invalid Link</h1>
          <p
          className="text-center  text-gray-500"
          >
            The link you have followed is invalid. Please try again with a valid
            link.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="container flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 shadow-lg rounded-md p-6">
        <div>
            <MdVerifiedUser className="text-9xl text-green-500" />
        </div>
        <h1>Verified Email</h1>
        <p>
          Thank you for verifying your email. You may now login to your account.
        </p>
      </div>
    </section>
  );
}

export default VerifiedEmail;
