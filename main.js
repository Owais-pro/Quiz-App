const div = document.querySelector("div");
let Index = 0;
let questionArray = [];
let marks = 0;

//Render Question Only Once At A Time
const renderQuestion = (arr) => {
  if (Index < arr.length) {
    const shuffleAnswer = mergeAndShuffleAnswer(arr[Index]);
    div.innerHTML = `
        <div class="card text-dark bg-info mb-3" style="max-width: 50rem;">
        <h4 class="card-header text-center ">Question:${Index + 1}</h4>
        <div class="card-body">
        <h5 class="card-title mb-4 text-center">${arr[Index].question.text}</h5>
    ${shuffleAnswer
      .map(
        (answer) =>
          `<div>
        <input class ="mt-4" type="checkbox"  name ="answer" value ="${answer}" onclick="handleCheckboxChange(this)">${answer}
        </div>
        
        `
      )
      .join(" ")}
        <button class="btn btn-danger mt-4 " onclick="showNextQuestion()">Next</button>
        
  </div>
</div>
`;
  }
};

//Merge And Shuffle Answer
const mergeAndShuffleAnswer = (Question) => {
  const allAnswers = [Question.correctAnswer, ...Question.incorrectAnswers];
  for (let i = allAnswers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
  }

  return allAnswers;
};

//Show Next Question And Check Answer
const showNextQuestion = () => {
  const selectAnswer = document.querySelector('input[name="answer"]:checked');
  if (
    selectAnswer &&
    selectAnswer.value === questionArray[Index].correctAnswer
  ) {
    marks += 10;
  }
  if (Index < questionArray.length - 1) {
    Index++;
    renderQuestion(questionArray);
  } else {
    div.innerHTML = `<h3>Quiz Completed!</h3><h2>Your Score Is ${marks} out of ${
      questionArray.length * 10
    }</h2>`;
  }
};

//Get Data From API
const getQuestion = async () => {
  try {
    const data = await fetch("https://the-trivia-api.com/v2/questions");
    const response = await data.json();
    console.log(response);
    questionArray = response;
    renderQuestion(questionArray);
  } catch (error) {
    console.log(error);
  }
};
getQuestion();

//Handle Checkboxes
function handleCheckboxChange(clickedCheckbox) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox !== clickedCheckbox) {
      checkbox.checked = false;
    }
  });
}
