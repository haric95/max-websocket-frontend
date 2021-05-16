import React from "react";

export const state = {
  sections: 9,
  // TODO(HC): This needs to be scaled based on desktop or mobile.
  pages: 14,
  zoom: 1,
  top: React.createRef() as React.MutableRefObject<number>,
  images: ["/t.png"],
};
