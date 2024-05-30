import axios from "axios";

const fetchUsers = async() => {

  const response = await axios.get("https://dummyjson.com/users");


     const users = response.data.users.map( (item, index) => {

         return{
            id: index,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email
         }
         
     })
    return users;
}

export {fetchUsers}