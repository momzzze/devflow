'use server'


export async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const objectOfCountries = countries.map((country: any) => {
            const name = country.name.common;
            const value = name.toLowerCase().replace(/\s+/g, '_');
            return { name, value };
        }).sort((a: any, b: any) => a.name.localeCompare(b.name));
        return objectOfCountries;

    } catch (error) {
        console.log(error);
        return error;
    }
}

interface GetJobsProps {
    searchQuery: {
        q: string;
        location: string;
    };
    page: string;
}

export async function getJobs(props: GetJobsProps) {
    try {
        const { searchQuery, page } = props;
        const query = `${searchQuery.q}, ${searchQuery.location}` ?? `Software Developer , ${searchQuery.location}`;
        const headers = {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY ?? '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
        const response = await fetch(
            `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
            {
                headers
            }
        );

        const jobs = await response.json();
        return jobs.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
}