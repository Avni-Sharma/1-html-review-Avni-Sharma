
const Offer = {
    data() {
      return {
        "person": undefined,
        "books":[],
        "booksForm": {},
        "selectedBook": null
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
        //FetchBook
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

    // Update book
      postBook(evt) {
            console.log ("Test:", this.selectedBook);
            console.log("######", this.booksForm);
            if (this.selectedBook) {
                console.log("######", this.booksForm);
                this.postEditBook(evt);
            } else {
                this.postNewBook(evt);
            }
        },

    postEditBook(evt) {
        this.booksForm.id = this.selectedBook.id;       

        console.log("Editing!", this.booksForm);

        fetch('api/books/update.php', {
            method:'POST',
            body: JSON.stringify(this.booksForm),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;

            // reset the form
            this.handleResetEdit();
            });
        },
    //delete book
    postDeleteBook(bk) {  
        if ( !confirm("Are you sure you want to delete the offer from " + bk.Title + "?") ) {
            return;
        }  

        console.log("Delete!", bk);

        fetch('api/books/delete.php', {
            method:'POST',
            body: JSON.stringify(bk),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
            })
            .then( response => response.json() )
            .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;

            // reset the form
            this.handleResetEditBooks();
            });
        },

    
          handleEditBooks(book) {
            console.log("selecting", book);
            this.selectedBook = book;
            this.booksForm = Object.assign({}, this.selectedBook);
          },
          handleResetEditBook() {
            this.selectedBook = null;
            this.booksForm = {};
          }
    },
    created() {
        this.fetchUserData();
        this.fetchBookData();
    } //end created
} // end Offer config
Vue.createApp(Offer).mount('#offerApp');

console.log("Z");