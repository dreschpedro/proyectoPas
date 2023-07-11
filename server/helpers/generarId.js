const generarId= () =>{

    const random = Math.random().toString().substring();
    const fecha = Date.now().toString();
    return random+fecha

}

export default generarId