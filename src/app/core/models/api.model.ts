enum Gender {
  Female = 0,
  Male,
}
type Age = number;
/** 고혈압 */
enum Hypertension {
  No = 0,
  Yes,
}
enum HeartDisease {
  No = 0,
  Yes,
}
enum Married {
  No = 0,
  Yes,
}
enum Work {
  Private = 0,
  SelfEmployed,
  Children,
  GovtJob,
  NeverWorked,
}
enum LiveIn {
  Urban = 0,
  Rural,
}
type Bmi = number;
enum Smoking {
  NeverSmoked = 0,
  FormerlySmoked,
  Smokes,
}

export interface ParamterBase {
  gender: Gender;
  age: Age;
  hypertension: Hypertension;
  heartDisease: HeartDisease;
  married: Married;
  work: Work;
  liveIn: LiveIn;
  smoking: Smoking;
}
export interface FormBody extends ParamterBase {
  weight: number;
  height: number;
}

export interface FormBodyBmi extends ParamterBase {
  bmi: number;
}
