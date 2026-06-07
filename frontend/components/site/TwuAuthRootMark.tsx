"use client";

import { useCallback, useEffect } from "react";

import { AUTH_TOKEN_CHANGE_EVENT, AUTH_TOKEN_STORAGE_KEY, getStoredToken } from "@/lib/authToken";

/**
 * На главной при входе снимаем «дыру» от скрытого блока #lead: задаём --twu-lead-gap на <html>.
 * Снимаем при уходе со страницы и при выходе из аккаунта.
 */
export function TwuAuthRootMark() {
  const sync = useCallback(() => {
    const el = document.documentElement;
    if (getStoredToken()) {
      el.dataset.twuAuth = "1";
    } else {
      delete el.dataset.twuAuth;
    }
  }, []);

  useEffect(() => {
    sync();
    const onToken = () => sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_TOKEN_STORAGE_KEY) sync();
    };
    window.addEventListener(AUTH_TOKEN_CHANGE_EVENT, onToken);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(AUTH_TOKEN_CHANGE_EVENT, onToken);
      window.removeEventListener("storage", onStorage);
      delete document.documentElement.dataset.twuAuth;
    };
  }, [sync]);

  return null;
}
