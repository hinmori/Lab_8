<template>
  <div id="app" class="container">
    <br>
    <b-nav>
      <b-nav-item @click="car = null">Список всех машин</b-nav-item>
      <b-nav-item @click="getNewCar">Добавить запись</b-nav-item>
    </b-nav>
    <hr>
    <h3 v-if="cars.length>0">Список всех машин</h3>
    <b-table striped hover :items="cars" @row-clicked="carClick"></b-table>
    
    <div v-if="car && !editMode">
      <h3>{{ car.brand + ' ' + car.model }}</h3>
      <h3>{{ car.year }}</h3>
      <h3>{{ car.color }}</h3>
      <h3>{{ car.price }}</h3>
      <b-button variant="success" @click="editMode = true" >Изменить</b-button>
    </div>

    <b-form @submit.prevent="postCar" v-if="car && editMode">
      <h3 v-if="car.id > 0">Изменение записи</h3>
      <h3 v-else>Добавление записи</h3>
      
      <b-form-group
        id="input-group-1"
        label="Марка:"
        label-for="brand"
        description="Введите марку машины"
      >
        <b-form-input
          id="brand"
          v-model="car.brand"
          type="text"
          placeholder="Введите марку машины "
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Модель:"
        label-for="model"
        description="Введите модель машины"
      >
        <b-form-input
          id="model"
          v-model="car.model"
          type="text"
          placeholder="Введите модель машины "
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Год выпуска:"
        label-for="year"
        description="Введите год выпуска"
      >
        <b-form-input
          id="year"
          v-model="car.year"
          type="int"
          placeholder="Введите год выпуска"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Цвет:"
        label-for="color"
        description="Введите цвет машины"
      >
        <b-form-input
          id="color"
          v-model="car.color"
          type="text"
          placeholder="Введите цвет машины"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        id="input-group-5"
        label="Цена:"
        label-for="price"
        description="Введите цену машины"
      >
        <b-form-input
          id="price"
          v-model="car.price"
          type="int"
          placeholder="Введите цену машины"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Сохранить</b-button>
      <b-button variant="danger" v-if="car.id > 0" @click="delCar" style="margin-left: 6px;">Удалить</b-button>
    </b-form>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      editMode: false, 
      cars: [],
      car: null
    }
  },
  methods: {
    getCars() {
      this.axios.get("api/cars").then((response) => {
          this.cars = response.data
      })
    },
    carClick(car) {
      this.car = car
      this.editMode = false
    },
    postCar() {
      if(this.car.id > 0)
        this.axios.post("api/car", this.car).then(() => {
            this.editMode = false
        }) 
      else 
        this.axios.put("api/cars", this.car).then((response) => {
              this.editMode = false
              this.car.id = response.data.insertId
              this.cars.push(this.car)
          })    
    },
    getNewCar() {
      this.car = {
        id: 0,
        brand: '',
        model: '', 
        year: '',
        color: '', 
        price: ''
      }
      this.editMode = true
    },
    delCar() {
      this.axios.delete("api/car?id="+this.car.id).then(() => {
        this.getCars()
        this.editMode = false
        this.car = null
      })
    }
  },
  created() {
    this.getCars()
  }
}
</script>


