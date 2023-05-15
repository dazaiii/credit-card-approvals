export enum Ethnicity {
  latino = "Latino",
  asian = "Asian",
  other = "Other",
  black = "Black",
  white = "White",
}

export enum Gender {
  male = 1,
  female = 2,
}

export interface RequestCreditCardApproval {
  ethnicity: Ethnicity;
  yearsEmployed: number;
  income: number;
  gender: Gender;
  age: number;
  married: boolean;
  bankCustomer: boolean;
}

export interface ResponseCreditCardApproval {
  approved: boolean;
}

export interface ResponseHistory {
  ethnicity: Ethnicity;
  yearsEmployed: number;
  income: number;
  gender: Gender;
  age: number;
  married: boolean;
  bankCustomer: boolean;
}
