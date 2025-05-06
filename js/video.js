// 1. fetch load and show categories on html

// create loadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
};

//load videos
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())   
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))

}

//load details of video
const loadDetails = async(videoId) =>{

    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
};

const displayDetails = (video) => {
    console.log(video);
     const detailsContainer = document.getElementById('modal-content');
     detailsContainer.innerHTML = `
        <img src="${video.thumbnail}"/>
        <p>${video.description}</p>
     `;
    // way-1 of adding modal
    // document.getElementById('showModalData').click()

    // way-2 here showModal() method is given by daisUI
    document.getElementById('customModal').showModal()
};

function getTime(time) {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hours ${minutes} minutes ${remainingSeconds} seconds`;
}
function removeActiveClass(){
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active');
    }
   
}

const displayCategoryVideo = (id) => {
  
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass()
        
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        displayVideos(data.category)
    })
    .catch(err => console.log(err))

};

// create displayCategories
const displayCategories = (categories) => {

    //add data in html
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(item => {
        //create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="displayCategoryVideo(${item.category_id})" class="btn category-btn">
               ${item.category}
            </button>
        `;

        //adding button to category container
        categoriesContainer.append(buttonContainer);
    });
};

//display videos
const displayVideos = (videos) => {
    
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';
    if(videos.length == 0){
         videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="./assets/Icon.png"/>
            <h2 class="text-2xl font-bold text-center"> Oops!! Sorry, There is no content here </h2>
        </div>
        `; 
    }
    else{
        videosContainer.classList.add('grid');
    }
    videos.forEach(video => {
        // console.log(video)
        const card = document.createElement('div');
        card.classList = "card bg-base-100";
        card.innerHTML = `
        <figure class="h-[200px] relative">
                 <img class = "h-full w-full object-cover"
                  src="${video.thumbnail}"
                 alt="Shoes" />
                 ${
                    video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 text-xs bg-black rounded text-white"> ${getTime(video.others.posted_date)} </span>`

                 }
                 
         </figure>

        <div class="px-0 py-3">
            <div class="flex gap-2 items-center">
                <div>
                    <img class ="h-10 w-10 rounded-full object-cover" src = "${video.authors[0].profile_picture}">
                </div>
                <div>
                    <h2 class="font-bold text-xl">${video.title}</h2>
                    <div class="flex gap-2 items-center">
                        <p>${video.authors[0].profile_name} </p>
                        ${video.authors[0].verified === true ? `
                        <img class="h-5 w-5" src ="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png">`: ''}
                    </div>
                    <p> <button onclick="loadDetails('${video.video_id}')" class="mt-2 btn btn-sm btn-error">Details</button> </p>
                </div>
            </div>
         </div>
        </div>
        `;
        videosContainer.append(card);
    })
};

loadCategories();
loadVideos()