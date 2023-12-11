/*Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is an empty string.
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element.*/
function createElemWithText(type = "p", content = "", className)
{
    const newElement = document.createElement(type);
    newElement.textContent = content;
    if (className /*!== undefined*/){
        newElement.setAttribute("class", className);
    };
    return newElement;
};



/*a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
b. For testing (not in function) you may want to define users with the test data.
c. Receives users JSON data as a parameter
d. Returns undefined if no parameter received
e. Loops through the users data
f. Creates an option element for each user with document.createElement()
g. Assigns the user.id to the option.value
h. Assigns the user.name to the option.textContent
i. Return an array of options elements
*/
function createSelectOptions(userData){
    if (userData === undefined){
        return undefined;
    };
    let options = [];
    let userOption;
    userData.forEach(element => {
        userOption = document.createElement("option");
        userOption.value = element.id;
        userOption.textContent = element.name;
        options.push(userOption);
    }
    );
    return options;
};

/*a. Receives a postId as the parameter
b. Selects the section element with the data-post-id attribute equal to the postId
received as a parameter
c. Use code to verify the section exists before attempting to access the classList
property
d. At this point in your code, the section will not exist. You can create one to test if
desired.
e. Toggles the class 'hide' on the section element
f. Return the section element
*/
function toggleCommentSection(postId){
    if (postId === undefined){
        return undefined;
    };
    const sectionElement = document.querySelector(`section[data-post-id= "${postId}"]`);
    if (sectionElement === null){
        return null;
    };
    
    sectionElement.classList.toggle("hide");
    return sectionElement;
};

/*a. Receives a postId as the parameter
b. Selects the button with the data-post-id attribute equal to the postId received as a
parameter
c. If the button textContent is 'Show Comments' switch textContent to 'Hide
Comments'
d. If the button textContent is 'Hide Comments' switch textContent to 'Show
Comments'
e. Suggestion (not required) for above: try a ternary statement
f. Return the button element*/
function toggleCommentButton(postId){
    if (postId === undefined){
        return undefined;
    };
    let num = postId;
    const buttonElement = document.querySelector(`button[data-post-id= "${postId}"]`); //#\\3${postId}
    if (buttonElement === null){
        return null;
    };
    
    if (buttonElement.textContent === "Show Comments"){
        buttonElement.textContent = "Hide Comments";
    }
    else {
        buttonElement.textContent = "Show Comments";
    };



    return buttonElement;
};

/*a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement*/
function deleteChildElements(parentElement){
    if (parentElement instanceof HTMLElement){
    let child = parentElement.lastElementChild; 

    while (child !== null){
    child.remove();
    child = parentElement.lastElementChild;
    };
    return parentElement;
    }

    else {
        return undefined;
    };
};

/*a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. If a postId exists, add a click event listener to the button (reference
addEventListener) - inside the loop so this happens to each button
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the
event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. The listener
test will NOT pass for addButtonListeners until toggleComments is completed.
Nevertheless, I recommend waiting on the logic inside the toggleComments
function until we get there.*/
function addButtonListeners(){
    const buttons = document.querySelectorAll("main button");
    if (buttons.length === 0){
        return buttons;
    }
    
    let buttonList = [];
    for (let x = 0; x < buttons.length; x++){
        if (buttons[x].hasAttribute("data-post-id")/* && buttons[x].textContent !== ""*/){
           let test = buttons[x].getAttribute("data-post-id");
           console.log(test);
           console.log(buttons[x].textContent);
           buttons[x].addEventListener('click', function (e) {toggleComments(e, test)}); 
           //buttonList.push(buttons[x]);
        };
        buttonList.push(buttons[x]);
    };
   
    return buttonList;
};

/*a. Selects all buttons nested inside the main element
b. Loops through the NodeList of buttons
c. Gets the postId from button.dataset.id
d. If a postId exists, remove the click event listener from the button (reference
removeEventListener) - inside the loop so this happens to each button
e. Refer to the addButtonListeners function as this should be nearly identical
f. Return the button elements which were selected
*/
function removeButtonListeners(){
    const buttons = document.querySelectorAll("main button");
    if (buttons.length === 0){
        return buttons;
    };
    let buttonList = [];
    for (let x = 0; x < buttons.length; x++){
        if (buttons[x].hasAttribute("data-post-id")) {
            let test = buttons[x].getAttribute("data-post-id");
            buttons[x].removeEventListener('click', function (e) {toggleComments(e, `${test}`)});
            };
        buttonList.push(buttons[x]);
    };
    
   

return buttonList;

};

