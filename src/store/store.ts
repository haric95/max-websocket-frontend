import React from "react";

export const state = {
  sections: 4,
  pages: 8,
  zoom: 1,
  top: React.createRef() as React.MutableRefObject<number>,
  images: ["/t.png"],
};
