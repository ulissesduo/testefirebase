// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBuIW8w86WJM0jpd35cvZVZkSkWfDec3ik",
    authDomain: "contactform-d972f.firebaseapp.com",
    databaseURL: "https://contactform-d972f-default-rtdb.firebaseio.com",
    projectId: "contactform-d972f",
    storageBucket: "contactform-d972f.appspot.com",
    messagingSenderId: "439099220477",
    appId: "1:439099220477:web:5bdfbf2ff1a8c79003b994"
  };
  
  // Initialize Firebase database
  const app = firebase.initializeApp(firebaseConfig);
  
  // referencing the database
  const contactFormDB = firebase.database().ref('contactForm');
  const teacherRef = firebase.database().ref('teachers').push();
  const studentRef = firebase.database().ref('students').push();
  
  
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  function submitForm(e){
    e.preventDefault();
    var name = getElementValue('name');
    var emailId = getElementValue('emailId');
    var msgContent = getElementValue('msgContent');
    const newMessageRef = contactFormDB.push();
    const newStudentRef = studentRef.push();
    const newTeacherRef = teacherRef.push();

    const messageId = newMessageRef.getKey(); // retrieve the unique ID
    // console.log(messageId);
    // Set the form data as the value of the new message node


    newStudentRef.set({

      name: name,
      emailId: emailId,
      msgContent: msgContent
    })
    .then(() => {
      // Clear the form after the data has been added to the database
      document.getElementById('name').value = '';
      document.getElementById('emailId').value = '';
      document.getElementById('msgContent').value = '';
    
      // Show a success message to the user
      alert('Your message has been sent.');
    
      // Redirect to teste.html and pass the message ID in the URL query string
      // window.location.href = "teste.html?name=" + name + "&msgContent=" + msgContent + "&emailId=" + emailId;
    })
    .catch(error => {
      console.error(error);
      alert('There was an error sending your message. Please try again later.');
    });
    


    newMessageRef.set({

      name: name,
      emailId: emailId,
      msgContent: msgContent
    })
    .then(() => {
      // Clear the form after the data has been added to the database
      document.getElementById('name').value = '';
      document.getElementById('emailId').value = '';
      document.getElementById('msgContent').value = '';
    
      // Show a success message to the user
      alert('Your message has been sent.');
    
      // Redirect to teste.html and pass the message ID in the URL query string
      // window.location.href = "teste.html?name=" + name + "&msgContent=" + msgContent + "&emailId=" + emailId;
    })
    .catch(error => {
      console.error(error);
      alert('There was an error sending your message. Please try again later.');
    });
    
  
  }
  
  const saveMessage = (name, emailId, msgContent) =>{
    var newContentForm = contactFormDB.push();
  
    newContentForm.set({
      name: name,
      emailId: emailId,
      msgContent: msgContent,
    });
  }
  
  const getElementValue = (id) =>{
    return document.getElementById(id).value;
  };
// Retrieve messages from Firebase database and display them
contactFormDB.on('value', function(snapshot) {
  // clear the message list before displaying new messages
  document.getElementById('messageList').innerHTML = '';

  snapshot.forEach(function(childSnapshot) {
    const message = childSnapshot.val();
    
    const li = document.createElement('li');
    li.innerHTML = '<strong>' + message.name + '</strong>: ' + message.msgContent + ' (' + childSnapshot.key + ')';


    // Add Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';

    // Append buttons to list item
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    document.getElementById('messageList').appendChild(li);
  });
});

  
  contactFormDB.on('value', function(snapshot) {
    // clear the message list before displaying new messages
    document.getElementById('messageList').innerHTML = '';
  
    snapshot.forEach(function(childSnapshot) {
      const message = childSnapshot.val();
      const li = document.createElement('li');
      li.innerHTML = '<strong>' + message.name + '</strong>: ' + message.msgContent;
      document.getElementById('messageList').appendChild(li);
    });
  }, function(error) {
    console.error(error);
  });