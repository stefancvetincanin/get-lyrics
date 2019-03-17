const s = selektor => document.getElementById(selektor)
let wikiArticle;

// Gets the index of an n-th appearance of a pattern in a string
function nthIndex(str, pat, n) {
  var L = str.length, i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

function capitalize(x) {
  return x.split(" ").map(y => y.charAt(0).toUpperCase() + y.substring(1)).join(" ")
}

$(document).ready(function () {
  $("#s-button").on("click", function (e) {
    e.preventDefault()
    s('wiki-loader').style.display = "inline-block";
    s('text-loader').style.display = "inline-block";
    const artist = document.getElementById("muzicar").value;
    const pesma = document.getElementById("pesma").value;
    const urlPesme = `https://api.lyrics.ovh/v1/${artist}/${pesma}`;
    $("#lyrics").html("");

    fetch(urlPesme)
      .then(response => response.json())
      .then(function (odgovor) {
        s('text-loader').style.display = "none";
        const artistTitle = capitalize(artist);
        const songTitle = capitalize(pesma);
        $("#artist").html(artistTitle + "<br>");
        $("#song").html(songTitle + "<br>");
        var tekst = odgovor.lyrics.split("\n");
        for (i = 0; i < tekst.length; i++) {
          $("#lyrics").append(tekst[i] + "<br>");
        }
      }).catch(function () {
        $("#lyrics").append("Something went wrong, check if you entered the correct artist and song name.");
        s('text-loader').style.display = "none";
      })

    document.getElementById("img").innerHTML = "";
    document.getElementById("wiki").innerHTML = "";
    const upit = capitalize($("#muzicar").val()).replace(" ", "_")
    // upit = capitalize(upit))
    const wikiApi = `https://en.wikipedia.org/w/api.php?action=query&titles=${upit}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`;

    // Querying wikipedia API for artist info
    fetch(wikiApi)
      .then(function (response) {
        return response.json();
      }).then(function (response) {
        s('wiki-loader').style.display = "none";
        if (response.query !== undefined) {
          wikiArticle = response.query.pages;
          wikiArticle = wikiArticle[Object.keys(wikiArticle)[0]];
          if (wikiArticle.extract !== undefined) {
            let skracenje = nthIndex(wikiArticle.extract, '</p>', 3);
            document.getElementById("wiki").innerHTML =
              wikiArticle.extract.substring(0, skracenje) + "<p>[...]</p>";
            document.getElementById("wiki").innerHTML +=
              `<a href="${wikiArticle.fullurl}" target="_blank">Read more</a>`
            if (wikiArticle.thumbnail !== undefined) {
              const imgSrc = wikiArticle.thumbnail.source;
              document.getElementById("img").innerHTML = `<img src="${imgSrc}" alt="">`;
            }
          }
          if (wikiArticle.extract == null) {
            document.getElementById("wiki").innerHTML = "Wikipedia doesn't recognize the artist name.";
          }
        }
      })
  })

  $(".social a:first").siblings().on("click", function () {
    alert("Unfortunately my only online presence at the moment is github :)");
  })

})