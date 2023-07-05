const fetchAllProducts =() => {
    return new Promise( async(resolve) =>{
        // TODO : we will not hard-code server here
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json()
        resolve({data})
        } 
    );
}
export default fetchAllProducts