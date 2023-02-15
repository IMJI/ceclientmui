import ManagerResponse from "./ManagerResponse";

interface UserResponse {
    email: string;
    createdAt: Date;
    firstName: string;
    id: number;
    lastName: string;
    manager: ManagerResponse;
    patronymic: string;
    role: string;
    updatedAt: Date;
}

export default UserResponse;