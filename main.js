const LoadData = (id) => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      disPlayData(data.data, id);
    });
};

const disPlayData = (issues, id = "information") => {
  const dataAddigPlace = document.getElementById(id);
  dataAddigPlace.innerHTML = "";

  issues.forEach((item) => {
    const borderColor =
      item.status === "open" ? "border-green-500" : "border-purple-500";

    const card = document.createElement("div");

    card.className = `bg-white p-6 rounded-xl border border-gray-200 border-t-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow`;

    let cardHTML = `
        <div onclick="cardModal(${item.id}); my_modal_5.showModal()">
        <div  class="flex justify-between items-start mb-4">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
            <i class="fa-regular fa-circle text-green-600 text-sm"></i>
          </span>
          <span class="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200 uppercase">
            ${item.priority || "Normal"}
          </span>
        </div>

        <h3 class="font-bold text-gray-800 mb-2">${item.title}</h3>
        <p class="text-sm text-gray-500 mb-4 line-clamp-2">${item.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-6">
    `;

    item.labels.forEach((label) => {
      cardHTML += `
          <span class="text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-200 px-2 py-1 rounded-md uppercase">
            ${label}
          </span>
      `;
    });

    cardHTML += `
        </div>
        <div class="border-t pt-4 text-xs text-gray-400">
          <p>#${item.author}</p>
          <p>${new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
        </div>
    `;
    if (id == "open" || id === "closed") {
      if (id === "open" && item.status === "open") {
        openSectionMaking(cardHTML, id, dataAddigPlace, card);
      } else if (id === "closed" && item.status === "closed") {
        closingSectionmaking(cardHTML, id, dataAddigPlace, card);
      }
      
    } else {
      if (item.status === "open") {
        card.classList.add("border-t-4", "border-[#00A96E]");
      } else {
        card.classList.add("border-t-4", "border-[#A855F7]");
      }
      card.innerHTML = cardHTML;
      dataAddigPlace.appendChild(card);
    }
  });
};

// Open section Making
const openSectionMaking = (data, id, dataAddigPlace, card) => {
  card.classList.add("border-t-4", "border-[#00A96E]");
  card.innerHTML = data;
  dataAddigPlace.appendChild(card);
  console.log(dataAddigPlace);
};
// Close Section making
const closingSectionmaking = (data, id, dataAddigPlace, card) => {
  card.classList.add("border-t-4", "border-[#A855F7]");
  card.innerHTML = data;
  dataAddigPlace.appendChild(card);
  console.log(dataAddigPlace);
};



const cardModal = (id) => {
      const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
      fetch(url)
        .then(res=>res.json())
        .then(data=>modalShow(data.data))
};
const modalShow = (data)=>{
     const modal = document.getElementById("modalBox");
     modal.innerHTML="";
     let newModalItems = `
     <h2 class="text-2xl font-bold text-gray-800">
           ${data.title}
          </h2>
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <span
              class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
              Opened
            </span>
            <span>•</span>
            <span>${data.author} </span>
            <span>•</span>
            <span>${data.createdAt} </span>
          </div>

          <div class="flex gap-2">
`;

    
           
          data.labels.forEach(element => {
            newModalItems+=`
              <span
              class="text-red-500 bg-red-50 border border-red-200 px-3 py-1 rounded-full text-xs font-bold"
            >
              ${element}
            </span>`

          });
          newModalItems+=`
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-sm leading-relaxed">
            ${data.description}
          </p>

          <!-- Bottom Info -->
          <div class="bg-gray-100 rounded-lg p-4 flex justify-between">
            <div>
              <p class="text-xs text-gray-500">Assignee:</p>
              <p class="font-semibold text-gray-800">${data.author} </p>
            </div>

            <div>
              <p class="text-xs text-gray-500">Priority:</p>
              <span
                class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
              >
                ${data.priority}
              </span>
            </div>
          </div>
        </div>
     `;
    modal.innerHTML = newModalItems;

}
const btnColourChange = (id) => {
  document.getElementById("allBtn").classList.remove("bg-green-500");
  document.getElementById("OpenBtn").classList.remove("bg-green-500");
  document.getElementById("closeBtn").classList.remove("bg-green-500");
  document.getElementById("search").classList.remove("bg-green-500");
  document.getElementById(id).classList.add("bg-green-500");
};
const closingFunction = (id, btnid) => {
  const all = document.getElementById("information").classList.add("hidden");
  const open = document.getElementById("open").classList.add("hidden");
  const close = document.getElementById("closed").classList.add("hidden");
  const on = document.getElementById(id).classList.remove("hidden");
  btnColourChange(btnid);
};
document.getElementById("OpenBtn").addEventListener("click", () => {
  closingFunction("open", "OpenBtn");
  document.getElementById("input").value="";
  LoadData("open");
  const number = document.getElementById("numberOfIssues");
  number.innerHTML = "";
  number.innerHTML = `44 Issues`;
});

document.getElementById("closeBtn").addEventListener("click", () => {
  closingFunction("closed", "closeBtn");
  document.getElementById("input").value = "";
  LoadData("closed");
  const number = document.getElementById("numberOfIssues");
  number.innerHTML = "";
  number.innerHTML = `6 Issues`;
});
document.getElementById("allBtn").addEventListener("click", () => {
  closingFunction("information", "allBtn");
  document.getElementById("input").value = "";
  LoadData("closed");
  LoadData();
  const number = document.getElementById("numberOfIssues");
  number.innerHTML = "";
  number.innerHTML = `50 Issues`;
});

LoadData();
const searchItems=(text)=>{
     const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;
     fetch(url)
       .then((res) => res.json())
       .then((data) => {
        const number = document.getElementById("numberOfIssues");
        number.innerHTML="";
        number.innerHTML = `${data.data.length} Issues`;
        
        disPlayData(data.data)}
      );
}
document.getElementById('search').addEventListener('click',()=>{
    const text = document.getElementById('input').value;
    btnColourChange('search')
    searchItems(text);
})