async function loadPortfolio() {
    const response = await fetch('projects.json');
    const projects = await response.json();
    const container = document.getElementById('project-grid');

    container.innerHTML = projects.map(project =>  `
        <div class="project">
            <h1> ${project.title}</h1>
            <img src="${project.image1}">
            <img src="${project.image2}">
            <img src="${project.image3}">
            
            <p> ${project.description}</p>
        </div>
        `).join('');
}
loadPortfolio();