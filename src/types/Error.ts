type Error = {
    name: string;
    status: number;
    message: string;
}

export function isError(obj: any): obj is Error {
    return 'name' in obj
        && 'status' in obj
        && 'message' in obj
}

export default Error;