export const TOAST_TYPES = {
  warning: "warning",
  error: "error",
  success: "success",
  copy: "copy",
  thanks: "thanks",
  fav: "fav",
  report: "report",
};

export const EventTypeForm = {
  image: "image",
  text: "text",
  video: "video",
};

export const EventPageType = {
  HOME: "HOME",
  EVENT: "EVENT",
  ATTENDEEE: "ATTENDEE",
  ORDERS: "ORDERS",
  PAYMENT_OPTIONS: "PAYMENT_OPTIONS",
};
export const PAGES_ENUM = {
  PER_PAGE: 20,
  PAGE: 1,
  ATTENDEEE: "ATTENDEE",
  ORDERS: "ORDERS",
  PAYMENT_OPTIONS: "PAYMENT_OPTIONS",
};
export const STATUS_TYPE = {
  active: 1,
  Deactive: 2,
};
export const JOB_STATUS={
  verified :2,
  unverified:1,
  
}
export class ApplicationStatus {
  static apply = 1;
  static shortlist = 2;
  static reject = 3;
  static notApplied=0;
}
export const APPLICANT_FILTERS = [
  { title: "Default", value: 0 },
  { title: "New First ", value: 1 },
  { title: "Old First ", value: 3 },
  { title: "Location A-Z", value: 5},
  { title: "Location  Z-A", value: 6 },
  { title: "Shortlisted", value: 9 },
  { title: "Applied", value: 10 },
  { title: "Rejected", value: 11 },
];
export const user_Type={
  student:1,
  company:2,
}


export const USER_TYPE=[{
  label:"Student",
  value:1
},
{
label:"Company",
value:2}]
export const COMP_TEST_STATUS={
  UNDER_REVIEW:2,
  UNDER_DISCUSSION:3,
  COMPLETE:4

}
export const PER_PAGES = {
  PAGES: 1,
  PER_Pages: 10,
  per_pages12: 12,
  PER_PAGES: 100,
};
export const sem = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: "66ff955de3eefa23125009a3",
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 6,
    label: 6,
  },
  {
    value: 7,
    label: 7,
  },

  {
    value: 8,
    label: 8,
  },
];