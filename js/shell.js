const initialSection = document.querySelector("#initial");

const initialPrompt =
  "<span class='prompt'>PS DRIVE:\\web\\ndeepak></span> <input type='text' id='userInput' placeholder='command here: ' autofocus autocomplete='off'><br/><div class='systemOutput'></div>";
initialSection.innerHTML = initialPrompt;

let inputField = document.querySelector("#userInput");
let outputField = document.querySelectorAll(".systemOutput");

let keepValue = inputField.value;
let commandHistory = [];
let currentHistoryIndex = -1;

// Defining Variables
const terminalCommands = {
  help: "Use commands like <strong>whoami</strong>, <strong>intro</strong>, <strong>about</strong>, <strong>age</strong>, <strong>birthday</strong>, <strong>address</strong>, <strong>education</strong>, <strong>hobbies</strong>, <strong>skills</strong>, <strong>career</strong>, <strong>projects</strong>, <strong>achievements</strong>, <strong>profession</strong>, <strong>company</strong>, <strong>resume</strong>, <strong>email</strong>, <strong>phone</strong>, <strong>social</strong>, <strong>form</strong>, <strong>font</strong>, and some other system commands you may know!",

  whoami: "<strong>Deepak Nagarkoti<strong> (ndeepak)",

  intro:
    "Greetings Everyone! I am <strong>Deepak Nagarkoti</strong>.<br><br>I am currently learning to<strong>Securing System and Infrastructures with Good DevOps Practices,</strong> here in Nepal.",

  about:
    "🛡️ About Me:Hello LinkedIn community! Greetings! I'm Deepak Nagarkoti, a CS Undergraduate and aspiring Cybersecurity maven based in Kathmandu, Nepal. 🌐🚀",

  age: "REDACTED (NULL)",
  birthday: "FIND it in my Socials",
  address:
    "Address Line 1: Nakhu-18, Lalitpur, Nepal<br>City: Lalitpur<br>Province: Bagmati Pradesh<br>ZIP Code: 44600<br>Country: Nepal",

  education:
    "B.Sc.CSIT, Tribhuvan University - 2075-2079 <br>Plus Two (Science)- 2072/73 <br> SLC-2071",

  hobbies: "LOADINGGGGG!!!",

  skills: "LOADINGGGGG!!!",

  career:
    "Developing the skills regarding Computer Science, Security and Systems..",

  projects: "LOADINGGGGG!!!",

  profession:
    "Undergraduate Computer Science (B.Sc.CSIT) | System Security Engineer",

  company:
    "CAS Trading House Pvt Limited. I am open to exploring new opportunities.",

  achievements: "LOADINGGG!!!",

  experience:
    "Find about my work experience in detail in my resume, by using the <strong>resume</strong> command!",

  resume:
    "<p>Find My Resume Here ! <a onclick=\"window.open('https://docs.google.com/document/d/1vve4vNdb55dAIXyIgRzuM03AOc3rRhf1h5gX-7tCbiw/', '_blank')\">Deepak Nagarkoti Resume</a></p>For any verification regarding my résumé, please make sure to contact the respective authorities!",

  email:
    '<p><a href="mailto:admin@deepaknagarkoti.com.np">admin@deepaknagarkoti.com.np</a></p>',

  phone: "+977-9802395020 (NCELL)",
  social:
    "<span>Facebook</span>: <a onclick=\"window.open('https://www.facebook.com/nagarkotideepak9', '_blank')\">Deepak Nagarkoti (@nagarkotideepak9)</a><br><span>Twitter</span>: <a onclick=\"window.open('https://twitter.com/ndeepak_', '_blank')\">Deepak Nagarkoti (@ndeepak_)</a><br><span>LinkedIn</span>: <a onclick=\"window.open('https://www.linkedin.com/in/nagarkotideepak9/', '_blank')\">Deepak Nagarkoti(@nagarkotideepak9)</a><br><span>GitHub</span>: <a onclick=\"window.open('https://github.com/ndeepak/', '_blank')\">Deepak Nagarkoti (@ndeepak)</a><br><span>YouTube</span>: <a onclick=\"window.open('https://www.youtube.com/@obscurehustle/', '_blank')\">Deepak Nagarkoti (@obscurehustle)</a><br><span>Telegram</span>: <a onclick=\"window.open('https://t.me/nagarkotideepak', '_blank')\">@nagarkotideepak</a><br><span>Instagram</span>: <a onclick=\"window.open('https://www.instagram.com/ndeepak_/', '_blank')\">@ndeepak_</a>",

  form: "LOADING!!!!",

  uname: "ndeepakOS",
  "uname -a": "ndeepakOS | ndeepakOS 1.0",
  hostname: "deepaknagarkoti.com.np",
  pwd: "DRIVE:\\web\\ndeepak",
  ls: "<p><strong>Directory:</strong> DRIVE:\\web\\ndeepak</p><strong>Elements:</strong> css, img, js, CNAME, index.html, LICENSE, ndeepak.webmanifest, README.md, robots.txt, shell.html, sitemap.xml",
  sudo: "This is a UNIX-based Operating System, but sudo is not ALLOWED.",
  cd: "You aren't allowed you to change directories. You have to stay here my boy.",
  rm: "You ran it here, Please don't run it in the Production Server.",
  cat: "I know you love cat, But i love dog more than cat.",
  "sudo -i": "Yoo Boy, dont be too smart",
  "sudo -l": "My gWAD, dont' just stop here okay. keep quit.",
  flag: "You chicky ass got the flag: FLAG{1234r5tfdf234ASS}",
};

