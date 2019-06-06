var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: '/images/ball.jpg'},
      {name: 'car', id: 2, path: '/images/car.jpg'},
      {name: 'glasses', id: 3, path: '/images/glasses.jpg'},
      {name: 'paintbrush', id: 4, path: '/images/paintbrush.jpg'},
      {name: 'pen', id: 5, path: '/images/pen.jpg'},
      {name: 'scissors', id: 6, path: '/images/scissors.jpg'},
      {name: 'trowel', id: 7, path: '/images/trowel.jpg'},
      {name: 'slinky', id: 8, path: '/images/slinky.jpg'},
    ],
  },
  methods: {
    async addNewItem(){
      try {
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
