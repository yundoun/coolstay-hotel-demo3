"use client";

import { useEffect, useReducer } from "react";
import type { RoomsResponse } from "@/adapters/coolstay/types";

type State = {
  storeData: RoomsResponse | null;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; data: RoomsResponse }
  | { type: "FETCH_ERROR"; message: string }
  | { type: "SKIP" };

function reducer(_: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { storeData: null, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { storeData: action.data, loading: false, error: null };
    case "FETCH_ERROR":
      return { storeData: null, loading: false, error: action.message };
    case "SKIP":
      return { storeData: null, loading: false, error: null };
  }
}

export function useApiRooms(checkIn: string, checkOut: string, nights: number) {
  const [state, dispatch] = useReducer(reducer, {
    storeData: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!checkIn || !checkOut || nights <= 0) {
      dispatch({ type: "SKIP" });
      return;
    }

    const controller = new AbortController();

    dispatch({ type: "FETCH_START" });

    fetch(`/api/store/rooms?checkIn=${checkIn}&checkOut=${checkOut}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("객실 조회 실패");
        return res.json();
      })
      .then((data: RoomsResponse) => {
        dispatch({ type: "FETCH_SUCCESS", data });
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          dispatch({ type: "FETCH_ERROR", message: err.message });
        }
      });

    return () => controller.abort();
  }, [checkIn, checkOut, nights]);

  return state;
}
