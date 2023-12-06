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
  },
};

export const valid = {
  username: /^[a-z0-9][-a-z0-9_]*\$?$/,
  password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
};

export const errorMessages = {
  login: {
    required: 'Required field',
    minlength: "Input is too short",
    maxlength: `"Input is too long"`,
  },
  email: {
    required: 'Required field',
    minlength: "Email format must be valid, e.g: 'a@b.ca'",
    maxlength: `"Email format must be valid, e.g: 'not-this_long@email.com'"`,
    pattern: "Email format must be valid, e.g: 'ab.cd@email.com'",
  },
  username: {
    required: 'Required field',
    minlength: `Username must have a minimum of ${length.username.min} characters`,
    maxlength: `Username must have a maximum of ${length.username.max} characters`,
    pattern:
      "Username can only contain number, dash (-) underscore (-), lowercased letter, (NO CAPITAL letter), e.g: 'user_name-2'",
  },
  password: {
    required: 'Required field',
    minlength: `Password must have a minimum of ${length.password.min} characters`,
    pattern:
      'Password must contain at least one number, one capital letter, and one lowercase letter, e.g.: paSsword123',
  },
  confirmPassword: {
    required: 'Required field',
  },
};
