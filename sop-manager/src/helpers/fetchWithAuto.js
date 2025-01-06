const fetchWithAuto = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        throw new Error('Request failed');
    }
    return response;
};

export default fetchWithAuto;