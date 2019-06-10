var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: '/images/baseball.jpg'},
      {name: 'car', id: 2, path: 'car.jpg'},
      {name: 'glasses', id: 3, path: 'glasses.jpg'},
      {name: 'paintbrush', id: 4, path: 'paintbrush.jpg'},
      {name: 'pen', id: 5, path: 'pen.jpg'},
      {name: 'scissors', id: 6, path: 'scissors.jpg'},
      {name: 'trowel', id: 7, path: 'trowel.jpg'},
      {name: 'slinky', id: 8, path: 'slinky.jpg'},
    ],
    items: [],
    findTitle: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  methods: {
    async addNewItem(){
      try {
        let result = await axios.post("/api/items" + this.title, {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item.id, {
          title: this.findItem.title,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },

  },
});
