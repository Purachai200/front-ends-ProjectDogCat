import { useContext } from "react";
import MockUpContext from "../contexts/MockUpContext";

export default function useMock() {
  return useContext(MockUpContext)
}