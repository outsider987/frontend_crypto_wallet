export const validateRegexp = {
  email: RegexpBindFactory(/^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/),
  require: RegexpBindFactory(/\w+/),
  password: RegexpBindFactory(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$/),
};

export function RegexpBindFactory(regexp: RegExp) {
  return regexp.test.bind(regexp);
}
