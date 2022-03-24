let myId = window.location.hash.split('#')[1];

let myHeaders = new Headers();
let url = '/edit/' + myId;
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch(url, options)
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
    })
    .then((response) => {
        console.log(response);
        let title = document.querySelector('#titreD');
        title.value = response.name;

        let priceD = document.querySelector('#priceD');
        priceD.value = response.prix.split(" ")[0];

        let dispD = document.querySelector('#dispD');
        dispD.checked = response.dispo;
    });


// l'ajout
let titreD = document.querySelector('#titreD');
let priceD = document.querySelector('#priceD');
let dispD = document.querySelector('#dispD');


document.querySelector('#testPostD').addEventListener('click', () => {
    let tmp = {

        name: titreD.value,
        prix: priceD.value+`€`,
        dispo: dispD.checked
    };

    let options2 = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(tmp)
    }

    let url = '/update/' + myId;
    fetch(url, options2)
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
        })
        .then((response) => {

        })
});
