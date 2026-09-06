import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { AuthButton } from "../components/auth/AuthButton";
import { SocialButton } from "../components/auth/SocialButton";
import { useAuth } from "../hooks/auth/useAuth";


export const SelectRole: React.FC = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    await login({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    navigate("/dashboard");
  };
  return (
    <AuthLayout
      title="Make a selection."
      subtitle="Are you an Artist, Influencer, Radio or TV station?"
      maxWidth="md"
    >
      <div className="mt-8 grid grid-cols-4 gap-3 justify-items-center">
       <Link
              to="/login"
              className="text-[#f5b640] transition hover:text-white border border-[#f5b640] rounded-md w-20 py-3 text-center hover:bg-[#f5b640] "
            >   
            Artist
            </Link>
            <Link
              to="/login"
              className="text-[#f5b640] transition hover:text-white border border-[#f5b640]  rounded-md w-20 py-3 text-center hover:bg-[#f5b640]"
            >
            Influencer
            </Link>
            <Link
              to="/login"
              className="text-[#f5b640] transition hover:text-white border border-[#f5b640] rounded-md w-20 py-3 text-center hover:bg-[#f5b640]"
            >
            Radio
            </Link>
            <Link
              to="/login"
              className="text-[#f5b640] transition hover:text-white border border-[#f5b640] rounded-md w-20 py-3 text-center hover:bg-[#f5b640]"
            >
            Tv
            </Link>
      </div>



    </AuthLayout>
  );
};