/*a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:
${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element*/
function createComments(comment){
    if (!comment) return;
    const fragmentElement = document.createDocumentFragment();
    let articleElement;
    let h3Element;
    let pElement;
    comment.forEach((element) => 
    {
        articleElement = document.createElement("article");
        h3Element = createElemWithText('h3', element.name);
        articleElement.append(h3Element);
        pElement = createElemWithText('p', element.body);
        articleElement.append(pElement);
        pElement = createElemWithText('p', `From: ${element.email}`);
        articleElement.append(pElement);
        fragmentElement.append(articleElement);
    });
    return fragmentElement;
};

/*a. Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the
select menu
g. Return the selectMenu element
*/
function populateSelectMenu(users){
    if (!users) return;
    const menuElement = document.querySelector("#selectMenu");
    const options = createSelectOptions(users);
    //options.forEach((element) => 
    //{
        for (let x = 0; x < options.length; x++){
        menuElement.appendChild(options[x]);
    //});
        };
        //console.log(menuElement);
    return menuElement;
};

/*a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data*/
async function getUsers(){
    let userData;
    try {
   
        response = await fetch("https://jsonplaceholder.typicode.com/users/");
        userData = await response.json();
    } catch(error) {
        console.log(error);
    };
    //console.log(userData);

    return userData;
};

/*a. Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data*/
async function getUserPosts(id){
    if (!id){
        return undefined;
    };
    let userPosts;
    let targetPosts = [];
    try{
        response = await fetch("https://jsonplaceholder.typicode.com/posts/");
        userPosts = await response.json();
    } catch(error){
    };
    userPosts.forEach((element) => {
        if (element.userId === id){
            targetPosts.push(element);
        };
    });

    return targetPosts;
};

/*a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data*/
async function getUser(userId){
    if (!userId){
        return undefined;
    };
    let userData;
    try{
        response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        userData = await response.json();
    } catch(error){
        console.log(error);
    };
    //console.log(userData);
    return userData;
};

/*a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data*/
async function getPostComments(postId){
    if(!postId){
        return undefined;
    };
    let commentsData;
    let targetComments = [];
    try{
        response = await fetch(`https://jsonplaceholder.typicode.com/comments/`);
        commentsData = await response.json();
        commentsData.forEach((element) => {
            if (element.postId === postId){
                targetComments.push(element)
            };
        });

    }catch(error){
        console.log(error);
    };

    return targetComments;
};

/*a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element*/
async function displayComments(postId){
    if(!postId){
        return undefined;
    };
    let sectionElement = document.createElement("section");
    sectionElement.setAttribute(`data-post-Id`, postId);
    sectionElement.classList.add("comments");
    sectionElement.classList.add("hide");
    let comments = await getPostComments(postId);
    let fragment = await createComments(comments);
    sectionElement.appendChild(fragment);

    
    return sectionElement;
};

/*a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:
g. Create an article element with document.createElement()
h. Create an h2 element with the post title
i. Create an p element with the post body
j. Create another p element with text of `Post ID: ${post.id}`
k. Define an author variable equal to the result of await getUser(post.userId)
l. Create another p element with text of `Author: ${author.name} with
${author.company.name}`
m. Create another p element with the author’s company catch phrase.
n. Create a button with the text 'Show Comments'
o. Set an attribute on the button with button.dataset.postId = post.id
p. Append the h2, paragraphs, button, and section elements you have created to
the article element.
q. Create a variable named section equal to the result of await
displayComments(post.id);
r. Append the section element to the article element
s. After the loop completes, append the article element to the fragment
t. Return the fragment element*/
async function createPosts(posts){
    if(!posts){
        return undefined;
    };
    let fragment = document.createDocumentFragment();
        
        for (let x = 0; x < posts.length; x++){
        let article = document.createElement("article");
        let postTitle = document.createElement("h2");
        postTitle.textContent = posts[x].title;
        let body = document.createElement("p");
        body.textContent = posts[x].body;
        let postId = document.createElement("p");
        postId.textContent = `Post ID: ${posts[x].id}`;
        let author = await getUser(posts[x].userId);
        let authorData = document.createElement("p");
        authorData.textContent = `Author: ${author.name} with ${author.company.name}`;
        let catchPhrase = document.createElement("p");
        catchPhrase.textContent = author.company.catchPhrase;
        let button = document.createElement("button");
        button.textContent = "Show Comments";
        button.setAttribute(`data-post-id`, posts[x].id);
        let comments = await displayComments(posts[x].id);

        article.appendChild(postTitle);
        article.appendChild(body);
        article.appendChild(postId);
        article.appendChild(authorData);
        article.appendChild(catchPhrase);
        article.appendChild(button);
        article.appendChild(comments);
        
        fragment.appendChild(article);
        
        };
    
    
    return fragment;
};

