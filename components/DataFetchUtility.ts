import { ErrorComponent } from './ErrorComponent';

export async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: error.message };
  } finally {
    // Cleanup if necessary
  }
}
