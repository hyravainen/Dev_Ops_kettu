Problems

Define and analyse the project requirements

The objective of this teamwork assignment is to identify, structure, and prioritise the requirements for the project application. The team should develop a clear understanding of what the application needs to accomplish, who will use it, and what technical and quality characteristics it must fulfil.

1. Identify the Stakeholders and User Needs

Start by identifying the main stakeholders and potential users of the application. Consider their different needs, expectations, and responsibilities.
- Asiakas -> Pystyä etsimään ja varaamaan hotellihuoneita
- Vastaanottovirkailija -> Varauksien hallinta
- Esihenkilö -> ???
- Järjestelmän pääkäyttäjä/ylläpitäjä -> Hallitsee/ylläpitää käyttäjiä ja järjestelmää
- 


2. Define the Overall Application Requirements

Develop a set of requirements for the application as a whole. The requirements should describe what the application must do and the qualities it must have. Consider, for example:

    Functional requirements: what functions and services must the application provide?
        - Pystyy etsimään huoneita ja näkemään niiden saatavuuden, valitsemaan huonekategorian ja muut erikoisvaatimukset (lemmikit, lapset, lisängyt)
        - Pystyy kirjautumaan hotellivarausjärjestelmään
        - 
    Performance requirements: how quickly and efficiently should the application operate?
        - Hakutulokset tulevat nopeasti näkyviin
        - 
    Usability requirements: how easy should the application be to learn and use?
        - Järjestelmän tulee olla selkeä ja helppokäyttöinen (ei monimutkaisia hakuehtoja)
        - 
    Reliability and availability: how reliable should the application be, and how should it behave in case of failures?
        - Järjestelmän pitää olla vakaa ja kaatumis-/virhetilanteissa sen pitää antaa turvallinen "output" eli ei tuo näkyviin koodia tai muuta tietoturvaan vaikuttavaa -> Antaa selkeän virheilmoituksen
        - 
    Security: what data and operations need to be protected?
        - Käyttäjätiedot (nimet, osoitteet, maksutiedot)
        - Erilliset käyttäjätunnukset ja niiden salasanat. Salasanat pitää olla erillisellä palvelimella.
        - 
    Maintainability: how easy should the application be to maintain, modify, and extend?
        - Dokumentointi
        - Modulaarisuus koodissa -> helppo lisätä/poistaa ominaisuuksia
        - 
    Compatibility and integration: what other systems, platforms, or services should the application interact with?
        - Maksu API integraatio
        - 

    Constraints: are there standards, legislation, organisational requirements, or technical limitations that need to be considered?
        - Standars: Saavutettavuus
        - Legislation: GDPR
        - Organisational Requirements: 
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

5. Draw use-case and sequence diagrams for the application. 