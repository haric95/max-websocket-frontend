import React, { useEffect, useState } from "react";

export const useHandleKeyPress = (
  keycode: string,
  callback: () => void
): void => {
  useEffect(() => {
    document.body.addEventListener("keydown", (event) => {
      if (event.key === keycode) {
        callback();
      }
      return () => {
        console.log("here");
        return document.body.removeEventListener("keydown", callback);
      };
    });
  }, [keycode, callback]);
};
