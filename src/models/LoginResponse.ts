import UserResponse from "./UserResponse";

interface LoginResponse {
    token: string;
    user: UserResponse;
}

export default LoginResponse;