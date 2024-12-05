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