const loadMeals = (searchText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals =>{
    // console.log(meals)
    // step-1 container element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meals.forEach(meal => {
        console.log(meal)
        // step-2 create child for each Element
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // step-3 set content of the child
        mealDiv.innerHTML = `
        <div class="card h-70 border-black">
        <img src="${meal.strMealThumb}" style="height: 250px"class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title"> ${meal.strMeal}</h5>
        <p class="card-text">Category: ${meal.strCategory}</p>
        <p class="card-text">Origin: ${meal.strArea}</p>
        <!-- Button trigger modal -->
        <button onclick="loadMealDetails2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">Cooking Instructions
        </button>
        
        </div>
        </div>
        `
        
        // step-4 append Child
        mealsContainer.appendChild(mealDiv);
    });
    }
    
const searchMeals = () =>{
    // console.log('btn-Clicked')
    const searchText = document.getElementById('search-field').value;
    console.log(searchText)
    loadMeals(searchText);
}

const loadMealDetails = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}` 
    // console.log(idMeal);
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails2(data.meals[0]))
    .catch(error => {

        console.log(error)
    })

}

// async await example

const loadMealDetails2 = async(idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try{
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
    }
    catch(error){
        console.log(error)
    }
}


const displayMealDetails = meal =>{
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealDetails = document.getElementById('mealDetailsBody');mealDetails.innerHTML =`
    <h5 class="text-center">Instructions</h5>
    <p class="text-center">${meal.strInstructions}</p>
    <p>Recipe Video:</p>
    <a href="${meal.strYoutube}" target="_blank"> ${meal.strYoutube}</a>
    ` 
}

loadMeals('');