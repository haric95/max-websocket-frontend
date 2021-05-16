import { useThree } from "react-three-fiber";

export const useIsMobile = () => {
  const {size} = useThree();

  return size.width < 768;
}