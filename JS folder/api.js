const BASE_URL = "https://6afae5ca730c1d152f32b216.mockapi.io/api/movies";

export async function request(path, options = {}) {
    const res = await fetch(BASE_URL + path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    return res.json();
}

export const getContents = (data) =>
    request("/contents", {
        method: "GET",
        body: JSON.stringify(data)
    });

export const updateContent = (data, id) =>
    request("/contents" + id, { method: "PUT", body: JSON.stringify(data) });

export const createContent = (data) =>
    request("/contents", { method: "POST", body: JSON.stringify(data) });

export const deleteContent = (data, id) =>
    request(`/contents/${id}`, { method: "DELETE", body: JSON.stringify(data) });

export const getComments = (data) =>
    request("/contents", { method: "POST", body: JSON.stringify(data) });
