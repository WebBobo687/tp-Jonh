// affiche les employes quand la page se charge
list_employees()

// créé la variable global pour la récupération d'id
var id =''

//AFFICHE LA LISTE DES EMPLOYES----------------------------------------/
function list_employees() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = JSON.parse(this.responseText);
            for (i = 0; i < reponse.length; i++){
              var obj = reponse[i];

              // création du tableau des employés
              document.getElementById('employees').innerHTML +=
                '<tr id= "">' + 
                  '<td id= "">' + obj.id +  '</td>' +
                  '<td id= "">' + obj.name + '</td>' +
                  '<td id= "">' + obj.last_name + '</td>' +
                  '<td id= "">' + obj.job_title + '</td>' +
                  '<td id= "">' + obj.email + 
                    "<button onclick = del_employe(event) id='" + obj.id + "' class='del'> X supprimer </button> " +
                    "<button onclick = modify_employe(event) id='"+ obj.id +"' class='modif'> Modifier </button> " +   
                  '</td>' +
                '</tr>';
            }
        } else {
        console.log('out of get employees');
        }
    };

  xhttp.open(
    "GET",
    "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees",
    true
  );

  xhttp.send();
}

//AJOUTER UN EMPLOYE---------------------------------------------------/
function add_employe () {

  var xhttp = new XMLHttpRequest();
  var name = document.getElementById("name").value
  var last_name = document.getElementById("last_name").value
  var job =document.getElementById("job").value
  var email =document.getElementById("email").value
  
  xhttp.onreadystatechange = function () {
    console.log(this.readyState)
    if (this.readyState == 4 && this.status == 201) {
      alert("L'employé à bien était ajouter");
      location.reload();
    } else { 
      console.log('out of add function');
    }
  }

  // Vérification des valeurs de champs pour en laisser aucun vide
  if (name != '' && last_name != '' && job != '' && email != '') {

    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

    let errorInput =''

    if(!emailPattern.test(email)) {
      errorInput += "- Email invalide. Ex : monAdresse@email.com !";
    } else {
      console.log("it's ok")
    }
    
    if(errorInput=='') {
      xhttp.open (
        "POST",
        "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees",
        true
        );
  
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(
          "name="+name
          +"&"+
          "last_name="+last_name
          +"&"+
          "email="+email
          +"&"+
          "job_title="+job
        );
    } else {
      alert(errorInput)
    }

  } else {
    alert('Il faut remplir tout les champs!!')
  } 
}

//EFFACE UN EMPLOE-----------------------------------------------------/
function del_employe(event) {
  var xhttp = new XMLHttpRequest();

  //get l'id de lélément
  var employe = event.target
  id= employe.id
  let confirmMessage = "Êtes-vous sûr de vouloir supprimer l'employé N°" + id + " ?";

  if(confirm(confirmMessage)){
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert("l'employé n° "+ id +" est supprimer")
        location.reload();
      } else {
        console.log('out of del function');
      }
    };
      
    xhttp.open(
      "DELETE",
      "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/"+ id,
      true
    );
      xhttp.send();
  }
}

//MODIFIER LES DONNEES D'UN EMPLOYE------------------------------------/
function modify_employe (event) {

  var xhttp = new XMLHttpRequest();  
  var employe = event.target
  id= employe.id
  
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      show_modalModify()

      var info=JSON.parse(this.response)
      document.getElementById('name').value=info.name
      document.getElementById('last_name').value=info.last_name
      document.getElementById('job').value=info.job_title
      document.getElementById('email').value=info.email   

    } else {
      console.log('out of modif function')
    }
  }
  
  xhttp.open (
    "GET",
    "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/" + id,
    true
  );
  xhttp.send();
}

//modifie les données
function updateData () {
  var xhttp = new XMLHttpRequest();

  var name = document.getElementById("name").value
  var last_name = document.getElementById("last_name").value
  var job =document.getElementById("job").value
  var email =document.getElementById("email").value
  
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      alert("L'employé n°"+ id +' à bien était modifier');
      location.reload();

    } else { 

      console.log('out of update function')
    }
  }

  // Vérification des valeurs de champs pour en laisser aucun vide
  if (name != '' && last_name != '' && job != '' && email != '') {

    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$/;

    let errorInput =''

    if(!emailPattern.test(email)) {
      errorInput += "- Email invalide. Ex : monAdresse@email.com !\n";
    } else {
      console.log("it's ok")
    }
    
    if(errorInput=='') {
      xhttp.open (
        "PUT",
        "https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees/"+id,
        true
        );
  
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(
          "name="+name
          +"&"+
          "last_name="+last_name
          +"&"+
          "email="+email
          +"&"+
          "job_title="+job
        );
    } else {
      alert(errorInput)
    }

  } else {
    alert('Il faut remplir tout les champs!!')
  } 
}

//AFFICHER LA MODAL D'AJOUT----------------------------------------------------/
function show_modalAdd () {
  document.getElementById('modal').style.display='block'
  document.getElementById('add').style.display='block'
  document.getElementById('modify').style.display='none'
  document.getElementById('header').innerText='Ajouter un employe'
}

//AFFICHER LA MODAL DE MODIFICATION----------------------------------------------------/
function show_modalModify () {
  document.getElementById('modal').style.display='block'
  document.getElementById('add').style.display='none'
  document.getElementById('modify').style.display='block'
  document.getElementById('header').innerText='modifier un employé'
}

//affiche les employés dès que la page est chargée