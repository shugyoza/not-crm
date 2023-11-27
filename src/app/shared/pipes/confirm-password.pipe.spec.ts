import { ConfirmPasswordPipe } from './confirm-password.pipe';

describe('ConfirmPasswordPipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new ConfirmPasswordPipe();

  it('transforms truthy string errors to an empty string ""', () => {
    const mockFieldErrors = { required: true };
    const result = pipe.transform(
      mockFieldErrors,
      'passwordValue',
      'confirmPasswordValue'
    );

    expect(result).toBe('');
  });

  it('returns empty string when password or confirmPassword is falsy', () => {
    const mockFieldErrors = { required: true };
    const result1 = pipe.transform(mockFieldErrors, null, 'something');
    const result2 = pipe.transform(mockFieldErrors, 'something', null);

    expect(result1).toBe('');
    expect(result2).toBe('');
  });

  it('transforms empty string "" into a message string of evaluation whether password text is confirmed or not', () => {
    const mockFieldErrors = null;
    const password = 'passwordValue';
    const confirmPassword = 'confirmPasswordValue';
    const result = pipe.transform(mockFieldErrors, password, confirmPassword);

    expect(result).toBe('password not confirmed');
  });

  it('transforms empty string "" into a message string of evaluation whether password text is confirmed or not', () => {
    const mockFieldErrors = null;
    const password = 'passwordValue';
    const confirmPassword = password;
    const result = pipe.transform(mockFieldErrors, password, confirmPassword);

    expect(result).toBe('password confirmed');
  });
});
