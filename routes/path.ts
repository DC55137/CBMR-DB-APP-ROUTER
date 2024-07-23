// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_JOB = "/jobs";

// ----------------------------------------------------------------------

export const PATH_AUTH = {};

export const PATH_PAGE = {
  root: "/",
  schedule: "/schedule",
  studyGuide: "/study-guide",
  pricing: "/pricing",
  about: "/about",
  bills: "/bills",
};

export const PATH_JOB = {
  root: ROOTS_JOB,
  new: path(ROOTS_JOB, "/new-job"),
};
