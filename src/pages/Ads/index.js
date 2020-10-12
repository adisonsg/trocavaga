import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/OlxAPI';

let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    // useLocation irá pegar os dados do anúncio passados pela url (request query). Ex: ?cat=cars
    const useQueryString = () => {
        // converte dados da URL e retorna de um objeto
        return new URLSearchParams( useLocation().search );
    }

    const query = useQueryString();

    // definindo e inicializando states com os valores do query params da url. 
    const [q, setQ] = useState( (query.get('q') != null) ? query.get('q') : '' );
    const [cat, setCat] = useState( (query.get('cat') != null) ? query.get('cat') : '' );
    const [state, setState] = useState( (query.get('state') != null) ? query.get('state') : '' );

    const [stateList, setStateList] = useState([]); // Lista de estados brasileiros
    const [categories, setCategories] = useState([]); // Lista de categorias da Home
    const [recentList, setRecentList] = useState([]); // Lista de anuncios recentes
    const [adsTotal, setAdsTotal] = useState(0); // total de anúncios
    const [pageCount, setPageCount] = useState(0); // número de páginas para exibir  os anúncios
    const [currentPage, setCurrentPage] = useState(1);

    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage-1) * 4;

        const json = await api.getAds({
            sort: 'desc',
            limit: 4,
            q,
            cat,
            state,
            offset
        });
    
        setRecentList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    // moritorando adsTotal e calculando o total de páginas necessárias para exibir os anúncios.
    useEffect(() => {
        if(recentList.length > 0) {
            setPageCount( Math.ceil(adsTotal / recentList.length) );
        } else {
            setPageCount(0);
        }
    }, [adsTotal]);

    useEffect(() => {
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }

        history.replace({
            search: `?${queryString.join('&')}`
        });

        // Timer: aguarda um tempo para realizar a requisição.
        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setCurrentPage(1); // resetando página corrente

    }, [q, cat, state]);

    // BUSCANDO INFORMAÇÕES NO WEBSERVICE/API E SETANDO NOS STATES.
    // Estados
    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    // Categorias
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    // Anuncios recentes
    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 4
            });
            setRecentList(json.ads);
        }
        getRecentAds();
    }, []);

    let pagination = [];
    // populando array com os números de páginas.
    for(let i=1; i<=pageCount; i++) {
        pagination.push(i);
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input 
                            type="text" 
                            name="q" 
                            placeholder="O que você procura?" 
                            value={q}
                            onChange={(e)=>setQ(e.target.value)}
                        />

                        <div className="filterName">Estado:</div>
                        <select name="state" value={state} onChange={(e)=>setState(e.target.value)}>
                            <option></option>
                            {stateList.map((state, i) => {
                                return (
                                    <option key={i} value={state.sigla}>
                                        {state.nome}
                                    </option>
                                );
                            })}
                        </select>

                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((category, i) => {
                                return (
                                    <li 
                                        key={i} 
                                        className={cat==category.slug ? 'categoryItem active' : 'categoryItem'}
                                        onClick={()=>setCat(category.slug)}
                                    >
                                        <img src={category.img} alt="imagem categoria" />
                                        <span>{category.name}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultados</h2>

                    {loading && recentList === 0 && 
                        <div className="listWarning">
                            Carregando...
                        </div>
                    }
                    {!loading && recentList.length === 0 &&
                        <div className="listWarning">
                            Nenhum anúncio encontrado!
                        </div>
                    }

                    <div className="list" style={{opacity: resultOpacity}}>
                        {recentList.map((ad, k) => 
                            <AdItem key={k} data={ad} />
                        )}
                    </div>

                    <div className="pagination">
                        {pagination.map((i, k) => 
                            <div 
                                key="k" 
                                className={i==currentPage?'pageItem active':'pageItem'}
                                onClick={()=>setCurrentPage(i)}
                            >
                                {i}
                            </div>
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}

export default Page;