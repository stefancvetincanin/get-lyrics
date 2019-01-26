// Public APIs na githubu - izvor za vezbe
// // Redosled pisanja koda:
// 1. varijable
// 2. funkcije
// 3. dogadjaji

$(document).ready(function () {
    $("button").on("click", function () {
        const artist = document.getElementById("muzicar").value;
        const pesma = document.getElementById("pesma").value;
        // const urlPesme = "https://api.lyrics.ovh/v1/" + artist + "/" + pesma;
        const urlPesme = `https://api.lyrics.ovh/v1/${artist}/${pesma}`;

        // $("#artist").html(""); nepotrebno
        // $("#song").html("");
        $("#lyrics").html(""); // potrebno jer se ovde appenduje

        fetch(urlPesme)
            .then(response => response.json())
            .then(function (odgovor) {
                // $("#lyrics").append(odgovor.lyrics);
                $("#artist").html(artist + "<br>");
                $("#song").html(pesma + "<br>");
                console.log(odgovor.lyrics);
                var tekst = odgovor.lyrics.split("\n");
                // console.log(tekst);
                // console.log(tekst.length);

                for (i = 0; i < tekst.length; i++) {
                    $("#lyrics").append(tekst[i] + "<br>");
                }
            }).catch(function (error) {
                $("#lyrics").append("Nesto je krenulo naopako, proverite da li ste uneli pravilno ime pesme i muzicara.");
                console.error(error);
                alert(error);
            });
    })

    $(".social a:first").siblings().on("click", function() {
        alert("Currently my only online presence is at github :)");
    })

    // zaustavljanje refresha stranice pri submit-u
    // ugradjena metoda preventDefault()

})
