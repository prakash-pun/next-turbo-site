import React from "react";

const TeamAvatar: React.FC<any> = ({ teamMembers }) => {
  return (
    <>
      {teamMembers && teamMembers.length
        ? teamMembers.map((data: any) => (
            <img
              key={data.id}
              src={data.avatar}
              className=" h-6 w-6 rounded-full bg-slate-100 ring-2 ring-white"
              loading="lazy"
              alt={data.member_name}
            />
          ))
        : null}
    </>
  );
};

export { TeamAvatar };
