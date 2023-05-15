import { ResponseHistory } from "../constant";
import api from "./api";

class HistoryApi {
  async getDataHistory(): Promise<ResponseHistory[]> {
    const { data } = await api.get<ResponseHistory[]>(`/history`, {
      withCredentials: false,
    });

    return data;
  }
}

export const historyApi = new HistoryApi();
