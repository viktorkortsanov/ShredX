import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice.js";

export default function AuthChecker() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("auth");

    if (token) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return null;
}