// Aliases
Object.assign(terminalCommands, {
  main: terminalCommands["about"],
  who: terminalCommands["about"],
  "?":    terminalCommands["help"],

  "get skills": terminalCommands["skills"],
  "get --skills": terminalCommands["skills"],
  "find skills": terminalCommands["skills"],
  "find --skills": terminalCommands["skills"],
  "know skills": terminalCommands["skills"],
  "know --skills": terminalCommands["skills"],
  "your skills": terminalCommands["skills"],
  "my skills": terminalCommands["skills"],

  "what are you studying": terminalCommands["education"],
  study: terminalCommands["education"],
  "your education": terminalCommands["education"],
  "my education": terminalCommands["education"],

  "what are you doing": terminalCommands["career"],
  "current work": terminalCommands["career"],
  involvement: terminalCommands["career"],
  "your involvement": terminalCommands["career"],
  "my involvement": terminalCommands["career"],

  "see projects": terminalCommands["projects"],
  "find projects": terminalCommands["projects"],
  "find --projects": terminalCommands["projects"],
  "your projects": terminalCommands["projects"],
  "my projects": terminalCommands["projects"],

  "get resume": terminalCommands["resume"],
  "get --resume": terminalCommands["resume"],
  "your resume": terminalCommands["resume"],
  "my resume": terminalCommands["resume"],

  "get font": terminalCommands["font"],
  "get --font": terminalCommands["font"],
  "which font": terminalCommands["font"],
  "which --font": terminalCommands["font"],

  "get email": terminalCommands["email"],
  "get --email": terminalCommands["email"],
  "contact email": terminalCommands["email"],
  "contact --email": terminalCommands["email"],
  "your email": terminalCommands["email"],
  "my email": terminalCommands["email"],

  "get phone": terminalCommands["phone"],
  "get --phone": terminalCommands["phone"],
  "contact phone": terminalCommands["phone"],
  "contact --phone": terminalCommands["phone"],
  "contact number": terminalCommands["phone"],
  "contact --number": terminalCommands["phone"],
  "your phone": terminalCommands["phone"],
  "my phone": terminalCommands["phone"],

  "get social": terminalCommands["social"],
  "get --social": terminalCommands["social"],
  "contact social": terminalCommands["social"],
  "contact --social": terminalCommands["social"],
  "get profile": terminalCommands["social"],
  "get --profile": terminalCommands["social"],
  "contact profile": terminalCommands["social"],
  "contact --profile": terminalCommands["social"],

  "get form": terminalCommands["form"],
  "get --form": terminalCommands["form"],
  "contact form": terminalCommands["form"],
  "contact --form": terminalCommands["form"],
});

