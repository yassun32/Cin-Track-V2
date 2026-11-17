import { getContents } from "./api.js"

let data ;
try {

    data = await getContents()
} catch (error) {
    document.getElementsByTagName('section')[0].innerHTML = `<p>les données ne se chargent pas</p>`
}

console.log(data)
export function affichieCards(data) {
    document.getElementsByTagName('section')[0].innerHTML = data.map(element => {
        return `
            <article id="${element.id}" class="cards hover:cursor-pointer bg-gray-800 rounded-xl shadow-lg">
                    <img src="${element.image}" alt="${element.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="text-xl font-bold">${element.title}</h3>
                        <p class="text-gray-400 text-sm mt-2">${element.releaseYear}</p>
                        <p class="text-yellow-400 mt-2">${element.type}</p>
                        <button class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4 w-full">
                            ❤️ Ajouter aux favoris
                        </button>
                    </div>

            <!-- Changed id='modal' to class='modal-container' -->
            <div class="modal-container fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm hidden">

             <div class="relative w-[90%] max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl">

            <!-- Changed id='close-modal' to class='close-modal-btn' -->
            <button
                class="close-modal-btn absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl transition ">
                <i class=" fa-solid fa-xmark" ></i>
            </button>

            <h2 class="text-2xl font-bold text-white mb-4 pr-8">
                ${element.title}
            </h2>

            <div class="space-y-3 text-gray-300">
                <p><span class="text-red-500 font-semibold">Type:</span> ${element.type}</p>
                <p><span class="text-red-500 font-semibold">Release Year:</span> ${element.releaseYear}</p>
                ${element.seasons ? `<p><span class="text-red-500 font-semibold">Seasons:</span> ${element.seasons}</p>` : ""}
                ${element.directors ? `<p><span class="text-red-500 font-semibold">Directors:</span> ${element.directors}</p>` : ""}
            </div>
            </div>
        </div>
    </article>
`;
    }).join("");
}
affichieCards(data);

document.getElementsByTagName('section')[0].addEventListener("click", (e) => {
    const closeBtn = e.target.closest(".close-modal-btn");

    if (closeBtn) {
        const modal = closeBtn.closest(".modal-container");
        if (modal) {
            modal.classList.add("hidden");
        }
        return;
    }

    const clickedCard = e.target.closest("article");

    if (clickedCard) {
        const modal = clickedCard.querySelector(".modal-container");

        if (modal) {
            modal.classList.remove("hidden");
        }
    }
});