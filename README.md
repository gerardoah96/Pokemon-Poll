# Pokemon-Poll
This readme will give you details on what this program does, how to change what is being polled and general information on this program.

The server can be started by accessing the server folder with "cd server" and calling "npm start" a message will show up in terminal saying "Server is running...".

This program as of now, allows for the polling of a user to select one of nine options, saves the selection and blocks the user from
selecting another option in the same window/tab.

However if the user copies the link and opens it again, they can anwser the poll a second time.

The poll options are created by reading the items inside the data.json file which is found inside the server folder.

The poll options are created by the main.js and are styled by referencing the main.css appropriate items.

By modifying, adding or removing items from this data.json one can add, remove or even change what is being polled in its entirety.

To change the tittle of the poll, one has to access the main.js file found inside the client folder, scroll to the bottom and change the following text found inside "".

const p = new Poll(
    document.querySelector(".poll"),
    "Which Pokemon GEN has the best starters?"
);
