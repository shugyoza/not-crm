export const length = {
  /* RFC std is, 
  max 64 chars for local address + 
  255 chars for complete domain, as in:
  local.address@complete.domain */
  email: {
    min: 6, // i.e.: 'a@b.ca'
    max: 254, // Longest email add is 320 and it is silly.
  },
  username: {
    min: 6, // google's enforced minimum length, although its use case (big users pool) very likely won't apply to app with small users pool
    max: 254,
  },
  password: {
    min: 8, // common standard
    max: 254,
  },
};

export const valid = {
  username: /^[a-z0-9][-a-z0-9_]*\$?$/,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
};

export const errorMessages = {
  login: {
    required: 'required',
    minlength: `minimum ${length.username.min} characters`,
    maxlength: `maximum ${length.username.max} characters`,
    email: 'must be a valid email format'
  },
  email: {
    required: 'required',
    minlength: `minimum ${length.email.min} characters`,
    maxlength: `maximum ${length.email.max} characters`,
    pattern: "format must be valid, e.g: 'ab.cd@email.com'",
  },
  username: {
    required: 'required',
    minlength: `minimum ${length.username.min} characters`,
    maxlength: `maximum ${length.username.max} characters`,
    pattern:
      "Username can only contain number, dash (-) underscore (-), lowercased letter, (NO CAPITAL letter), e.g: 'user_name-2'",
  },
  password: {
    required: 'required',
    minlength: `minimum ${length.password.min} characters`,
    maxlength: `maximum ${length.password.max} characters`,
    pattern: `must contain at least a number, a capital letter, and a lowercase letter`,
  },
  confirmPassword: {
    required: 'required',
  },
};
