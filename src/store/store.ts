import React from "react";

export const state = {
  sections: 8,
  // TODO(HC): This needs to be scaled based on desktop or mobile.
  pages: 12,
  zoom: 1,
  top: React.createRef() as React.MutableRefObject<number>,
  images: ["/t.png"],
};
