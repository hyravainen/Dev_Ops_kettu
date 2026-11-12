<b>1. What are the main responsibilities of the customer and the software engineer during requirements engineering? Discuss why both sides need to participate actively.</b><br>
Ilman asiakkaan panosta devaaja ei tiedä, mitä ollaan tekemässä. Asiakkaan ja devaajan yhteistyöllä löydetään toimet, jotka suorittamalla päästään mahdollisimman lähelle asiakkaan toiveita budjetti ja aika huomioiden.
Asiakkaan tärkein tehtävä on tuoda ilmi omat tarpeensa sovellusta ajatellen, toiminnalliset ja ei-toiminnalliset vaatimukset (esim. UI ja turvallisuus) ja osallistua päätöksentekoon. 

<b>2. Why is communication difficult during requirements analysis? As a team, identify common causes of misunderstanding and suggest ways to reduce them.</b><br>
Viestintä voi olla haastavaa vaatimusten analysoinnissa, koska asiakkaalla ja devaajalla on erilainen osaaminen ja lähtökohtaisesti näkökulmat todennäköisesti eroavat.
Asiakas tuntee liiketoiminnan tarpeet, kun taas devaajat keskittyvät teknisiin ratkaisuihin. Tämän vuoksi sama asia voidaan ymmärtää eri tavoin.

<b>3. Requirements analysis focuses on what the system should do rather than how it should be implemented. Discuss why this separation is useful during early analysis.</b><br>
Ennenkuin tiedetään, mitä ohjelman pitää pystyä suorittamaan, ei voida keskustella siitä, miten nämä toiminnot koodataan, testataan ja implementoimaan. Ideointi ja ideoinnin syventyminen johtaa sitten lopulta 
vahvempaan suunnitteluun, ja tästä ihan konkreettiseen tekemiseen.

<b>4. What information should an analyst collect during problem recognition? Create a list of questions that could help a team understand the customer's real problem.</b><br>
-Minkä ongelman toivot ohjelman ratkaisevan?<br>
-Jos olisin ohjelman käyttäjä, mitä sillä pitäisi pystyä tekemään?<br>
-Kenellä tämä ongelma esiintyy?<br>
-Kuinka usein se esiintyy?<br>
-Miten asia hoidetaan tällä hetkellä?<br>
-Miten ohjelman onnistumista mitataan?<br>

<b>5. Compare a simple question-and-answer interview with the FAST approach. Discuss the strengths of each approach and explain when a team might prefer a collaborative meeting.</b><br>
FAST = Facilitated Application Specification Techniques. Perinteinen kysymys-vastaus-systeemi kehittäjän ja asiakkaan välillä on nopea ja helppo järjestää, se toimii hyvin jos sidosryhmiä on vähän ja 
se mahdollistaa yksityiskohtaisen tiedon keräämisen. Sen heikkouksia on kuitenkin väärinymmärrysten syntyminen helpommin ja haastattelussa voi kestää kauan, eikä kaikkia oleellisia asioita silti välttämättä saada tuotua esiin.
FAST-metodilla kaikki sidosryhmät tulevat kuulluksi kerralla ja väärinymmärrykset voidaan selvittää samantien, ja tämä puolestaan nopeuttaa vaatimusten lukkoonlyömistä ja helpottaa kaikkien asianosaisten työtä.
FAST-palaveri on toki vaikeampi suunnitella ja järjestää, kun sidosryhmiä on paljon. FAST-palaveri voi olla parempi vaihtoehto silloin, kun projekti on suuri ja monimutkainen, vaatimuksista on useita erilaisia näkemyksiä tai 
kun tarvitaan mahdollisimman nopeaa päätöksentekoa.

<b>6. Design a FAST meeting for requirements gathering. Decide who should participate, what rules should be followed, how ideas should be recorded, and how the final consensus list should be created.</b><br>
Kokoukseen tulisi kutsua asiakas, loppukäyttäjän edustaja/edustajat, kehittäjät, projektipäällikkö, mahdollinen tuoteomistaja ja fasilitaattori. Sääntöjä voisi olla esimerkiksi:<br>
-Kaikilla osallistujilla on oikeus esittää mielipiteensä.<br>
-Toisten puhetta ei keskeytetä.<br>
-Keskustelu pidetään järjestelmän vaatimuksissa.<br>
-Kaikki ideat kirjataan ylös ennen niiden arviointia.<br>
-Epäselvät asiat merkitään jatkoselvitykseen.<br>
Ideat voisi tallentaa vaikka Miroon tai Jiraan. Näistä voi sitten tehdä esim. user stories jotka sitten priorisoidaan must have, should have ja nice to have.

