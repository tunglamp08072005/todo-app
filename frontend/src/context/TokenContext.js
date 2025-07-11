import { createContext } from "react";

// Tạo context để quản lý token xác thực và thông tin người dùng
const TokenContext = createContext(null);

export default TokenContext;
