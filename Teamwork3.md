Teamwork III (DevOps, Best Practices and Tools)

What is the main purpose of DevOps?
 - Päätarkoitus on yhdistää ohjelmistokehitys ja operaatiotiimit, jotta voidaan kehittää ja toimittaa nopeammin, luotettavammin ja jatkuvasti.

What are the main stages of a CI/CD pipeline?
 - Code commit → Build → Test → Package → Deploy 

Which DevOps tools can be used for source control, CI/CD, containerization, infrastructure, configuration management, and monitoring?
 - Git = Source control
 - CI/CD = Jenkins
 - Containerization = Docker
 - Infrastructure = Terraform
 - Configuration management = Ansible
 - Monitoring = Prometheus / Grafana

How can Git support effective collaboration in DevOps?
 - Kaikkien projektissa olevien hallussa oleva versionhallinta.

What is Infrastructure as Code (IaC), and what are its benefits?
 - Infran hallinta/provisiointi koodin ja automatisoinnin helpottaminen (ei manuaalista konffaamista). Hyötynä julkaisu helppous = repeatable and consistant

What is configuration management, and how can Ansible support it?
 - Tarkoittaa järjestelmien ja palvelinten asetusten hallintaa. Ansiblella voidaan automatisoida ohjelmistojen asennuksia, servereiden konfigurointia, käyttäjien hallintaa, sovellusten julkaisua ja asetusten hallintaan useiden koneiden/järjestelmien välillä

What are containers, and why are they useful in DevOps?
 - Paketti joka sisältää sovelluksen ja sen vaativat komponentit. Sen ansiopsta sovellus toimii yhdenmukaisemmin eri ympäristöissä.

What is container orchestration, and what role does Kubernetes play?
 - Kun containereita on suuri määrä se auttaa hallinnoimaan niitä.
    - Scheduling containers
    - Scaling applications
    - Restarting failed workloads
    - Service discovery
    - Rolling out new versions

What are monitoring and observability, and which tools support them?
 - Se on järjestelmän toiminnan jatkuvaa seurantaa ja Prometheus sekä Grafana tukevat sitä
    - Prometheus: CPU and Memory usage, Request rates, Error rates
    - Grafana: Visualisoi esim. prometheuksen tarkkailemaa dataa. Voi luoda esim. dashboardin

What is DevSecOps, and how does it improve software security?
 - Tietoturva otetaan mukaan projektin alusta. Kaikki lisäykset ja uudistukset testamaan jatkuvasti, joka estää tietoturva ongelmien syntymistä aikaisessa vaiheessa.

Why is automated testing important in DevOps?
 - Se nopeuttaa testaamista ja vapauttaa resursseja.

What is configuration drift, and how can it be reduced?
 - Ilmiä jossa järjestelmän todellinen tila alkaa vähitellen poiketa määritellystä tai tavoitteellisesta tilasta. Esim. tehdään manuaalisia korjauksia eikä dokumentoida niitä mitenkään.

Why are small and frequent deployments considered a DevOps best practice?
 - Pienemmät riskit. Hallinta helpompaa, esim. virheen tullessa on helpompi palauttaa pieni pala ohjelmaa kuin iso kokonaisuus. 

What are the main steps for responding to a failed deployment?
 - Detect → Investigate → Rollback → Fix → Test → Redeploy → Monitor

How can Git, Jenkins, Docker, Kubernetes, Terraform, Ansible, Prometheus, and Grafana work together?
 - Kaikilla on oma osansa DevOps ketjussa.


 Yhteenveto:
 - Kehityksessä on ennaltamääritelty kehityskaari, johon on kehitelty työkalut, jotka edesauttavat/nopeuttavat työn kulkua. Automaatiolla pyritään vähentämään virheiden määrää toistuvissa työtehtävissä. Lisäksi sillä saadaan vapautettua resursseja, jolloin niitä voidaan sijoittaa toisaalle.