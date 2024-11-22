// @ts-nocheck
import { jobTypes } from "../jobInternshipConfig";
import DeftMultiselect from "../../../components/deftMultiselect/index";
import Select from "react-select";
import { color } from "../../../themes/color/color";
export default function CommonComponent({ ...props }) {
  const {
    title,
    applyFilter,
    filter,
    setFilter,
    skillListData,
    cityListData,
    fetchCitiesList,
    clearFilter,
  } = props;
  const colourStyles = {
    // Style for the selected chips (multiValue)
    multiValue: (base, state) => ({
      ...base,
      backgroundColor: color.primary, // Optional: padding around chip
    }),

    // Style for the label inside the selected chips
    multiValueLabel: (base) => ({
      ...base,
      color: "white", // Text color inside the chip
      fontWeight: "bold", // Optional: text style
    }),
  };
  return (
    <>
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">{title}</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div className="mt-4">
          <span className="menu-header-text">Primary Skill</span>
          <Select
            placeholder="Primary skills"
            className={"w-100"}
            options={skillListData?.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
            styles={colourStyles}
            value={filter?.selectLabel}
            onChange={(selectedOptions) => {
              // Ensure we limit the selection to a maximum of 3 locations
              const limitedSelection = selectedOptions;

              const limitedSelectionLabels = selectedOptions?.map(
                (option) => option.label
              );

              setFilter({
                ...filter,
                skills: limitedSelectionLabels,
                selectLabel: limitedSelection,
              });
            }}
            // onInputChange={(e) => fetchCitiesList(e)}
            isMulti
          />
          {/* <DeftMultiselect
            options={skillListData?.map((item) => ({
              label: item?.name,
              value: item?._id,
            }))}
            value={filter?.skills}
            onChange={(val) => {
              setFilter({ ...filter, skills: val?.map((item) => item?.label) });
            }}
            placeholder="Search"
            dropdownHeight="200px"
            multi={true}
          /> */}
        </div>
        <div className="mt-4">
          <span className="menu-header-text">Location</span>
          <Select
            placeholder="Job Location"
            className={"w-100"}
            options={cityListData?.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
            styles={colourStyles}
            value={filter?.maxValue}
            onChange={(selectedOptions) => {
              // Ensure we limit the selection to a maximum of 3 locations
              const limitedSelection = selectedOptions.slice(0, 3);

              const limitedSelectionLabels = selectedOptions?.map(
                (option) => option.label
              );

              setFilter({
                ...filter,
                location: limitedSelectionLabels,
                maxValue: limitedSelection,
              });
            }}
            onInputChange={(e) => fetchCitiesList(e)}
            isMulti
          />
          {/* <DeftMultiselect
            options={cityListData?.map((item) => ({
              label: item?.name,
              value: item?._id,
            }))}
            value={filter?.skills}
            onChange={(val) => {

              setFilter({ ...filter, location: val?.map((item)=>item?.label) });
            }}
            placeholder="Search"
            dropdownHeight="200px"
            multi={true}
          /> */}
        </div>
        <div className="mt-4">
          <span className="menu-header-text">Short By</span>
          <div className="mt-1">
            {jobTypes?.map((item) => (
              <>
                <button
                  type="button"
                  className={
                    filter?.sort_by?.value == item.value
                      ? "btn btn-primary text-capitalize m-1"
                      : "btn btn-outline-primary text-capitalize m-1"
                  }
                  onClick={() => {
                    setFilter((filter) => ({
                      ...filter,
                      sort_by: item,
                    }));
                  }}
                >
                  {item?.title}
                </button>
              </>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <span className="menu-header-text">Job status</span>
          <div className="mt-1">
            <button
              type="button"
              className={
                filter?.job_status == 1
                  ? "btn btn-primary text-capitalize m-1"
                  : "btn btn-outline-primary text-capitalize m-1"
              }
              onClick={() => {
                setFilter((filter) => ({
                  ...filter,
                  job_status: 1,
                }));
              }}
            >
              Active
            </button>
            <button
              type="button"
              className={
                filter?.job_status == 2
                  ? "btn btn-primary text-capitalize m-1"
                  : "btn btn-outline-primary text-capitalize m-1"
              }
              onClick={() => {
                setFilter((filter) => ({
                  ...filter,
                  job_status: 2,
                }));
              }}
            >
              Deactive
            </button>
          </div>
        </div>
        <div className="mt-4">
          <span className="menu-header-text">Verify Status</span>
          <div className="mt-1">
            <button
              type="button"
              className={
                filter?.verify_job == 1
                  ? "btn btn-primary text-capitalize m-1"
                  : "btn btn-outline-primary text-capitalize m-1"
              }
              onClick={() => {
                setFilter((filter) => ({
                  ...filter,
                  verify_job: 1,
                }));
              }}
            >
              Pending
            </button>
            <button
              type="button"
              className={
                filter?.verify_job == 2
                  ? "btn btn-primary text-capitalize m-1"
                  : "btn btn-outline-primary text-capitalize m-1"
              }
              onClick={() => {
                setFilter((filter) => ({
                  ...filter,
                  verify_job: 2,
                }));
              }}
            >
              Verify
            </button>
            <button
              type="button"
              className={
                filter?.verify_job == 3
                  ? "btn btn-primary text-capitalize m-1"
                  : "btn btn-outline-primary text-capitalize m-1"
              }
              onClick={() => {
                setFilter((filter) => ({
                  ...filter,
                  verify_job: 3,
                }));
              }}
            >
              Rejected
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <button
              type="button"
              className={"btn btn-outline-primary text-capitalize m-1 w-100"}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => applyFilter(filter)}
            >
              Apply
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className={"btn btn-outline-primary text-capitalize m-1 w-100"}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => {
                // Reset the filter state with default values (or clear everything)
                setFilter({
                  skills: [],
                  selectLabel: [], // Reset skills (make it an empty array or the appropriate default)
                  location: [], // Reset location
                  maxValue: [], // Reset maxValue (if needed)
                });
                clearFilter(); // Apply the "empty" filter to reset the view
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
