const firebaseConfig = {
  apiKey: "AIzaSyBuIW8w86WJM0jpd35cvZVZkSkWfDec3ik",
  authDomain: "contactform-d972f.firebaseapp.com",
  databaseURL: "https://contactform-d972f-default-rtdb.firebaseio.com",
  projectId: "contactform-d972f",
  storageBucket: "contactform-d972f.appspot.com",
  messagingSenderId: "439099220477",
  appId: "1:439099220477:web:5bdfbf2ff1a8c79003b994"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const contactFormDB = firebase.database().ref('contactForm');


// Listen for changes to the data in the contactForm node
contactFormDB.on('value', function(snapshot) {
    // Clear the table before adding new rows
    const tbody = document.querySelector('#contactTable tbody');
    // tbody.innerHTML = '';
    tbody.innerHTML = '';

    snapshot.forEach(function(childSnapshot) {
    const message = childSnapshot.val();
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = childSnapshot.key;
    tr.appendChild(tdId);
    tr.setAttribute('id', childSnapshot.key);

    // Add the rest of the table data to the row
    const tdName = document.createElement('td');
    tdName.textContent = message.name;
    tr.appendChild(tdName);
    
    const tdEmail = document.createElement('td');
    tdEmail.textContent = message.emailId;
    tr.appendChild(tdEmail);
    
    const tdMsg = document.createElement('td');
    tdMsg.textContent = message.msgContent;
    tr.appendChild(tdMsg);
    
    const tdEdit = document.createElement('td');
    const btnEdit = document.createElement('a');
    btnEdit.textContent = 'Editar';
    btnEdit.setAttribute('type', 'button');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.setAttribute('data-target', '#exampleModal');
    
    btnEdit.setAttribute('class', 'btn btn-primary');
      
    btnEdit.setAttribute('href', `teste.html?id=${childSnapshot.key}&name=${message.name}&message=${message.msgContent}`);
    
    tdEdit.appendChild(btnEdit);
    tr.appendChild(tdEdit);
    

    btnEdit.addEventListener('click', function(e){
      e.preventDefault();
      const rowId = e.target.parentNode.parentNode.getAttribute('id');
      const rowRef = contactFormDB.child(rowId);
      
      var modalTitle = document.querySelector('.modal-title');
      var nameModal = document.querySelector('#name');
      var emailModal = document.querySelector('#emailId');
      var msgModal = document.querySelector('#msgContent');
      var btnModal = document.querySelector('#submitModal');
  
      nameModal.value = message.name;
      emailModal.value = message.emailId;
      msgModal.value = message.msgContent;
      
      modalTitle.textContent = message.name;
      console.log(btnModal)
      // Add event listener to the submit button of the modal form
      btnModal.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Get the values of the input fields
          const newName = nameModal.value;
          const newEmail = emailModal.value;
          const newMsg = msgModal.value;
          
          // Update the data of the selected row with the new values
          rowRef.update({
              name: newName,
              emailId: newEmail,
              msgContent: newMsg
          }).then(()=>{
              console.log('deu certo')
          }).catch((error)=>{
              console.log('falhou, ' + error)
          });
          // hide the modal form
          $('#exampleModal').modal('hide');
      });
  });
  





    const tdDelete = document.createElement('td');
    const btnDelete = document.createElement('a');
    btnDelete.textContent = 'Delete';
    btnDelete.setAttribute('href', '#');    
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('class', 'btn btn-danger');


    tdDelete.appendChild(btnDelete);
    tr.appendChild(tdDelete);

        // Add event listener to the delete button
      btnDelete.addEventListener('click', function(event) {
        event.preventDefault();
        const rowId = event.target.parentNode.parentNode.getAttribute('id');
        const rowRef = contactFormDB.child(rowId);
        rowRef.remove();
        tr.remove();
      });
      tbody.appendChild(tr);
    });
  });