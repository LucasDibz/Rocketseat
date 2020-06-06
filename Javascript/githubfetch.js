const spanName = document.querySelector('.gitName');
const imgGit = document.querySelector('#app img')
const inputElementGit = document.querySelector('#app input');
const buttonElementGit = document.querySelector('#app button');

async function getGitInfo(name) {
    try {
        const data = await (await fetch(`https://api.github.com/users/${name}`)).json();
        console.log(data)
        spanName.innerHTML = data.login
        imgGit.setAttribute('src', data.avatar_url);
        inputElementGit.value = '';
    } catch (error) {
        console.warn('Usuario nao encontrado');
    }
}

buttonElementGit.onclick = () => {
    getGitInfo(inputElementGit.value)
};

fetch(`https://api.github.com/users/lucasdibz`)
    .then(res => res.json())
    .then(data => {
        spanName.innerHTML = data.login
        imgGit.setAttribute('src', data.avatar_url);
    })
    .catch(error => console.log(error));