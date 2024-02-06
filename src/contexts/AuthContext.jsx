/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import axios from "axios";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  
}