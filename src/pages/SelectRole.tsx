import React from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";


export const SelectRole: React.FC = () => {



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
          to="/influncer-signup"
          className="text-[#f5b640] transition hover:text-white border border-[#f5b640]  rounded-md w-20 py-3 text-center hover:bg-[#f5b640]"
        >
          Influencer
        </Link>
        <Link
          to=""
          className="text-[#f5b640] transition hover:text-white border border-[#f5b640] rounded-md w-20 py-3 text-center hover:bg-[#f5b640]"
        >
          Radio
        </Link>
        <Link
          to=""
          className="text-[#f5b640] transition hover:text-white border border-[#f5b640] rounded-md w-20 py-3 text-center hover:bg-[#f5b640]"
        >
          Tv
        </Link>
      </div>



    </AuthLayout>
  );
};
