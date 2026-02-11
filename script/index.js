const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
         .then((res) => res.json())
        .then((json) => displayLesson(json.data));
};

const removeActive=()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    // console.log(lessonButtons)
    lessonButtons.forEach(btn=> btn.classList.remove("active"));
}



const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url);
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive(); //remove all active class
const clickBtn= document.getElementById(`lesson-btn-${id}`)
//  console.log(clickBtn);
clickBtn.classList.add("active") //add active class
    displayLevelWord(data.data)
    });
};

const displayLevelWord = (words) =>{
//  console.log(words)
const wordContainer = document.getElementById("word-Container");
wordContainer.innerHTML = "";

// lesson-4 gele nicher kaj gulo hobe
if(words.length == 0){
    wordContainer.innerHTML = `
     <div class="text-center bg-sky-100  col-span-full rounded-xl py-10 space-y-6  font-bangla">
       
   <img class="mx-auto" src="assets/alert-error.png" alt="">
     <p class="text-xl font-medium text-gray-400">
        এই lesson এ এখনো কোন vocabuleary যুক্ত করা হয়নি ।
        </p>
        
        <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান । </h2>

    </div>
    
    `
}

words.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div")
    card.innerHTML = `
     <div class=" bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-bold text-2xl">Meaning /Pronounciation</p>
        // <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অথ পাওয়া যায়নি" } / ${word.pronunciation ? word.pronunciation : "pronunciation  পাওয়া যায়নি"  }"</div>
        <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>
    `;
    wordContainer.append(card);
});
 
};



const displayLesson = (lessons) => {
    // 1.get the container & empty
    const levelContainer = document.getElementById("level-Container");
    levelContainer.innerHTML = "";
    // 2.get into evey lessons
    for (let lesson of lessons) {
        // 3.create element
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
       <button id= "lesson-btn-${lesson.level_no}"
        onclick ="loadLevelWord(${lesson.level_no})" class= " 
        btn btn-outline btn-primary lesson-btn ">      
        <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
        </button>
   

        
        `;
        // append into container
        levelContainer.append(btnDiv);
    }
};

loadLessons();
 

