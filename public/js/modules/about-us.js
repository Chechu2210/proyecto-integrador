console.warn('🆗: Módulo PageNosotros cargado.');

class PageNosotros {
    static async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    static async loadPage(viewURL) {
        const viewContent = await this.ajax(viewURL);
        document.getElementById('main-about-us').innerHTML = viewContent;
    }

    static async setupAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-title');
        accordionHeaders.forEach((header) => {
            header.addEventListener('click', () => {
                header.classList.toggle('accordion-title--open');
            });
        });
    }   ;        

    static async loadAndSetupAccordion() {
        await PageNosotros.loadPage('views/faq.html');
        PageNosotros.setupAccordion();
      }

    static async init() {
        console.log('PageNosotros.init()');
        console.log('.');
        console.log('..');
        console.log('...');

        const mainContainer = document.getElementById("main-container");

        mainContainer.addEventListener('click', async ev => {
            if (ev.target.id === "btn-about-us-text") {
                console.log('about-us-text');
                PageNosotros.loadPage('views/about-us-text.html');
            } else if (ev.target.id === "btn-our-team") {
                console.log('btn-our-team');
                PageNosotros.loadPage('views/our-team.html');
            } else if (ev.target.id === "btn-faq") {
                console.log('FAQ');
                await PageNosotros.loadAndSetupAccordion();
            };
        });
    };
};


export default PageNosotros;