<b>7. What is the purpose of a mini-specification? Discuss what information should be included in a good mini-specification and how it can help later development activities.</b><br>
Mini-spec on yksityiskohtainen kuvaus yksittäisestä toiminnosta tai prosessista. Sen pitäisi selittää toiminnon tarkoitus, syöte, logiikka, tulosteet, liiketoimintasäännöt ja poikkeustilanteet. 
Hyvin laadittu mini-spesifikaatio auttaa suunnittelussa, ohjelmoinnissa, testauksessa ja järjestelmän ylläpidossa. Se toimii tavallaan yksityiskohtaisena ohjeena kehittäjälle, jotta tiedetään tarkalleen, mitä 
kukin pienikin yksityiskohta tekee.

<b>8. Compare the three QFD requirement types: normal, expected, and exciting. Create several examples for a software system and explain why each example belongs to its category.</b><br>
Normaalit vaatimukset tarkoittavat sellaisia vaatimuksia, jotka pitää löytyä valmiista ohjelmasta. Esimerkkejä tästä voi olla huoneen varaaminen ja varauksen peruminen, huonetyypin valinta ja päivämäärän valinta hotellin varausjärjestelmässä. <br>Odotetut (expected) ovat sellaisia, joita ohjelmasta olisi hyvä löytyä, ja niiden puuttuminen voi aiheuttaa suurta puutetta. Näitä voi olla esimerkiksi riittävät maksutavat, navigoinnin helppous/vaikeus ja ohjelman tietoturvallinen käyttö.<br>
Nice to have, eli exciting, eli ns. ylimääräiset ominaisuudet ovat sellaisia, joita ilman ohjelma toimii eikä niiden puute aiheuta loppukäyttäjässä tunteita. Näistä esimerkkinä voisi olla valinta vaihtaa varausjärjestelmän väriprofiilia tummasta yömoodista vaaleaan päivämoodiin, hotellin huoneiden 360-virtuaaliesittely ja vaikka suosikkihotellin valitseminen.<br>

<b>9. How can prototyping help when customers and developers are not completely sure about the requirements? Discuss its possible benefits for communication, understanding, and requirements refinement.</b><br>
Prototyyppi auttaa kehittäjää ja asiakasta hahmottamaan ohjelman toimintaa, sen virheitä sekä selvittää mahdollsia epäselvyyksiä vaatimuksissa. Samalla tavalla, kuin arkkitehti tekee pienoismallin suunnitelmastaan, myös kehittäjä ja asiakas hyötyy nähdessään prototyypin ohjelmasta, jota kehitetään.

<b>10. How can FAST and QFD be used together during requirements engineering? Develop a team process that shows how customer needs could be collected, discussed, prioritized, and transformed into software requirements.</b><br>
FAST on apuväline vaatimusten keräämiseen ja dokumentointiin, kun taas QFD auttaa arvioimaan kerättyjen vaamitusten tärkeyttä ja muuttamaan ne mitattavaan muotoon.<br>
FAST-palaverin jälkeen kerätyt vaatimukset käydään lävitse ja lajitellaan kategorioittain, esimerkiksi käytettävyyteen, luotettavuuteen ja turvallisuuteen. Sen jälkeen ne käydään QFD:n mukaisesti läpi ja priorisoidaan normaaliksi, odotetuksi tai innostavaksi vaatimukseksi. Sitten asiakas antaa näille tärkeysarvon. Kehittäjät muuttavat asiakastarpeet konkreettisiksi vaatimuksisksi ohjelmistoa varten. Lopulta järjestetään uusi FAST-palaveri, jossa ohjelmistovaatimukset käydään läpi, tarkistetaan ne, korjataan mahdolliset epäselvyydet ja hyväksytään lista.

