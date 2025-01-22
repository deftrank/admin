// @ts-nocheck
import React, { useEffect, useState } from "react";
import DeftInput from "../../../components/deftInput/deftInput";
import DeftDate from "../../../components/deftDate/index";
import { Form } from "react-bootstrap";
import DeftSelect from "../../../components/dropdown";
import { USER_TYPE } from "../../../utils/appEnums";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanDetailsByAdmin,
  getUpdatePlanDetailsByAdmin,
} from "../../../store/slice/onBoardingSlice";

export default function UpdatePlan() {
  const { id } = useParams();
  const [formDataError, setFormDataError] = useState({});
  const dispatch = useDispatch();
  const { planDetailsByAdmin } = useSelector((state) => state.onBoarding);

  const option = [
    {
      value: 1,
      label: "active",
    },
    {
      value: 2,
      label: "Inactive",
    },
  ];
  const [formData, setFormData] = useState({});
  const fetchPlanDetails = () => {
    if (!formData?.name) {
      setFormDataError((prev) => ({
        ...prev,
        name: "Name is required",
      }));
      return;
    }
    if (!formData?.title) {
      setFormDataError((prev) => ({
        ...prev,
        title: "title is required",
      }));
      return;
    }
    if (!formData?.description) {
      setFormDataError((prev) => ({
        ...prev,
        description: "description is required",
      }));
      return;
    }
    if (!formData?.expire) {
      setFormDataError((prev) => ({
        ...prev,
        expire: "expire months is required",
      }));
      return;
    }
    if (!formData?.for) {
      setFormDataError((prev) => ({
        ...prev,
        for: "user type is required",
      }));
      return;
    }
    if (!formData?.status) {
      setFormDataError((prev) => ({
        ...prev,
        status: "status is required",
      }));
      return;
    }
    if (!formData?.amount) {
      setFormDataError((prev) => ({
        ...prev,
        amount: "amount is required",
      }));
      return;
    }
    let data = {
      plan_for: formData?.for?.value,
      plan_type: planDetailsByAdmin?.plan_type,
      name: formData?.name,
      description: formData?.description,
      amount: formData?.amount,
      test_allowed: planDetailsByAdmin?.test_allowed,
      connection_allowed: planDetailsByAdmin?.connection_allowed,
      validity: formData?.expire,
      is_active: formData?.status,
      title: formData?.title,
      discount: formData?.discount,
    };
    let requestParam = {
      id: id,
      language: "en",
    };
    dispatch(getUpdatePlanDetailsByAdmin(requestParam, data));
  };
  // here is calling plan details
  const handlePlanDetails = () => {
    let data = {
      id: id,
      language: "en",
    };
    dispatch(getPlanDetailsByAdmin(data));
  };
  useEffect(() => {
    handlePlanDetails();
  }, []);
  // fetch data from apo
  useEffect(() => {
    const usertype = USER_TYPE?.findIndex(
      (item) => item?.value === planDetailsByAdmin?.plan_for
    );
    console.log(usertype);
    setFormData((prev) => ({
      ...prev,
      name: planDetailsByAdmin?.name,
      title: planDetailsByAdmin?.title,
      description: planDetailsByAdmin?.description,
      for: USER_TYPE[usertype]?.value,
      expire: planDetailsByAdmin?.validity,
      discount: planDetailsByAdmin?.discount,
      amount: planDetailsByAdmin?.amount,
      status: planDetailsByAdmin?.is_active,
    }));
  }, [planDetailsByAdmin]);
  return (
    <>
      <div className="card">
        <div class="p-3">
          <h4>Subscription Plans</h4>
          <div class="d-flex justify-content-between"></div>
        </div>
        <div className="container px-2 pb-4">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <DeftInput
              error={formDataError?.name}
                placeholder="Enter plan name "
                label="Plan Name"
                value={formData?.name}
                onchange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.trimStart(),
                  }))
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <DeftInput
               error={formDataError?.title}
                placeholder="Enter plan title "
                label="Plan Title"
                value={formData?.title}
                onchange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.trimStart(),
                  }))
                }
              />
            </div>
            <div className="col-12  mb-3">
              <Form.Label>Plan Description </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={"Enter plan description"}
                value={formData?.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    // @ts-ignore
                    description: e.target.value.trimStart(),
                  }))
                }
              />
              <span className={"text-danger my-1"}>   {formDataError?.description}</span>
            </div>

            <div className="col-12 col-md-6 mb-3">
              <DeftInput
              error={formDataError?.expire}
                placeholder="Enter plan enter plan month "
                label="Expire Months"
                value={formData?.expire}
                onchange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expire: e.trimStart(),
                  }))
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <DeftSelect
              error={formDataError?.for}
                options={USER_TYPE}
                label={"USer Type"}
                value={formData?.for}
                placeholder={"Please select  user Type "}
                onChange={(e) => {
                  console.log(e);
                  setFormData((prev) => ({
                    ...prev,
                    for: e,
                  }));
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <DeftSelect
              error={formDataError?.status}
                options={option}
                label={"Status"}
                value={formData?.status}
                placeholder={"Please select  Plan Status "}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e,
                  }))
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <DeftInput
                placeholder="Enter plan Discount "
                maxLength={4}
                value={formData?.discount}
                label=" Discount"
                onchange={(e) =>{
                  const value = e;
              
                  // Regex to allow only digits, including decimals (e.g., 123, 12.34)
                  const numericRegex = /^[0-9]*\.?[0-9]*$/;
              
                  // Check if the input matches the numeric regex or is an empty string
                  if (numericRegex.test(value) || value === '') {
                    setFormData((prev) => ({
                      ...prev,
                    discount: value,
                  }))}}
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <DeftInput
              error={formDataError?.amount}
                placeholder="Enter plan amount "
                maxLength={4}
                value={formData?.amount}
                label="Amount"
                onchange={(e) => {
                  const value = e;
              
                  // Regex to allow only digits, including decimals (e.g., 123, 12.34)
                  const numericRegex = /^[0-9]*\.?[0-9]*$/;
              
                  // Check if the input matches the numeric regex or is an empty string
                  if (numericRegex.test(value) || value === '') {
                    setFormData((prev) => ({
                      ...prev,
                      amount: value,
                    }));
                  }
                }}
              />
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary" onClick={fetchPlanDetails}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
