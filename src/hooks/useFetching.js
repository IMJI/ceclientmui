import { useState } from "react";
import useAlert from "./useAlert";

export default function useFetching(callback) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setAlert } = useAlert();

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            setError(e);
            console.log(e);
            setAlert(e.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
}