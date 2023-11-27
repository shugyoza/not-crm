import { ErrorsMessagePipe } from './errors-message.pipe';
import { errorMessages } from '../constants';

describe('ErrorsMessagePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new ErrorsMessagePipe();
  const mockFieldErrors = {
    minlength: { requiredLength: 6, actualLength: 1 },
    pattern: {
      requiredPattern:
        "/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/",
      actualValue: 'w',
    },
  };

  it('transforms null errors to an empty string ""', () => {
    const result = pipe.transform(null, errorMessages.email);
    expect(result).toBe('');
  });

  it('transforms errors into a single error message that represent the first error in the errors object ""', () => {
    const result = pipe.transform(mockFieldErrors, errorMessages.email);
    const firstErrorKey = 'minlength' as keyof typeof errorMessages.email;
    const expectedResult = errorMessages.email[firstErrorKey];
    expect(result).toBe(expectedResult);
  });
});
