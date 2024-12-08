import { container } from "@/core/crosscutting/injection/DependencyInjectionContainer";
import { GetMessageUseCase } from "@/core/application/get-message-usecase";
import { DependencyIdentifiers } from "@/core/crosscutting/injection/DependencyIdentifiers";

export const DEFAULT_MESSAGE = "Error loading message";
export const ERROR_MESSAGE_PREFIX = "Error fetching message:";

export async function homeViewModel() {
  const getMessageUseCase = container.resolve<GetMessageUseCase>(DependencyIdentifiers.USE_CASES.GET_MESSAGE);
  try {
    const result = await getMessageUseCase.execute();
    return { message: result.content };
  } catch (error) {
    console.error(ERROR_MESSAGE_PREFIX, error);
    return { message: DEFAULT_MESSAGE };
  }
}