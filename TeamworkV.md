Problems

Define and analyse the project requirements

The objective of this teamwork assignment is to identify, structure, and prioritise the requirements for the project application. The team should develop a clear understanding of what the application needs to accomplish, who will use it, and what technical and quality characteristics it must fulfil.

1. Identify the Stakeholders and User Needs

Start by identifying the main stakeholders and potential users of the application. Consider their different needs, expectations, and responsibilities.
- Asiakas -> Pystyä etsimään ja varaamaan hotellihuoneita
- Vastaanottovirkailija -> Varauksien hallinta
- Esihenkilö -> Monitorointi
- Järjestelmän pääkäyttäjä/ylläpitäjä -> Hallitsee/ylläpitää käyttäjiä ja järjestelmää


2. Define the Overall Application Requirements

Develop a set of requirements for the application as a whole. The requirements should describe what the application must do and the qualities it must have. Consider, for example:

    Functional requirements: what functions and services must the application provide?
        - Pystyy etsimään huoneita ja näkemään niiden saatavuuden, valitsemaan huonekategorian ja muut erikoisvaatimukset (lemmikit, lapset, lisängyt)
        - Pystyy kirjautumaan hotellivarausjärjestelmään
        - Asiakas saa varausvahvistuksen (automatiikka)
        - Pystyy maksamaan eri maksuvaihtoehdoilla (ennakko, paikan päällä)
        - VV näkee varaukset ja niiden sisällöt
        - VV pitää pystyä tekemään muokkauksia varauksille (varauksetn tekeminen, perumiset, päivämäärä muutokset, pituus muutokset)
        - EH samat roolit kuin VV + logit + hyvitykset
        - ADMIN ylläpitää järjestelmää ja sen käyttäjiä/rooleja

    Performance requirements: how quickly and efficiently should the application operate?
        - Hakutulokset tulevat nopeasti näkyviin
        
    Usability requirements: how easy should the application be to learn and use?
        - Järjestelmän tulee olla selkeä ja helppokäyttöinen (ei monimutkaisia hakuehtoja)
        - Saavutettavuus vaatimukset, WCAG (Suomessa ja EU-maissa saavutettavuusvaatimuksissa edellytetään kesäkuussa 2018 hyväksytyn WCAG 2.1 -version noudattamista.)

    Reliability and availability: how reliable should the application be, and how should it behave in case of failures?
        - Järjestelmän pitää olla vakaa ja kaatumis-/virhetilanteissa sen pitää antaa turvallinen "output" eli ei tuo näkyviin koodia tai muuta tietoturvaan vaikuttavaa -> Antaa selkeän virheilmoituksen
        
    Security: what data and operations need to be protected?
        - Käyttäjätiedot (nimet, osoitteet, maksutiedot)
        - Erilliset käyttäjätunnukset ja niiden salasanat. Salasanat pitää olla erillisellä palvelimella.
        - Varaustiedot ja kalenterit pitää olla suojattuna
        
    Maintainability: how easy should the application be to maintain, modify, and extend?
        - Dokumentointi
        - Modulaarisuus koodissa -> helppo lisätä/poistaa ominaisuuksia
        
    Compatibility and integration: what other systems, platforms, or services should the application interact with?
        - Maksu API integraatio
        - Kalenteri API
        - Kulkukorttien hallintasysteemi 

    Constraints: are there standards, legislation, organisational requirements, or technical limitations that need to be considered?
        - Standards: Saavutettavuus, WCAG 2.1 AA-tasoinen
        - Legislation: GDPR
        - Organisational Requirements: Yritys voi määrittää sen käyttämät autentikointi metodit
        - Technical Limitations: Pitää toimia PC:llä(windows, mac, linux) ja puhelimella

3. Partition the application into logical subsystems

Divide the application into logical subsystems or major components. The decomposition should make it easier to understand the responsibilities of each part of the system and how the parts interact.

For each subsystem:

    Define its main purpose and responsibilities
    Define the inputs and outputs
    Define specific functional and non-functional requirements

