class BookShelf {
    constructor() {
        this.name;
        this.year;
        this.author;
        this.pages;
        this.pageNow = 0;
        this.books = [];
        this.start();
    }

    start() {
        this.updateData();
        setInterval(this.updateData, 1000);
        $("#submitBook").on("click", () => {
            this.name = $("#nameVal").val();
            this.year = $("#yearVal").val();
            this.author = $("#authorVal").val();
            this.pages = $("#pagesVal").val();
            this.saveBook();
        });
        this.loadFromFile();
    }

    loadFromFile() {
        try {
            $.get("database.txt", (data) => {
                if (data != ""){
                    let content = JSON.parse(data).content;
                    this.books = content;
                    for (let i = 0; i < this.books.length; i++) {
                        this.books[i].pageNow = (this.books[i].pageNow);
                    }
                    console.log(this.books);
                    localStorage.setItem("book", JSON.stringify(content));
                }
            }).done(() => {
                this.showBooks();
            });
        } catch (e) {
            console.log("VIGA:" + e);
        }

        $(".listToggle").click(() => {
            if (event.target.nodeName == "H1"){
                this.imgY = parseInt($(event.currentTarget).find("img").css("transform").split(',')[3]);
                $(event.currentTarget).find("ul").slideToggle();
                $(event.currentTarget).find("img").css({"transform": "scale(" + this.imgY * -1 + ")"});
            }
        });
    }

    saveBook() {
        let book = {
            name: this.name,
            year: this.year,
            author: this.author,
            pages: this.pages,
            pageNow: this.pageNow
        }
        this.books.push(book);
        localStorage.setItem('book', JSON.stringify(this.books));
        console.log(book);
        console.log(this.books);
        $.post('server.php', {save: this.books}).done(function () {
            console.log("Success");
        }).fail(function () {
            alert('FAIL');
        }).always(function () {
            console.log("Tegime midagi AJAXiga");
        });
        $('#addBook').addClass('greenBg');

        setTimeout(function () {
            $('#addBook').removeClass('greenBg');
        }, 500);
        setTimeout(()=>{
            location.reload();
        }, 1000)

    }

    saveAllBooks(){
        $.post('server.php', {save: this.books}).done(function (){
            console.log("Success");
        }).fail(function (){
            alert('FAIL');
        }).always(function (){
            console.log("Tegime midagi AJAXiga");
        });
    }

    showBooks() {
        if (this.books.length > 0) {
            $('#booksNotRead').html("");
            $('#booksInProcess').html("");
            $('#booksRead').html("");
            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].pageNow == 0) {
                    $('#booksNotRead').append("<li class='book'><div>" + this.books[i].name + "</div></div><div>" + this.books[i].year + "</div><div>" + this.books[i].author + "</div><div id='pageNow" + [i] + "'>" + this.books[i].pageNow + "</div><div><input type='range' id='slider-" + [i] + "' min='0' max='" + this.books[i].pages + "' value='" + this.books[i].pageNow + "' step='1'></div></li>");
                } else if (this.books[i].pageNow > 0 && this.books[i].pageNow != this.books[i].pages) {
                    $('#booksInProcess').append("<li class='book'><div>" + this.books[i].name + "</div></div><div>" + this.books[i].year + "</div><div>" + this.books[i].author + "</div><div id='pageNow" + [i] + "'>" + this.books[i].pageNow + "</div><div><input type='range' id='slider-" + [i] + "' min='0' max='" + this.books[i].pages + "' value='" + this.books[i].pageNow + "' step='1'></div></li>");
                } else if (this.books[i].pageNow == this.books[i].pages) {
                    $('#booksRead').append("<li class='book'><div>" + this.books[i].name + "</div></div><div>" + this.books[i].year + "</div><div>" + this.books[i].author + "</div><div id='pageNow" + [i] + "'>" + this.books[i].pageNow + "</div><div><input type='range' id='slider-" + [i] + "' min='0' max='" + this.books[i].pages + "' value='" + this.books[i].pageNow + "' step='1'></div></li>");
                }
            }
        }

        this.sliders = $('input[id^="slider-"]');
        this.divs = $('div[id^="pageNow"]');
        for (let i = 0; i < this.books.length; i++) {
            this.sliders.eq(i).on("input", () => {
                this.books[this.sliders.eq(i).attr("id").split("-")[1]].pageNow =  this.sliders.eq(i).val();
                this.divs.eq(i).html( this.sliders.eq(i).val());
            });
            this.sliders.eq(i).on("change", () => {
                this.saveAllBooks();
                this.showBooks();
                console.log(this.books);
            });
        }
    }

    updateData() {
        this.date = new Date();
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        this.hours = this.date.getHours();
        this.minutes = this.date.getMinutes();
        this.seconds = this.date.getSeconds();
        if (this.hours < 10) {
            this.hours = "0" + this.hours;
        }
        if (this.minutes < 10) {
            this.minutes = "0" + this.minutes;
        }
        if (this.seconds < 10) {
            this.seconds = "0" + this.seconds;
        }
        if (this.day < 10) {
            this.day = "0" + this.day;
        }
        if (this.month < 10) {
            this.month = "0" + this.month;
        }
        $("#time").html(this.hours + ":" + this.minutes + ":" + this.seconds);
        $("#date").html(this.day + "." + this.month + "." + this.year);
    }
}

let bs = new BookShelf();