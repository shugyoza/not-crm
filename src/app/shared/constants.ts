export const length = {
  /* RFC std is, 
  max 64 chars for local address + 
  255 chars for complete domain, as in:
  local.address@complete.domain */
  email: {
    min: 6, // i.e.: 'a@b.ca'
    max: 255, // Longest email add is 320 and it is silly.
  },
  username: {
    min: 6, // google's enforced minimum length, although its use case (big users pool) very likely won't apply to app with small users pool
    max: 255,
  },
  password: {
    min: 8, // common standard
  },
};

export const valid = {
  username: /^[a-zA-Z0-9][-a-zA-Z0-9_]*\$?$/,
  email:
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
};

export const errorMessages = {
  email: {
    required: 'required',
    minlength: `minimum ${length.email.min} characters`,
    maxLength: `maximum ${length.email.max} characters`,
    pattern: "email format must be valid, e.g: 'something@email.com'",
  },
  username: {
    required: 'required',
    minlength: `minimum ${length.username.min} characters`,
    maxLength: `maximum ${length.username.max} characters`,
    pattern:
      "username can only have numbers, dash (-) underscore (-), lowercased letter, (NO CAPITAL letter), e.g: 'user_name-2'",
  },
  password: {
    required: 'required',
    minlength: `minimum ${length.password.min} characters`,
    pattern:
      'password must have at least one number, one capital letter, and one lowercase letter, e.g.: Password123',
  },
  confirmPassword: {
    required: 'required',
  },
};
