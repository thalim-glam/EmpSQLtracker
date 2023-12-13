# EmpSQLtracker

## Description
- This is a command-line application from scratch to manage a company's employee database (my database name is "thcompany_db"), using command line, Node.js, Inquirer, and MySQL concept.

## Table of Contents
  - [Installation](#installation)
  - [Required Task](#required-task)
  - [User Instruction](#user-instruction)
  - [Command line code](#command-line-code)
  - [Credits](#credits)
  - [License](#license)
  - [Tests](#tests)
  - [Deploying to Heroku](#deploying-to-heroku)

## Installation

- Here are the installation process :
  - [1] Here is the repo for this application https://github.com/thalim-glam/Express_noteTaker 
  - [2] Clone the repository or download the zip folder.
  - [3] Open the source code in your code editor.
  - [4] Open the integrated terminal or git bash to test the application.
  - [5] Please refer to [Tests](#tests) section for further information regarding testing.

## Required Task 

- The frontend is included in the starter code
- Student HW is to build the back end, connect the two, and then deploy the entire application to Heroku.
- User Story 
```
  AS A small business owner
  I WANT to be able to write and save notes
  SO THAT I can organize my thoughts and keep track of tasks I need to complete
```
- Acceptance criteria
```
  GIVEN a note-taking application
  WHEN I open the Note Taker
  THEN I am presented with a landing page with a link to a notes page
  WHEN I click on the link to the notes page
  THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
  WHEN I enter a new note title and the note’s text
  THEN a "Save Note" button and a "Clear Form" button appear in the navigation at the top of the page
  WHEN I click on the Save button
  THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes and the buttons in the navigation disappear
  WHEN I click on an existing note in the list in the left-hand column
  THEN that note appears in the right-hand column and a "New Note" button appears in the navigation
  WHEN I click on the "New Note" button in the navigation at the top of the page
  THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column and the button disappears
```

## User Instruction

  - Click here for the repository: https://github.com/thalim-glam/Express_noteTaker 
  - Click here for Readme file: https://thalim-glam.github.io/Express_noteTaker/
  - Click here for the Heroku-deployed link : https://ucbth-ch11-d97ba2745641.herokuapp.com/ 
  - When the Note Taker page loads, click on the "Get started".
  - Enter text into the "Title" and "Text" fields and click "Save Note".
  - To access previous notes, click on the saved notes on the left.
  - To clear form click the "Clear Form" button.
  - Here is a sample screenshots of my application :
    - Walkthrough Video link: https://drive.google.com/file/d/1nA77FflJy1JEgvdCwOdFIknbdtt6UufC/view
    - Initial Page ![Screenshot of Initial Page](./public/images/initial_page.png)
    - Existing notes ![Screenshot of Showing existing notes](./public/images/showing_exiting_note.png)
    - Saving New note ![Screenshot of Saving new note](./public/images/saving_new_note.png)
    - Deleting Note (BONUS) ![Screenshot of Deleting previously saved note](./public/images/deleted_note.png)

## Command line code

I used the following command lines:
- npm run start [ You may need this to start the server ]
- npm i express [To install modules if you do ot see it ]
- git status
- git add -A
- git commit -m "Comment goes here"
- git branch
- git pull origin main
- git push
- git checkout main
- git checkout -b feature/add-branch

## Credits

Apart from me :D the credit also goes to my Instructor, TAs, Tutor, Classmates, and 
- Google (my best buddy)
- Geeks for Geeks
- Stack Overflow
- MDN web doc
- Class Recordings
- Tutorials Teacher

## License
 ![Github license](https://img.shields.io/badge/license-MIT-blue.svg) 

## Tests

To test this application please type, 
  - npm i [To install node modules ]
  - npm i express [To install express ]
  - npm run start [ To start the server ]
  - Open web browser and type http://localhost:3001
  - You can also use Innsomnia/postman to test the application
  - Click here for deployed Heroku link : https://ucbth-ch11-d97ba2745641.herokuapp.com/

## Deploying to Heroku
:) This is suggested in the Heroku website.
:) Therefore using it for testing purpose.
:) Please feel free to click the button below 

```
$ heroku create
$ git push heroku main
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Done By: Tasneem Halim 😎

[![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fthalim-glam%2FempSQLtrack&label=Number%20of%20Visitors&labelColor=%23d9e3f0&countColor=%23d9e3f0)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fthalim-glam%2FempSQLtrack)
