import React, { useEffect } from "react";
import { color } from "../../../../themes/color/color";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ReadyFor(props) {
  const { handleForInternship, handleForJob } = props;
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="border rounded-3 box-hover" onClick={handleForInternship}>
        <div className="d-flex p-3 justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <Icon
              icon="ic:baseline-store"
              style={{ color: color.primary, fontSize: 50 }}
            />
            <div className="d-flex flex-column">
              <h1 className="font-size-14">
                I am confident about my career path
              </h1>
              <p
                className={"font-size-14 mb-0"}
                style={{ fontWeight: 400, color: color.grey }}
              >
                {" "}
                I have a goal in mind
              </p>
            </div>
          </div>
          <Icon icon="mage:arrow-right" style={{ fontSize: 20 }} />
        </div>
      </div>
      <div className="border rounded-3 my-4 box-hover" onClick={handleForJob}>
        <div className="d-flex p-3 justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <Icon
              icon="material-symbols:location-city"
              style={{ color: color.primary, fontSize: 50 }}
            />
            <div className="d-flex flex-column">
              <h1 className="font-size-14">
                Help me find a suitable career path
              </h1>
              <p
                className={"font-size-14 mb-0"}
                style={{ fontWeight: 400, color: color.grey }}
              >
                {" "}
                I am unsure where to start my career
              </p>
            </div>
          </div>
          <Icon icon="mage:arrow-right" style={{ fontSize: 20 }} />
        </div>
      </div>
    </>
  );
}
