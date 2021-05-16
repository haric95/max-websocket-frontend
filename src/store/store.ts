import React from "react";

export const state = {
  sections: 4,
  // TODO(HC): This needs to be scaled based on desktop or mobile.
  pages: 6,
  zoom: 1,
  top: React.createRef() as React.MutableRefObject<number>,
  images: ["/t.png"],
};
