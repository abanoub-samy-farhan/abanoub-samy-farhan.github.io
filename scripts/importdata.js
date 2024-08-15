function ImportBlogs() {
    fetch("/data/blogs.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(".blog-container ul");

            data.forEach(blog => {
                const create_li = document.createElement("li");
                const create_div = document.createElement("div");
                create_div.className = "blog-card";
                create_div.innerHTML = `
                    <h3>${blog.title}</h3>
                    <time datetime="${blog.date}">${blog.date}</time>
                    <button class="btn sm" onclick="window.location.href='${blog.url}'">
                        <p class="btn-text">Read more</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                `;
                create_li.appendChild(create_div);
                container.appendChild(create_li);
            });
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });
}

function ImportProjects() {
    fetch("/data/projects.json")
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector("#projects .experience-card-list");
            console.log(container);
            console.log(data);

            data.forEach(proj => {
                const create_div = document.createElement("div");
                create_div.classList.add("experience-card-2", "proj-card", "swiper-slide");
                create_div.innerHTML = `
                            <h2 class="card-cat">${proj.title}</h2>
                            <p class="proj-desc">${proj.description}</p>
                            <div class="buttons_container">
                                <button class="btn btn-color-1" onclick="window.location.href=(${proj.url})">GitHub</button>
                            </div>
                `;
                container.appendChild(create_div);
            });
        })
        .catch(error => {
            console.error("Error fetching the data:", error);
        });
}




document.addEventListener('DOMContentLoaded', () => {
    ImportBlogs();
    ImportProjects();
});
