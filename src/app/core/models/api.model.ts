export enum Gender {
  Female = 0,
  Male,
}
export type Age = number;
/** 고혈압 */
export enum Hypertension {
  No = 0,
  Yes,
}
export enum HeartDisease {
  No = 0,
  Yes,
}
export enum Married {
  No = 0,
  Yes,
}
export enum Work {
  Private = 0,
  SelfEmployed,
  Children,
  GovtJob,
  NeverWorked,
}
export enum LiveIn {
  Urban = 0,
  Rural,
}
export enum Smoking {
  NeverSmoked = 0,
  FormerlySmoked,
  Smokes,
}
export interface FormBody {
  gender: Gender;
  age: Age;
  hypertension: Hypertension;
  heartDisease: HeartDisease;
  married: Married;
  work: Work;
  liveIn: LiveIn;
  smoking: Smoking;
}
