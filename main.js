const div = document.querySelector('div');
let Index = 0;
let questionArray = [];
let marks = 0;
const renderQuestion = (arr)=>{
    
    if(Index < arr.length) {
        div.innerHTML =`
        <h3>Q${Index +1}: ${arr[Index].question.text}</h3>
        <input type="checkbox" name ="answer" value ="1" onclick="handleCheckboxChange(this)">${arr[Index].correctAnswer}<br><br>
        <input type="checkbox"  name ="answer" value ="2" onclick="handleCheckboxChange(this)">${arr[Index].incorrectAnswers[0]}<br><br>
        <input type="checkbox"  name ="answer" value ="3" onclick="handleCheckboxChange(this)">${arr[Index].incorrectAnswers[1]}<br><br>
        <input type="checkbox"  name ="answer" value ="4" onclick="handleCheckboxChange(this)">${arr[Index].incorrectAnswers[2]}<br><br>
        <button onclick="showNextQuestion()">Next</button>
`
    }

};

const showNextQuestion = ()=>{
    const selectAnswer = document.querySelector('input[name="answer"]:checked');
    if( selectAnswer && selectAnswer.value === "1")
        {
            marks += 10;
        }
    if( Index < questionArray.length - 1)
        {
            Index++;
            renderQuestion(questionArray);

        }
        else {
            div.innerHTML = `<h3>Quiz Completed!</h3><h2>Your Score Is ${marks} out of ${questionArray.length * 10}</h2>`;
        }
};


const getQuestion = async ()=>{
    try {
        const data = await fetch("https://the-trivia-api.com/v2/questions");
        const response = await data.json();
        console.log(response);
        questionArray = response;
        renderQuestion(questionArray);
    } catch (error) {
        console.log(error)
        
    }
};
getQuestion();


function handleCheckboxChange(clickedCheckbox) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
            checkbox.checked = false;
        }
    });
}