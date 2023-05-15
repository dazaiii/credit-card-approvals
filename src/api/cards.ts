import {
  RequestCreditCardApproval,
  ResponseCreditCardApproval,
} from "../constant";
import api from "./api";

class CardsApi {
  async postCard(
    body: RequestCreditCardApproval
  ): Promise<ResponseCreditCardApproval> {
    const { data } = await api.post<ResponseCreditCardApproval>(`/cards`, body);

    return data;
  }
}

export const cardsApi = new CardsApi();
