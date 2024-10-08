import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import vector from "../../../../assets/img/icons/abstract.svg";
export default function TypeOfJob(props) {
  const { handleJobRole } = props;
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="d-flex gap-4">
      <div className="border rounded-4 pt-4 px-4 pb-5" style={{ width: 200,cursor:"pointer"}} onClick={()=>{
        handleJobRole("coding")
      }}>
        <Icon icon="la:code" style={{ fontSize: 60 }} className={"mb-2"} />
        <h6 className="font-size-20 mb-3">Coding</h6>
        <p className="font-size-14 " style={{ fontWeight: 400 }}>
          Join world’s top coders and build innovative solution
        </p>
      </div>
      <div className="border rounded-4 pt-4 px-4 pb-5" style={{ width: 200 ,cursor:"pointer"}} onClick={()=>{
        handleJobRole("Non coding")
      }}>
        <img src={vector} alt="" style={{ width: 61, marginBottom: 8 }} />
        <h6 className="font-size-20  mb-3">Non Coding</h6>
        <p className="font-size-14" style={{ fontWeight: 400 }}>
          Support Innovations to change the tech space.
        </p>
      </div>
    </div>
  );
}