4. Using Quality Function Deployment

Use Quality Function Deployment (QFD) to analyse the relationship between stakeholder/customer needs and the technical requirements of the application. The analysis should:

    Identify the most important customer/user needs
    Translate these needs into measurable technical or system requirements
    Prioritize the requirements based on their importance to stakeholders and the project.

| # | Tarve (sidosryhmän kielellä) | Sidosryhmä | Tärkeys | Perustelu |
|---|---|---|---|---|
| A | Löydän vapaan huoneen nopeasti | Asiakas | 5 | Koko palvelun ydin |
| B | Käyttö onnistuu puhelimella ja tietokoneella, myös esteettömästi | Asiakas | 4 | Vaatimus: laitekirjo, WCAG |
| C | Tietoni ovat turvassa | Kaikki | 5 | GDPR, maksu- ja henkilötiedot |
| D | Voin maksaa sopivalla tavalla (ennakko/paikan päällä) | Asiakas | 4 | Varaus ei valmistu ilman maksua |
| E | Saan varausvahvistuksen heti | Asiakas | 3 | Luottamus, mutta ei kriittinen |
| F | Voin muokata varauksia helposti | Vastaanottovirkailija | 4 | Päivittäinen työ |
| G | Näen, kuka muutti mitä, ja voin hyvittää | Esihenkilö | 4 | Valvonta ja vastuu |
| H | Hallitsen käyttäjiä ja rooleja | Ylläpitäjä | 3 | Tärkeä, mutta harvoin käytetty |

| #  | Vaatimus | Tavoite | Miten mitataan |
|----|----------|----------|----------------|
| H1 | Haun nopeus | ≤ 2 s, 50 samanaikaista käyttäjää | kuormatesti |
| H2 | Responsiivisuus ja saavutettavuus | toimii 320–1920 px leveysillä, WCAG 2.1 AA, 0 kriittistä virhettä saavutettavuustesteissä | automaattinen + manuaalinen testi |
| H3 | Pääsynhallinta | jokainen toiminto tarkistaa roolin palvelimella, salasanat hashattuina, HTTPS | käyttöoikeustesti per rooli |
| H4 | Ei korttitietojen tallennusta | 0 korttikenttää tietokannassa | tietokantaskeeman tarkistus |
| H5 | Muutosloki | 100 % varaus-, maksu- ja hyvitystoiminnoista kirjataan (kuka, mitä, milloin) | testitapaukset |
| H6 | Vahvistusviesti | lähtee ≤ 1 min varauksesta | testi |
| H7 | Päällekkäisyystarkistus | 0 päällekkäistä varausta testeissä, myös samanaikaisilla pyynnöillä | yksikkö- ja samanaisuustesti |
| H8 | Maksutavat ja hyvitys | ennakko + paikan päällä, hyvitys vain esihenkilöllä | testitapaukset |

| Sija | Vaatimus | Pisteet | Vaikeus | Päätös |
|------|----------|---------|---------|---------|
| 1 | H3 Pääsynhallinta | 96 | 3 | **Must:** korkein arvo, tietoturva |
| 2 | H2 Responsiivisuus + WCAG | 63 | 3 | **Must:** rajoite tehtävässä |
| 3 | H5 Muutosloki | 60 | 2 | **Must:** edullinen, tukee valvontaa |
| 4 | H4 Ei korttitietoja | 57 | 1 | **Must:** lähes ilmainen, iso riskin vähennys |
| 5 | H7 Päällekkäisyystarkistus | 51 | 2 | **Must:** varauksen ydinlogiikka |
| 6 | H1 Haun nopeus | 49 | 2 | **Should:** perushaku Must, tavoite viimeistellään myöhemmin |
| 7 | H8 Maksutavat ja hyvitys | 48 | 4 | **Should:** toteutus mock-versiona |
| 8 | H6 Vahvistusviesti | 27 | 2 | **Could:** mock-viesti riittää |

5. Draw use-case and sequence diagrams for the application. 
