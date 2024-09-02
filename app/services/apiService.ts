import { getAccessToken } from "@/app/lib/actions";

const apiService = {
    get: async function (url: string, options: RequestInit = {}): Promise<any> {
       

        const token = await getAccessToken();
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            ...options.headers // Merge in any custom headers
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                ...options,
                method: 'GET',
                headers
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const json = await response.json();
            

            return json;
        } catch (error) {
            console.error('API GET request failed:', error);
            throw error;
        }
    },

    post: async function (url: string, data: any, options: RequestInit = {}): Promise<any> {
        

        const token = await getAccessToken();
        const isFormData = data instanceof FormData;
        const headers = {
            'Accept': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...options.headers // Merge in any custom headers
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                ...options,
                method: 'POST',
                body: isFormData ? data : JSON.stringify(data),
                headers
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const json = await response.json();
            

            return json;
        } catch (error) {
            console.error('API POST request failed:', error);
            throw error;
        }
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response:', errorText);
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const json = await response.json();
            

            return json;
        } catch (error) {
            console.error('API POST request failed:', error);
            throw error;
        }
    }
}

export default apiService;
