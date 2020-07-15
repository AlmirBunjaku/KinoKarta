$(document).ready(function() {
    // Funkcije se pokreću tek nakon što je cijela stranica spremna

    var ulZanr; // varijabla sa spremanje odabranog žanra

    // klikom na dugme žanra se pokreću sljedeće naredbe
    $("#zanr button").click(function() {
        $("#zanr .current").removeClass("current"); // uklanja se klasa current sa žanra "Svi"
        $(this).addClass("current"); // klasa current se dodaje dugmetu na koje je kliknuto
        var zanrValue = $(this).text().toLowerCase(); // u varijablu se sprema tekst malih slova u odabranom dugmetu
        $("#filmovi li").fadeIn(10); // svi filmovi se pojave
        if (zanrValue != "svi") {
            // ako je odabran neki poseban žanr, nestaju svi filmovi koji ne pripadaju klasi tog zanra
            $("#filmovi li").not("." + zanrValue).fadeOut(10);
        }
    });

    var brojac = 0; // brojač za provjeru odabranog filma
    var ulFilm; // varijabla za spremanje odabranog filma
    // klikom na neki film se pokreću sljedeće naredbe
    $("#filmovi a").click(function() {
        brojac++; // brojač se inkrementira kako bi se znalo da je odabran film

        $("#izbor").css('display', 'flex'); // sekcija za izbor mjesta se pojavljuje kao flex container, prethodno je bila skrivena (display: none)
        $("#galerija").css('display', 'none'); // galerija se skriva
        $("#odFilm").css('display', 'none'); // naslov "Odaberite film" se skriva
        $("#zanr").css('display', 'none'); // dugmad za izbor žanra se skrivaju

        var odabir = 0; // brojač za odabir mjesta
        ulFilm = $(this).text(); // u varijablu ulFilm se sprema naziv odabranog filma
        ulZanr = $(this).parent().attr('class') // u varijablu ulZanr se sprema naziv klase parent elementa odabranog filma. U ovom slučaju je to klasa <li> elementa u kojem se nalazi <a> za izbor filma

        if (brojac === 1) {
            // ako je odabran jedan film, pokreću se dvije petlje za prikaz mjesta u kinu
            for (let i = 1; i <= 10; i++) {
                for (let j = 1; j <= 10; j++) {
                    $("#mjesta").append('<div class="slobodno" id="mj"></div>'); // u div #mjesta se appendaju divovi klase .slobodno i id-a #mj
                }
                $("#mjesta").append("<br>"); // poslije svakog reda od 10 elemenata se prelazi u novi red
            }

            $("#reset").css('display', 'block'); // dugme za ponovni izbor filma se prikazuje, prethodno je bilo skriveno

            var x = Math.floor((Math.random() * 99) + 1); // u varijablu x se sprema random broj od 1 do 99, koji se kasnije koristi za popunjavanje tog broja mjesta. 99 je kako bi uvijek bilo slobodnih mjesta
            if ((x % 2) != 0) {
                // ako je random broj neparan, dekrementira se za 1 kako bi se kasnije moglo izvršiti dijeljenje na dvije jednake polovice
                x--;
            }
            $(".slobodno:lt(" + (x - (x / 2)) + ")").addClass("zauzeto"); // svim mjestima klase .slobodno koji su manji od polovice random broja će biti dodata klasa .zauzeto
            $(".slobodno:gt(" + (-(x + 1 - (x / 2))) + ")").addClass("zauzeto"); // svim mjestima klase .slobodno koji su veći od minus polovice random broja će biti dodata klasa .zaueto. Razlog za +1 je što počinje od nule, a minus služi za kretanje sa kraja. Ovdje će takav postupak imati simetrično punjenje mjesta s početka i kraja kina.
        }

        $("#reset").click(function() {
            // klik na dugme koje ima id #reset reloaduje stranicu (ako se želi izabrati drugi film)
            location.reload();
        })

        // klikom na neko mjesto pokreću se sljedeće naredbe
        $("#mj.slobodno").click(function() {
            odabir++; // inkrementira se brojač odabira mjesta
            if (odabir === 1) { // ako je izveden jedan odabir
                if ($(this).hasClass("zauzeto")) {
                    // ako odabrano mjesto ima klasu .zauzeto, browser otvara upozorenje
                    alert("Odabrano mjesto je zauzeto. Odaberite drugo.")
                    odabir = 0; // odabir se resetuje kako bi se izabralo novo mjesto
                } else {
                    // ovaj dio se izvršava ako odabrano mjesto nije zauzeto

                    $(this).addClass("odabrano"); // odabranom mjestu se dodaje klasa .odabrano

                    // klikom na dugme za potvrdu mjesta se pokreću sljedeće naredbe
                    $("#potvrdi").click(function() {
                        window.location.hash = '#ulaznica' // trenutna lokacija se mijenja kako bi se prozor pomjerio na sekciju sa ulaznicom
                        var datum = new Date(); // u datum se sprema objekat Date() koji je dio JavaScripta
                        var minute; // varijabla za minute
                        if (datum.getMinutes() < 10) {
                            // ako su minute manje od 10, dodaje se nula ispred minuta
                            minute = '0' + datum.getMinutes();
                        } else {
                            // inače se uzimaju tačne minute
                            minute = datum.getMinutes();
                        }
                        var ulVrijeme = datum.getHours() + ":" + minute; // u varijablu ulVrijeme se smještaju trenutni sati i minute
                        var dan; // varijabla za dan
                        if (datum.getDate() < 10) {
                            // ako je dan manji od 10, dodaje se nula ispred dana
                            dan = '0' + datum.getDate();
                        } else {
                            // inače se uzima tačan dan
                            dan = datum.getDate();
                        }
                        var mjesec; // varijabla za mjesec
                        if (datum.getMonth() < 9) {
                            // ako je mjesec manji od 9 (JS počinje od nule kad je mjesec u pitanju), dodaje se nula i mjesec se povećava za 1 kako bi se dobio tačan mjesec
                            mjesec = '0' + (datum.getMonth() + 1);
                        } else {
                            // inače se uzima dobijeni mjesec i povećava za 1
                            mjesec = datum.getMonth() + 1;
                        }
                        var ulDatum = dan + "." + mjesec + "." + datum.getFullYear(); // u ulDatum se spremaju dan.mjesec.godina. getFullYear() funkcija je dio Date() objekta
                        $("#ulaznica").css('display', 'flex'); // sekcija sa ulaznicom se prikazuje, prethodno je bila skrivena
                        $("#ulFilm").text(ulFilm); // u <span> element se upisuje naziv filma
                        $("#ulZanr").text(ulZanr); // upisuje se zanr
                        $("#ulVrijeme").text(ulVrijeme); // upisuje se vrijeme
                        $("#ulDatum").text(ulDatum); // upisuje se datum 
                        var mjesto = $(".odabrano").prevAll("div").length + 1; // u varijablu mjesto se sprema broj koji vraća dužina funkcije prevAll(), a ona broji sve divove ispred odabranog mjesta kako bi došla do broja mjesta. Dodaje joj se 1, jer počinje od nule
                        $("#ulMjesto").text(mjesto); // upisuje se broj mjesta

                        var bojaPozadine; // varijabla za spremanje odabrane boje pozadine
                        // promjenom boje na color inputu se pokreću sljedeće naredbe
                        $("#bojaPozadine").change(function() {
                            bojaPozadine = $("#bojaPozadine").val(); // u varijablu se sprema vrijednost color inputa #bojaPozadine
                            $("#dugi").css('background-color', bojaPozadine); // mijenja se stil dugog dijela ulaznice, boja pozadine mu dobija vrijednost varijable bojaPozadine
                            $("#kratki").css('background-color', bojaPozadine); // isto kao i prethodna naredba, samo za kratki dio ulaznice
                        })

                        var bojaTeksta; // varijabla za spremanje odabrane boje teksta
                        // promjenom boje na color inputu se pokreću sljedeće naredbe
                        $("#bojaTeksta").change(function() {
                            bojaTeksta = $("#bojaTeksta").val(); // u varijablu se sprema vrijednost color inputa #bojaTeksta
                            $("#dugi").css('color', bojaTeksta); // mijenja se stil dugog dijela ulaznice, boja teksta mu dobija vrijednost varijable bojaTeksta
                            $("#kratki").css('color', bojaTeksta); // isto kao i prethodna naredba, samo za kratki dio ulaznice
                        })

                        var bojaRuba; // varijabla za spremanje odabrane boje ruba
                        // promjenom boje na color inputu se pokreću sljedeće naredbe
                        $("#bojaRuba").change(function() {
                            bojaRuba = $("#bojaRuba").val(); // u varijablu se sprema vrijednost color inputa #bojaRuba
                            $("#dugi").css('border-color', bojaRuba); // mijenja se stil dugog dijela ulaznice, boja ruba mu dobija vrijednost varijable bojaRuba
                            $("#kratki").css('border-color', bojaRuba); // isto kao i prethodna naredba, samo za kratki dio ulaznice
                            $("hr").css('border-color', bojaRuba); // isto kao i prethodna naredba, samo za <hr> prekide na ulaznici
                        })

                        // klikom na kratki dio pokreću se sljedeće naredbe
                        $("#kratki").click(function() {
                            $(this).css('border-left-style', 'dashed'); // lijevi rub kratkog dijela postaje isprekidana linija
                            $(this).animate({ left: '50px' }); // upotrebom funkcije animate() se kratki dio pomjera udesno za 50px, tj. zbog njegove osobine position: relative, sa lijeve strane mu se dodaje 50px
                            $(this).fadeOut(1000); // kratki dio nestaje, trajanje od jedne sekunde
                            $("#ulaznica").delay(1000).fadeOut(2500); // sekcija sa ulaznicom nestaje nakon 2.5 sekunde, s tim da prvo ima delay od jedne sekunde kako bi se prethodni efekt za kratki dio izvršio
                            $("#izbor").delay(1000).fadeOut(2500); // isti efekt kao i prethodna naredba - nestaje sekcija sa izborom mjesta
                            $("#reset h1").text("Napravite novu ulaznicu"); // tekst dugmeta "Promijenite odabrani film" postaje "Napravite novu ulaznicu"
                        })
                    })
                }
            } else {
                // ako je odabir veći od 1, izvršavaju se sljedeće naredbe
                if ($(this).hasClass("odabrano")) {
                    // ako odabrano mjesto ima klasu odabrano, ona se ukida i resetuje se brojač za izbor mjesta. To je proces poništavanja odabranog mjesta
                    $(this).removeClass("odabrano")
                    odabir = 0;
                } else {
                    // ako se klikne na neko drugo mjesto dok je jedno već odabrano, browser prikazuje upozorenje
                    alert("Poništite odabrano mjesto kako biste odabrali novo.")
                }
            }
        })
    })


});