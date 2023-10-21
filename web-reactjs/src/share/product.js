

export const PI = 3.14;
export const list = [
    {
        id: 101,
        name :"Macbook Pro 2012"
    },
    {
        id: 102,
        name :"Macbook Pro 2013"
    },
    {
        id: 103,
        name :"Macbook Pro 2014"
    },
]

// create a function (arrow)
export const  getProductName = () => {
    return list[0].name
}

export const getProductById = (id) => {
    ///// Way 1

    //    var item = [];
    //    for(var i = 0; i < list.length ; i++){
    //     if(id == list[i].id){
    //         // item = list[i];
    //         item.push(list[i])
    //         break;
    //     }
    //    }
    //    return item;

    // //// Way 2 
    return list.filter((row,index)=>row.id == id)
    
}



// create a function 
export function getProductBarcode(){

}
