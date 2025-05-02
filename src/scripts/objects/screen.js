const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `
        <div class="info">
            <img src="${user.avatarUrl}" alt="Foto do Perfil do Usuario"/>
            <div class="data">
                <h1>${user.name ?? 'Nao possui nome cadastrado'}</h1>
                <p>${user.bio ?? 'Nao possui bio cadastrada'}</p>
                <p><strong>👥 Seguidores:</strong> ${user.followers}</p>
                <p><strong>👥 Seguindo:</strong> ${user.following}</p>
            </div>
        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `
            <li class="repository-item">
                <div class="repository-details">
                    <div class="repository-name">${repo.name.toUpperCase()}</div>
                    <div class="repository-stats">
                        <span class="repo-info">🍴 ${repo.forks_count}</span>
                        <span class="repo-info">⭐ ${repo.stargazers_count}</span>
                        <span class="repo-info">👀 ${repo.watchers_count}</span>
                        <span class="repo-info">👩‍💻 ${repo.language ?? 'N/A'}</span>
                    </div>
                </div>
            </li>`
        )
        

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositorios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }

        const filteredEvents = user.events.filter(event => event.type === 'CreateEvent' || event.type === 'PushEvent').slice(0, 10)
        let eventsItens = ''

        filteredEvents.forEach(event => {
            if(event.type === 'PushEvent'){
                const commitMsg = event.payload.commits[0]?.message ?? 'Sem mensagem'
                eventsItens += `
                <li>
                    <strong>Push:</strong> ${event.repo.name} - "${commitMsg}"
                </li>`
            } else if(event.type === 'CreateEvent'){
                eventsItens += `
                <li>
                    <strong>Create:</strong> ${event.repo.name}
                </li>`
            }
        })

        if(filteredEvents.length > 0){
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Últimos Eventos</h2>
                <ul>${eventsItens}</ul>
            </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuario nao encontrado</h3>"
    }
}

export { screen }
