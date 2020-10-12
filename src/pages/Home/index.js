import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/OlxAPI';

const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([]); // Lista de estados brasileiros
    const [categories, setCategories] = useState([]); // Lista de categorias da Home
    const [recentList, setRecentList] = useState([]); // Lista de anuncios recentes

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
                limit: 18
            });
            setRecentList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    
                    <div className="searchbox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?"/>
                            <select name="state">
                                
                                {stateList.map(state =>
                                    <option 
                                        key={state.id} 
                                        value={state.sigla}>
                                            {state.sigla}
                                    </option>
                                )}

                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">

                        {categories.map((cat, k) => 
                            <Link key={k} to={`/ads?cat=${cat.slug}`} className="categoryItem">
                                <img src={cat.img} alt="" />
                                <span>{cat.name}</span>
                            </Link>
                        )}

                    </div>

                </PageContainer>
            </SearchArea>

            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">

                        {recentList.map((item, i) => 
                            <AdItem key={i} data={item} />
                        )}

                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>

                    <hr/>
                    
                    Lorem ipsum proin torquent euismod enim feugiat turpis pretium vel, per torquent amet purus netus semper cras sed eget ultrices, erat euismod cursus quisque rutrum potenti ipsum potenti. volutpat aptent a nostra purus fermentum neque volutpat quis bibendum, posuere non quis taciti fusce sapien fermentum felis vel, dapibus aenean dolor at ad ultricies pharetra nulla. feugiat vulputate aliquam ante dictumst condimentum curae ad augue eleifend, dui sodales turpis phasellus arcu semper malesuada accumsan curabitur, semper non sit nullam sociosqu sed vulputate ac. tellus torquent conubia commodo nunc eget dolor, curabitur habitasse congue odio dui dictum, sodales lobortis cursus cras egestas.

                </PageArea>
            </PageContainer>
        </>
    );
}

export default Page;