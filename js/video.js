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



// create displayCategories
const displayCategories = (categories) => {
    //add data in html

    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(item => {
        //create a button
        const button = document.createElement('button');
        button.classList = "btn";
        button.innerText = item.category;

        //adding button to category container
        categoriesContainer.append(button);
    });
};

//display videos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos');
    videos.forEach(video => {
        console.log(video)
        const card = document.createElement('div');
        card.classList = "card bg-base-100";
        card.innerHTML = `
        <figure>
                 <img
                  src="${video.thumbnail}"
                 alt="Shoes" />
         </figure>
        <div class="card-body">
         <h2 class="card-title">Card Title</h2>
         <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
         <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
         </div>
        </div>
        `;
        videosContainer.append(card);
    })
};

loadCategories();
loadVideos()