const asyncHandler = require("express-async-handler");

const knowledgeBase = [
    // ✅ REACT
    {
        keywords: ["react", "what is react"],
        reply: "React is a JavaScript library developed by Facebook for building interactive user interfaces."
    },
    {
        keywords: ["react hooks", "useeffect", "usestate"],
        reply: "React Hooks allow you to use state and other React features without writing a class. Examples include useState and useEffect."
    },
    {
        keywords: ["react component"],
        reply: "In React, a component is a reusable piece of UI. Components can be functional or class-based."
    },
    {
        keywords: ["props in react"],
        reply: "Props are inputs passed from a parent component to a child component to communicate data."
    },
    {
        keywords: ["state in react"],
        reply: "State is a way to store data in a component that can change over time and affect what gets rendered."
    },
    {
        keywords: ["react router"],
        reply: "React Router is a library used for navigation within React apps, enabling multi-page experiences."
    },
    {
        keywords: ["jsx"],
        reply: "JSX is a syntax extension for JavaScript that looks similar to HTML and is used in React to describe UI."
    },

    // ✅ FRONTEND
    {
        keywords: ["frontend", "frontend development"],
        reply: "Frontend is the part of a website users interact with directly. Examples include HTML, CSS, JavaScript, and React."
    },
    {
        keywords: ["html", "what is html"],
        reply: "HTML (HyperText Markup Language) defines the structure of web pages."
    },
    {
        keywords: ["css", "what is css"],
        reply: "CSS (Cascading Style Sheets) is used to style and layout web pages."
    },
    {
        keywords: ["javascript", "js"],
        reply: "JavaScript is a programming language that adds interactivity to web pages, like handling clicks and animations."
    },
    {
        keywords: ["responsive design"],
        reply: "Responsive design ensures a website looks good on all device sizes using techniques like media queries."
    },
    {
        keywords: ["bootstrap"],
        reply: "Bootstrap is a frontend framework with pre-built components and a grid system to simplify UI design."
    },

    // ✅ BACKEND
    {
        keywords: ["backend", "backend development"],
        reply: "Backend is the server-side part of a web application that handles database and business logic. Examples: Node.js, Express."
    },
    {
        keywords: ["node", "nodejs"],
        reply: "Node.js is a runtime environment that runs JavaScript code on the server side."
    },
    {
        keywords: ["express", "expressjs"],
        reply: "ExpressJS is a fast, minimalist web framework for Node.js."
    },
    {
        keywords: ["api", "rest api"],
        reply: "An API (Application Programming Interface) allows different software applications to communicate."
    },
    {
        keywords: ["database", "mongodb"],
        reply: "MongoDB is a NoSQL database that stores data in flexible JSON-like documents."
    },
    {
        keywords: ["authentication", "login system"],
        reply: "Authentication verifies user identity, often using sessions or JWT in backend."
    },
    {
        keywords: ["crud"],
        reply: "CRUD stands for Create, Read, Update, Delete — basic operations on databases."
    },
    {
        keywords: ["mvc"],
        reply: "MVC (Model-View-Controller) is an architecture pattern that separates application into three interconnected parts."
    },

    // ✅ IT GENERAL
    {
        keywords: ["it", "information technology", "what is it"],
        reply: "Information Technology (IT) involves using computers, networks, and software to store, retrieve, and send information."
    },
    {
        keywords: ["software", "software meaning"],
        reply: "Software is a set of instructions that tells hardware how to perform tasks."
    },
    {
        keywords: ["hardware", "hardware meaning"],
        reply: "Hardware refers to the physical parts of a computer system like CPU, RAM, and storage devices."
    },
    {
        keywords: ["network", "what is network"],
        reply: "A network connects multiple computers to share data and resources."
    },
    {
        keywords: ["cloud computing"],
        reply: "Cloud computing provides on-demand computing services over the internet like storage and processing power."
    },
    {
        keywords: ["database"],
        reply: "A database is an organized collection of data that can be accessed and managed efficiently."
    },
];

const chatBotReply = asyncHandler(async (req, res) => {
    const { message } = req.body;

    try {
        reply = "Umm... that one flew over my circuits! 😅 Try asking something like 'What is React?' or 'Tell me about HTML'.";


        if (!message || message.trim() === "") {
            reply = "Please type something to start the conversation.";
        } else {
            const msg = message.toLowerCase();

            // General greetings
            if (msg.includes("hello") || msg.includes("hi")) {
                reply = "Hello! How can I assist you in the IT field today?";
            }
            // Bot status
            else if (msg.includes("how are you")) {
                reply = "I'm just a bot, but I'm functioning at 100%! ⚙️";
            }
            else if (msg.includes("bye")) {
                reply = "Goodbye! All the best with your IT journey! 👨‍💻";
            }
            else {
                // Search knowledgeBase for matching keywords
                let found = false;
                for (let item of knowledgeBase) {
                    if (item.keywords.some(kw => msg.includes(kw))) {
                        reply = item.reply;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    reply = "Sorry, I couldn't find an answer. Could you please rephrase your question or ask something else?";
                }
            }
        }

        res.status(200).json({ reply });
    } catch (error) {
        console.error("Chatbot error:", error.message);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

module.exports = { chatBotReply };
