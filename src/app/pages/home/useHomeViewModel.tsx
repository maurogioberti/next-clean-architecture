import { useState, useEffect } from "react";
import { useResolve } from "@codescouts/di";
import { GetMessageUseCase } from "@/core/application/get-message-usecase";
import { Message } from "@/core/domain/model/Message";

export const useHomeViewModel = () => {
  const [message, setMessage] = useState<string>("");

  const getMessageUseCase = useResolve(GetMessageUseCase);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const result: Message = await getMessageUseCase.execute();
        setMessage(result.content);
      } catch (error) {
        console.error("Error fetching message:", error);
        setMessage("Error loading message");
      }
    };

    fetchMessage();
  }, [getMessageUseCase]);

  return { message };
};
