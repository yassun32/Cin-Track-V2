import { getContents, updateContent, createContent, deleteContent, getComments } from "./api.js"

let status = document.getElementById('message');
let movies;

try {
    status.textContent = 'Chargement...';
    status.className = 'text-yellow-400 mb-4';

    movies = await getContents();

    status.textContent = 'Chargement terminé';
    status.className = 'text-green-400 mb-4';

    renderAdminMovies(movies);

} catch (e) {

    console.error(e);

    status.textContent = 'Erreur de chargement';
    status.className = 'text-red-400 mb-4';

}

export function renderAdminMovies(movies) {
    document.getElementById('tableBody').innerHTML = movies.map(movie => `
        <tr class="card border-b border-[#29292d] hover:bg-[#222226]">
            <td class="p-4">
        <div class="flex items-center gap-3">
            <img src="${movie.image}"
                 alt="${movie.title}"
                 class="w-10 h-14 object-cover rounded">
                    <span class="font-semibold">${movie.title}</span>
                </div>
            </td>
            <td class="p-4 text-gray-400">${movie.type}</td>
            <td class="p-4 text-gray-400">${movie.releaseYear}</td>
            <td class="p-4">
                <button data-id="${movie.id}" class="mudif text-gray-400 hover:text-white mr-3">    ✎</button>
                <button data-id="${movie.id}" class="supp text-red-500 hover:text-red-400">⌫</button>
            </td>
        </tr>
    `).join("");
}
renderAdminMovies(movies)
async function deletMovie(items) {

    const tbody = document.getElementById('tableBody')
    console.log(movies)

    tbody.addEventListener("click", event => {
        const id = event.target.closest('button').dataset.id
        const item = items.find(e => e.id === id)

        if (event.target.classList.contains('mudif')) {

        }

        else if (event.target.classList.contains('supp')) {

            if (!confirm(`Supprimer « ${item.title} » ?`)) return;
            deleteContent(items, item.id);
            items = items.filter(i => i.id !== item.id);
            console.log(items)
            renderAdminMovies(items)
        }
    })

}
deletMovie(movies)
