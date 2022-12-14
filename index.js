function list_employees() {

    const xhttp = new XMLHttpRequest;

    // const employe = JSON.parse(this.response);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            var employee = JSON.parse(response);
            for (let i=0; i<employee.length; i++) {
                document.getElementById('share').innerHTML = response;
            }
        } else {
            console.log('out');
        }
    }

    xhttp.open(
        'GET', 
        'https://6057e432c3f49200173ad08d.mockapi.io/api/v1/employees',
        true
    );

    xhttp.send();
}