// 1. fetch load and show categories on html

// create loadCategories
const loadCategories = () =>{
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err => console.log(err))
};


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

loadCategories();