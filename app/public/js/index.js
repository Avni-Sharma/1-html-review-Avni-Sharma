
const Offer = {
    data() {
      return {
        "person": undefined,
        "books":[],
        "booksForm": {}
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY')
        }
    },
    methods: {
        fetchUserData(){
            console.log("A");
            fetch('https://randomuser.me/api/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                console.log("C");
                this.person = responseJson.results[0];
                d = new Date(this.person.dob.date)
                this.person.dob.formatted_date = d.toISOString().substring(0, 10)
                console.log("####### ",this.person.picture.large)
    
            })
            .catch( (err) => {
                console.error(err);
            })
            console.log("B");

        },
        fetchBookData(){
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
                console.log(this.books);
            })
            .catch( (err) => {
                console.log(this.books);
                console.error(err);
            })
        },
        postNewBook(evt) {
            // this.booksForm.id = this.selectedbooks.id;        
            console.log("Posting:", this.booksForm);
            // alert("Posting!");
        
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.booksForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => {
                this.fetchBookData();
              })
  
          },
    },
    created() {
        this.fetchUserData();
        this.fetchBookData();
    } //end created
} // end Offer config
Vue.createApp(Offer).mount('#offerApp');

console.log("Z");