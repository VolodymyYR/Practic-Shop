// App JavaScript file for the Only Shop application

export async function downloadData(url) { 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error downloading data:", error);
        return null;
    }
}