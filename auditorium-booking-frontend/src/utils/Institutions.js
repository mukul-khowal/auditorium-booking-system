const InstitutionList = {
  BVIMR: "Bharati Vidyapeeth Institute of Management and Research",
  BVCOE: "Bharati Vidyapeeths College of Engineering",
  BVICAM:
    "Bharati Vidyapeeth's Institute of Computer Applications and Management",
  // Add more institution mappings as needed
};

const DepartmentList = {
  CSE: "Computer Science & Engineering",
  IT: "Information Technology",
  CSIT: "Computer Science and Information Technology",
  BBA: "Bachelor of Business Administration",
  MBA: "Master of Business Administration",
  BCA: "Bachelor of Computer Application",
  MCA: "Master of Computer Application",
  BAJMC: "Bachelor of Journalism and Mass Communication",

  // Add more department mappings as needed
};

const institutions = [
  {
    name: InstitutionList["BVCOE"],
    departments: [
      DepartmentList["CSE"],
      DepartmentList["IT"],
      DepartmentList["CSIT"],
    ],
  },
  {
    name: InstitutionList["BVIMR"],
    departments: [
      DepartmentList["BBA"],
      DepartmentList["BCA"],
      DepartmentList["MBA"],
    ],
  },
  {
    name: InstitutionList["BVICAM"],
    departments: [DepartmentList["MCA"], DepartmentList["BAJMC"]],
  },
  // Add more institutions based on InstitutionList mappings as needed
];

export { institutions, InstitutionList, DepartmentList };
