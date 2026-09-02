import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';

import { DependencyIdentifiers } from '@/core/crosscutting/injection/DependencyIdentifiers';
import { container } from '@/core/crosscutting/injection/DependencyInjectionContainer';
import { Message } from '@/core/domain/model/Message';

import { DEFAULT_MESSAGE, ERROR_MESSAGE_PREFIX, homeViewModel } from './homeViewModel';

const EXPECTED_CALL_COUNT = 1;

describe('homeViewModel', () => {
  beforeEach(() => {
    // Spy on the real container instead of module-mocking it: next/jest (SWC)
    // only hoists jest.mock when `jest` is the global, not the @jest/globals import.
    jest.spyOn(container, 'resolve');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch and return a message', async () => {
    const fakeMessageContent = faker.lorem.sentence();
    const getMessageUseCase = {
      execute: jest.fn<() => Promise<Message>>().mockResolvedValue(new Message(fakeMessageContent)),
    };

    (container.resolve as jest.Mock).mockImplementation((key) =>
      key === DependencyIdentifiers.USE_CASES.GET_MESSAGE ? getMessageUseCase : undefined
    );

    const result = await homeViewModel();

    expect(result.message).toBe(fakeMessageContent);
    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
  });

  test('should log the error and fall back to the default message on failure', async () => {
    const error = new Error(faker.string.sample());
    const getMessageUseCase = {
      execute: jest.fn<() => Promise<Message>>().mockRejectedValue(error),
    };

    (container.resolve as jest.Mock).mockImplementation(() => getMessageUseCase);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await homeViewModel();

    expect(result.message).toBe(DEFAULT_MESSAGE);
    expect(getMessageUseCase.execute).toHaveBeenCalledTimes(EXPECTED_CALL_COUNT);
    expect(consoleErrorSpy).toHaveBeenCalledWith(ERROR_MESSAGE_PREFIX, error);
  });
});
