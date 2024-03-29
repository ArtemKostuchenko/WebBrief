import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1/'
});

export const createBrief = async (data) => {
    try {
        const response = await axios.post('brief', data, {
            withCredentials: true,
        });

        if (response.status === 201) {
            return response.data.success;
        }

        return false;
    } catch (err) {
        return false;
    }
}

export const getBrief = async (briefId) => {
    try {
        const response = await axios.get(`brief/${briefId}`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.data;
        }

        return null;
    } catch (err) {
        return null;
    }
}

export const updateBrief = async (briefId, data) => {
    try {
        const response = await axios.patch(`brief/${briefId}`, data, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.success;
        }

        return false;
    } catch (err) {
        return false;
    }
}

export const getBriefs = async (sort, input, searchBy) => {
    try {
        const response = await axios.get(`brief?sort=${sort}&${searchBy}=${input}`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.data;
        }

        return [];
    } catch (err) {
        return [];
    }
}

export const deleteBrief = async (briefId) => {
    try {
        const response = await axios.delete(`brief/${briefId}`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.success;
        }

        return false;
    } catch (err) {
        return false;
    }
}

export const authUser = async (data) => {
    try {
        const response = await axios.post('auth/login', data, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.user;
        }

        return null;
    } catch (err) {
        return null;
    }
}

export const validAuth = async () => {
    try {
        const response = await axios.get('auth/validate', {
            withCredentials: true,
        });

        if (response.status === 200) {
            return response.data.user;
        }

        return null;
    } catch (err) {
        return null;
    }
}

export const formatDate = (dateString) => {
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')} ${month} ${year}`;
}

export const truncateText = (text, maxLength, dots = true) => {
    if (text.length > maxLength) {
        return dots ? text.substring(0, maxLength) + '...' : text.substring(0, maxLength);
    }
    return text;
}