// Autosuggestion feature
let suggestions = [];

const updateSuggestions = (userInput) => {
  suggestions = Object.keys(terminalCommands).filter(command =>
    command.startsWith(userInput)
  );
  if (suggestions.length > 0) {
    showSuggestions(userInput);
  }
};

const showSuggestions = (userInput) => {
  const suggestionBox = document.querySelector("#suggestionBox");
  suggestionBox.innerHTML = '';
  suggestions.forEach(suggestion => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion");
    suggestionItem.textContent = suggestion;
    suggestionItem.addEventListener("click", () => {
      inputField.value = suggestion;
      suggestionBox.innerHTML = '';
      inputField.focus();
    });
    suggestionBox.appendChild(suggestionItem);
  });
};

// Handling User Input and Keyup Events
const eventListener = () => {
  inputField.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) { // If Enter key is pressed
      inputField.setAttribute("readonly", "true");
      keepValue = inputField.value;
      commandHistory.push(keepValue);
      currentHistoryIndex = commandHistory.length;
      event.preventDefault();
      inputField.disabled = true;
      inputField.setAttribute("value", keepValue);
      inputField.removeAttribute("id");

      if (keepValue.toLowerCase() == "clear" || keepValue.toLowerCase() == "cls") {
        initialSection.innerHTML = initialPrompt;  // clears the terminal
      } else {
        let systemOutput = executeCommand(keepValue.toLowerCase());
        outputField[outputField.length - 1].innerHTML = systemOutput;  // Display output
        initialSection.innerHTML += "<br />" + initialPrompt;  // Add new input field
      }
      inputField = document.querySelector("#userInput");  // Select new input field
      outputField = document.querySelectorAll(".systemOutput");
      inputField.focus();   // Keep cursor in the input field
      eventListener();
    } else if (event.keyCode === 38) { // Up arrow key - Previous command
      if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        inputField.value = commandHistory[currentHistoryIndex];
      }
    } else if (event.keyCode === 40) { // Down arrow key - Next command
      if (currentHistoryIndex < commandHistory.length - 1) {
        currentHistoryIndex++;
        inputField.value = commandHistory[currentHistoryIndex];
      }
    } else {
      updateSuggestions(inputField.value); // Update suggestions based on user input
    }
  });
};

eventListener();

document.body.addEventListener(
  "click",
  () => {
    inputField.focus();
  },
  true
);

// Execute Command Function
const executeCommand = (userInput) => {
  if (userInput == "exit" || userInput == "quit" || userInput == "bye" || userInput == "byebye") {
    window.parent.postMessage("closeTerminal", "*");
    return "Now, the Terminal will be closed. BYE BYE- ndeepak";
  } else if (terminalCommands.hasOwnProperty(userInput)) {
    return terminalCommands[userInput];
  } else {
    return `Command ${userInput} not found, Type <strong>help</strong> to see available commands.`;
  }
};


// Styling suggestions (in case you need it)
const styleSuggestions = document.createElement("style");
styleSuggestions.innerHTML = `
  #suggestionBox {
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    background-color: #fff;
    position: absolute;
    z-index: 10;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 5px;
    display: none; /* Initially hidden */
  }
  .suggestion {
    padding: 10px;
    cursor: pointer;
    font-family: 'Courier New', Courier, monospace;
  }
  .suggestion:hover {
    background-color: #ddd;
  }
  .suggestion:active {
    background-color: #ddd;
  }
`;


document.head.appendChild(styleSuggestions);
const suggestionBox = document.createElement("div");
suggestionBox.id = "suggestionBox";
initialSection.appendChild(suggestionBox);