/*a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable*/
async function displayPosts(posts){
    if (posts)
    {
        const main = document.querySelector("main");
        let element = await createPosts(posts);
        main.appendChild(element);

        return element;
    }
    else
    {
        let element = document.querySelector("p.default-text");
        return element;
    };

    
};

/*a. Dependencies: toggleCommentSection, toggleCommentButton
b. Receives 2 parameters: (see addButtonListeners function description)
i. The event from the click event listener is the 1st param
ii. Receives a postId as the 2nd parameter
c. Sets event.target.listener = true (I need this for testing to be accurate)
d. Passes the postId parameter to toggleCommentSection()
e. toggleCommentSection result is a section element
f. Passes the postId parameter to toggleCommentButton()
g. toggleCommentButton result is a button
h. Return an array containing the section element returned from
toggleCommentSection and the button element returned from
toggleCommentButton: [section, button]
*/
function toggleComments(event , postId){
    if(!event){
        return undefined;
    }
    if(!postId){
        return undefined;
    }
    event.target.listener = true;
    let section = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);
    let result = [section, button];

    return result;
};

/*a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
addButtonListeners
b. Is an async function
c. Receives posts JSON data as a parameter
d. Call removeButtonListeners
e. Result of removeButtonListeners is the buttons returned from this function
f. Call deleteChildElements with the main element passed in as the parameter
g. Result of deleteChildElements is the return of the main element
h. Passes posts JSON data to displayPosts and awaits completion
i. Result of displayPosts is a document fragment
j. Call addButtonListeners
k. Result of addButtonListeners is the buttons returned from this function
l. Return an array of the results from the functions called: [removeButtons, main,
fragment, addButtons]*/
async function refreshPosts(posts){
    if (!posts){
        return undefined;
    };

    let mainElement = document.querySelector("main");
    let removeButtons = removeButtonListeners();
    let main = await deleteChildElements(mainElement);
    let fragment = await displayPosts(posts);
    let addButtons = await addButtonListeners();
    let results = [removeButtons, main, fragment, addButtons];
    return results;
};

/*a. Dependencies: getUserPosts, refreshPosts
b. Should be an async function
c. Automatically receives the event as a parameter (see cheatsheet)
d. Disables the select menu when called into action (disabled property)
e. Defines userId = event.target.value || 1; (see cheatsheet)
f. Passes the userId parameter to await getUserPosts
g. Result is the posts JSON data
h. Passes the posts JSON data to await refreshPosts
i. Result is the refreshPostsArray
j. Enables the select menu after results are received (disabled property)
k. Return an array with the userId, posts and the array returned from refreshPosts:
[userId, posts, refreshPostsArray]*/
async function selectMenuChangeEventHandler(event){
    if (!event){
        return undefined;
    };
    document.getElementById("selectMenu").disabled = true;
    let userId = event?.target?.value || 1;
    let posts = await getUserPosts(userId);
    let refreshPostsArray = await refreshPosts(posts);
    document.getElementById("selectMenu").disabled = false;
    let results = [userId, posts, refreshPostsArray];
    return results;
};

/*a. Dependencies: getUsers, populateSelectMenu
b. Should be an async function
c. No parameters.
d. Call await getUsers
e. Result is the users JSON data
f. Passes the users JSON data to the populateSelectMenu function
g. Result is the select element returned from populateSelectMenu
h. Return an array with users JSON data from getUsers and the select element
result from populateSelectMenu: [users, select]*/
async function initPage(){
    let users = await getUsers();
    //console.log(users);
    let select = populateSelectMenu(users);
    let results = [users, select];


    return results;
};

/*a. Dependencies: initPage, selectMenuChangeEventHandler
b. Call the initPage() function.
c. Select the #selectMenu element by id
d. Add an event listener to the #selectMenu for the “change” event
e. The event listener should call selectMenuChangeEventHandler when the change
event fires for the #selectMenu
f. NOTE: All of the above needs to be correct for your app to function correctly.
However, I can only test if the initApp function exists. It does not return anything.
NOTE: There is one last step to get your app to function correctly. I cannot test for this, but you
must apply it to call the script into action.
*** This must be underneath the definition of initApp in your file.
1. Add an event listener to the document.
2. Listen for the “DOMContentLoaded” event.
3. Put initApp in the listener as the event handler function.
4. This will call initApp after the DOM content has loaded and your app will be started.*/
function initApp(){
    initPage();
    let select = document.getElementById("selectMenu");
    select.addEventListener("change", selectMenuChangeEventHandler());


};
document.addEventListener("DOMContentLoaded", initApp());
