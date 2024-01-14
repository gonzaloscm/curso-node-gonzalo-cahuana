<template>
  <div>
    <h1>Usuarios</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Años</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="updateUser(user._id)">Actualizar</button>
              <button @click="deleteUser(user._id)">Eliminar</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div>
    <h1>Crear Usuario</h1>
    <form @submit.prevent="createUser">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="user.name">
      </div>
      <div>
        <label for="age">Años:</label>
        <input type="number" id="age" v-model="user.age">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="user.email">
      </div>
      <button type="submit">Crear usuario</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return { 
      users: [],
      user:{
        name: '', 
        age:null,
        email: ''
      } 
    };
  },


  async created(){
    try{
      const response = await fetch('http://localhost:3200/api/users');
      if(!response.ok){
        throw new Error('Error al acceder a la BD');
      }
      const data = await response.json();
      this.users = data;
    } catch(e){
      console.log(e);
    }
  },

methods:{
  async createUser(){
      try{
        const response = await fetch('http://localhost:3200/api/user',{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.user),
        });
        if(!response.ok){
          throw new Error('Error al crear');
        }
        const responseData = await response.json();
        console.log('Usuario creado',responseData);
        this.users.push(responseData);
        this.resetForm();
      }catch(e){
        console.log(e);
      }
  },
  async deleteUser(userId){
    if(confirm('¿Estas seguro de eliminar a este usuario?')){
      try{
        const response = await fetch(`http://localhost:3200/api/user/${userId}`,{
          method:'DELETE'
        });
        if(!response.ok){
          throw new Error('Error al eliminar usuario');
        }
        this.users = this.users.filter(user => user._id !== userId);
      }catch(e){
        console.log(e);
      }
    }
  },

  //async updateUser(userId){
  //
  //}
    resetForm(){
      this.user = {
        name: '',
        email: '',
        age:  null
      }
    }
}
    
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table{
    width: 100%;
    border-collapse: collapse;
  }

  th, td{
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
</style>
