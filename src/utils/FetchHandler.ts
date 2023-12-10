import fetch from 'node-fetch';

class FetchHandler {
    private apiKey: string;
    private apiUrl: string;

    constructor() {
        this.apiKey = "44d736ca0edc73cd6b2ceae78c98552c";
        this.apiUrl = `https://api.themoviedb.org/3`;
    }

    async request(method: string, endpoint: string, body?: any, query?: string) {
        let url = `${this.apiUrl}${endpoint}?api_key=${this.apiKey}${query ? `&${query}` : ''}`;
        const options: any = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
       

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);

            // Verifica si la solicitud fue exitosa (código de estado 200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parsea la respuesta en formato JSON
            const data = await response.json();

            return {fetchData:data , success: true}
            
        } catch (error:any) {
            return {error:error.message, success:false}
            console.error('Error:', error.message);
        }
    }
}

const fetchHandler = new FetchHandler();
export default fetchHandler;