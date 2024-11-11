// @ts-nocheck
import { jobTypes } from "../jobInternshipConfig";
import DeftMultiselect from "../../../components/deftMultiselect/index";

export default function CommonComponent({ ...props }) {
  const { title, applyFilter, filter, setFilter } = props;

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
          <DeftMultiselect
            options={jobTypes?.map((item) => ({
              label: item?.title,
              value: item?.value,
            }))}
            value={filter?.skills}
            onChange={(val) => {
              setFormData({ ...formData, skills: val });
            }}
            placeholder="Search"
            dropdownHeight="200px"
            multi={true}
          />
        </div>
        <div className="mt-4">
          <span className="menu-header-text">Location</span>
          <DeftMultiselect
            options={jobTypes?.map((item) => ({
              label: item?.title,
              value: item?.value,
            }))}
            value={filter?.skills}
            onChange={(val) => {
              setFormData({ ...formData, skills: val });
            }}
            placeholder="Search"
            dropdownHeight="200px"
            multi={true}
          />
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
                setFilter({});
                applyFilter({});
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
