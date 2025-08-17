      const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

    //   https://opentdb.com/api.php?amount=10&category=23&difficulty=medium
      

    class settingsettings {
        constructor() {
       this.category = document.querySelector('#category');
    this.numQuestions = document.querySelector('#n-questions');
   this.startButton = document.querySelector('#start');
/////////////////
    this.quizElement = document.querySelector('.quiz');
    this.settingsElement = document.querySelector('.settings');
/////////////
       this.difficulty = [

        document.querySelector("#easy"),
        document.querySelector("#medium"),
        document.querySelector("#hard")
       ]
        }

       
    }

    // export default new settings();
    export default Settings;


    