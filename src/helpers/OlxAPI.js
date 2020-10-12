import Cookies from 'js-cookie';
import qs from 'qs'; // (query string) transforma um objeto em query param na url.
const BASEAPI = 'http://alunos.b7web.com.br:501'; // Base do endpoint

const apiFeachFile = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.append('token', token);
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
};

// Base da requisição da API, utilizando o método POST (registro de dados).
const apiFeachPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

// Base da requisição da API, utilizando o método GET (retorno de dados).
const apiFeachGet = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

const OlxAPI = {

    // processo de login de um usuário
    login: async (email, password) => {
        const json = await apiFeachPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },

    // cadastro de um novo usuário
    register: async (name, email, password, stateLoc) => {
        const json = await apiFeachPost(
            '/user/signup',
            {name, email, password, state: stateLoc}
        );
        return json;
    },

    // listagem de estados brasileiros
    getStates: async () => { // Consumindo API externa de estados.
        const response = await fetch(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        );
        return response.json();
    },

    // listagem de categorias de produtos
    getCategories: async () => {
        const json = await apiFeachGet('/categories');
        return json.categories;
    },

    // listagem de vários anúncios
    getAds: async (options) => {
        const json = await apiFeachGet('/ad/list', options);
        return json;
    },

    // Listagem de um anúncio
    getAd: async (id, other = false) => {
        const json = await apiFeachGet('/ad/item', {id, other});
        return json;
    },

    // Criando novo anuncio com envio de imagens
    addAd: async (fData) => {
        const json = await apiFeachFile('/ad/add', fData);
        return json;
    }

}

export default () => OlxAPI;