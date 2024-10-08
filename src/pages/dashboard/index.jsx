import React from "react";
import { color } from "../../themes/color/color";
import defaultImg from "../../assets/img/default.jpg";
import { badges, companies, userData } from "../../component/jsonData";
import { Icon } from "@iconify/react/dist/iconify.js";
import StudentDetails from "./studentDetails";

export default function Home() {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <StudentDetails />
        </div>
      </div>
    </div>
  );
}
