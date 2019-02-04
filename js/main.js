// Public APIs na githubu - izvor za vezbe
// // Redosled pisanja koda:
// 1. varijable
// 2. funkcije
// 3. dogadjaji

// javascript alias - skracenje koda
const s = selektor => document.getElementById(selektor)
let wikiArticle;

function nthIndex(str, pat, n) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

$(document).ready(function () {
    $("button").on("click", function () {
        s('wiki-loader').style.display = "inline-block"; // alias
        s('text-loader').style.display = "inline-block";
        const artist = document.getElementById("muzicar").value;
        const pesma = document.getElementById("pesma").value;
        const urlPesme = `https://api.lyrics.ovh/v1/${artist}/${pesma}`;
        $("#lyrics").html(""); // potrebno jer se ovde appenduje

        fetch(urlPesme)
            .then(response => response.json())
            .then(function (odgovor) {
                s('text-loader').style.display = "none";
                let artistTitle = artist.charAt(0).toUpperCase() + artist.substring(1);
                let songTitle = pesma.charAt(0).toUpperCase() + pesma.substring(1);
                $("#artist").html(artistTitle + "<br>");
                $("#song").html(songTitle + "<br>");
                console.log(odgovor.lyrics);
                var tekst = odgovor.lyrics.split("\n");

                for (i = 0; i < tekst.length; i++) {
                    $("#lyrics").append(tekst[i] + "<br>");
                }
            }).catch(function (error) {
                $("#lyrics").append("Nesto je krenulo naopako, proverite da li ste uneli pravilno ime pesme i muzicara.");
                console.error(error);
                // alert(error);
            });

        document.getElementById("img").innerHTML = "";
        document.getElementById("wiki").innerHTML = "";
        let upit = $("#muzicar").val();
        upit = upit.replace(" ", "_");
        
        // TREBA KAPITALIZOVATI PRVO SLOVO SVAKE RECI U UPITU
        // PROVERITI DA LI POSTOJI SLIKA PRE DISPLAY-A SLIKE

        let wikiApi = `https://en.wikipedia.org/w/api.php?action=query&titles=${upit}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`;

        // citanje wiki api-ja i prikazivanje prva 3 paragrafa
        fetch(wikiApi)
            .then(function (response) {
                return response.json();
            }).then(function (response) {
                s('wiki-loader').style.display = "none";
                wikiArticle = response.query.pages;
                wikiArticle = wikiArticle[Object.keys(wikiArticle)[0]];

                if (wikiArticle.extract !== undefined) {
                    let skracenje = nthIndex(wikiArticle.extract, '</p>', 3);
                    document.getElementById("wiki").innerHTML =
                        wikiArticle.extract.substring(0, skracenje);
                    document.getElementById("wiki").innerHTML += 
                    `<a href="${wikiArticle.fullurl}" target="_blank">Read more</a>`
                    const imgSrc = wikiArticle.thumbnail.source;
                    document.getElementById("img").innerHTML = `<img src="${imgSrc}" alt="">`;
                }

                if (wikiArticle.extract == null) {
                    document.getElementById("wiki").innerHTML = "Wikipedia doesn't recognize the artist name.";
                }
            })
    })



    $(".social a:first").siblings().on("click", function () {
        alert("Unfortunately my only online presence at the moment is github :)");
    })

    // zaustavljanje refresha stranice pri submit-u
    // ugradjena metoda preventDefault()
    // const forma = document.getElementById("our-form")
    // forma.addEventListener('submit', function(e) {
    //      
    // })

})