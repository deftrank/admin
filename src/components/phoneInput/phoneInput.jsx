// @ts-nocheck
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
export default function PhoneInputField(props) {
  const { PhoneData, setPhoneData, error, label } = props;

  return (
    <>
      <label className="form-label" htmlFor="country">
        {label}
      </label>
      <PhoneInput
        inputStyle={{
          height: "47px",
          width: "100%", // Use '100%' for better compatibility
          fontSize: "18px",
        }}
        placeholder={"Enter Your Number"}
        className="bg-transparent rounded-2 border-0"
        international={true}
        country="in"
        value={
          PhoneData?.countryCode + PhoneData?.phone
            ? PhoneData?.countryCode + PhoneData?.phone
            : ""
        }
        onChange={(val, data) => {
          // Extract the phone number without the country code
          let phoneNumber = val.slice(data?.dialCode?.length).trim();
          setPhoneData((PhoneData) => ({
            ...PhoneData,
            phone: phoneNumber,
            countryCode: `+${data?.dialCode}`,
            mobileErr: "",
          }));
        }}
      />
      {error && (
        <div className="text-danger font-size-14" style={{ fontWeight: 400 }}>
          {error}
        </div>
      )}
    </>
  );
}
