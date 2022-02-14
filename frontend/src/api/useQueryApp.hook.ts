import { useCallback, useEffect, useState } from "react";
import { HttpClient } from "./HttpClient";
import { TypeNameEnum } from "@src/types/models";
import { getErrorFetchApp } from "@src/utils/getErrorFetchApp";
import { ErrorFetchApp } from "@src/types";

interface UseAppQueryLocalState<TDataDTO> {
  data: TDataDTO | null;
  loading: boolean;
  error: ErrorFetchApp | null;
}

const initialState = {
  data: null,
  loading: false,
  error: null,
};

interface UseQueryApp<ResponseT> extends UseAppQueryLocalState<ResponseT> {
  fetchData: () => Promise<void>;
  setData: (data: ResponseT) => void;
}

function useQueryApp<ResponseT, RequestT = object | undefined>(
  url: TypeNameEnum,
  dataRequest?: RequestT
): UseQueryApp<ResponseT> {
  const [rezult, setRezult] = useState<UseAppQueryLocalState<ResponseT>>(
    initialState
  );

  const setData = useCallback(
    (data: ResponseT | null) => {
      setRezult((prev) => ({ ...prev, loading: false, error: null, data }));
    },
    [setRezult]
  );

  useEffect(() => {
    return () => {
      setRezult(initialState);
    };
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setRezult((prev) => ({ ...prev, loading: true, error: null }));
      const response = await HttpClient.getAppAPI<ResponseT, RequestT>(
        url,
        dataRequest
      );
      // setRezult((prev) => ({
      //   ...prev,
      //   loading: false,
      //   error: null,
      //   data: response.data,
      // }));
      setTimeout(
        () =>
          setRezult((prev) => ({
            ...prev,
            loading: false,
            error: null,
            data: response.data,
          })),
        500
      );
    } catch (err) {
      const error = getErrorFetchApp(err);
      setRezult((prev) => ({ ...prev, loading: false, error }));
    }
  }, [setRezult, url, dataRequest]);

  useEffect(() => {
    fetchData();
    return () => {
      setRezult(initialState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...rezult, fetchData, setData };
}

export { useQueryApp };
