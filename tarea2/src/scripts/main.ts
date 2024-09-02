fetch('./data.json')
    .then(res => res.json())
    .then((data: any) => {
        const header = document.getElementById('header')
        if (header) {
            header.innerHTML = `
                <h1>${data.name}</h1>
                <h3>${data.sub_title}</h3>
            `;
        }

        const profile = document.getElementById('profile');
        if (profile && data.profile) {
            profile.innerHTML = `
                <div class="center-image">
                <img src="${data.profile.img}" alt="${data.profile.alt}" />
                <p>${data.profile.about}</p>
                </div>
            `;

            const contactInfo = data.contact_info;
            if (contactInfo) {
                profile.innerHTML += contactInfo.map((info: any) => `
                    <h3>${info.title}</h3>
                    <p>${info.value}</p>
                `).join('');
            }

            const tech = data.technologies;
            if (tech) {
                const list_items = tech.map((techItem: string) => `<li>${techItem}</li>`).join('');
                profile.innerHTML += `
                    <footer>
                        <h3>Tecnologías</h3>
                        <ul>${list_items}</ul>
                    </footer>
                `;
            }
        }

        const details = document.getElementById('details');
        const educationTag = document.getElementById('education');
        const educationData = data.education;

        if (details && educationTag && educationData) {
            const toAppend = educationData.map((info: any) => `
                <div class="education-title">
                    <p>${info.place}</p>
                    <p>${info.year}</p>
                </div>
                <div class="education-description">
                    <p>${info.description}</p>
                </div>
            `).join('');

            educationTag.innerHTML = toAppend;
        }

        const experience = document.getElementById('experience');
        if (experience) {
            let toAppend: string;
            toAppend = `<p>${data.experience_default}</p>`;
            const div = document.createElement('div');
            div.innerHTML = toAppend;

            experience.insertAdjacentElement('afterend', div);
        }

        const proyectsTag = document.getElementById('proyects');
        const proyectsData = data.proyects;
        if (proyectsData && proyectsTag) {
            const toAppend = proyectsData.map((info: any) => `
                <p>${info.name}</p><p>${info.description}</p>
            `).join('');

            const div = document.createElement('div');
            div.innerHTML = toAppend;

            proyectsTag.insertAdjacentElement('afterend', div);
        }

        const skillsTag = document.getElementById('skills');
        const skillsData = data.skills;
        if (skillsTag && skillsData) {
            const toAppend = skillsData.map((info: string) => `
                <li>${info}</li>
            `).join('');

            const ul = document.createElement('ul');
            ul.innerHTML = toAppend;

            skillsTag.insertAdjacentElement('afterend', ul);
        }

        const hobbies = document.getElementById('hobbies');
        if (hobbies) {
            const p = document.createElement('p');
            p.innerText = data.Hobbies;

            hobbies.insertAdjacentElement('afterend', p);
        }

        const contactForm = document.getElementById('contact-form') as HTMLFormElement;
        if (contactForm) {
            contactForm.action = `https://formsubmit.co/${data.mail}`
        }
    })
    .catch(error => console.error('Error fetching data:', error));

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;

    if (form) {
        form.addEventListener('submit', (event: Event) => {
            const name = (document.getElementById('name') as HTMLInputElement).value.trim();
            const email = (document.getElementById('email') as HTMLInputElement).value.trim();
            const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();
            const errorMessages: string[] = [];

            // Validar nombre
            if (name.length === 0) {
                errorMessages.push('El nombre es obligatorio.');
            }

            // Validar correo electrónico
            if (email.length === 0) {
                errorMessages.push('El correo electrónico es obligatorio.');
            } else if (!validateEmail(email)) {
                errorMessages.push('El correo electrónico no es válido.');
            }

            // Validar mensaje
            if (message.length === 0) {
                errorMessages.push('El mensaje es obligatorio.');
            }

            // Mostrar errores si existen
            if (errorMessages.length > 0) {
                event.preventDefault(); // Prevenir el envío del formulario
                alert(errorMessages.join('\n'));
            }
        });
    }
});

// Función para validar el formato del correo electrónico
function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}