let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;

//Este swall es una promesa, por eso luego le pongo un .then y al resultado de la promesa le extraigo el value.
Swal.fire({
    title:"Identificate",
    input: 'text',
    allowOutsideClick:false,
    inputValidator: (value)=>{
        return !value && 'Necesitas un nombre de usuario para participar!'
    }
}).then(result=>{
    user = result.value;
})

chatBox.addEventListener('keyup', evt=>{
    if(evt.key==='Enter'){
        if(chatBox.value.trim().length>0){
            //por lo menos se envia un simbolo.
            socket.emit('message',{user, message:chatBox.value.trim()})
            chatBox.value='';
        }
    }
})

/*Sockets*/
socket.on('log', data=>{
    let messages="";
    data.forEach(log=>{
        messages= messages + `${log.user} dice: ${log.message} <br>`
    })
    log.innerHTML = messages;
})
