import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { PageContainer } from '../../components/MainComponents';
import { PageArea, OthersArea, BreadChumb, Fake } from './styled';
import AdItem from '../../components/partials/AdItem';
import useApi from '../../helpers/OlxAPI';

const Page = () => {
    const api = useApi();
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    const formatDate = (date) => {
        let cDate = new Date(date);

        let month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${month[cMonth]} de ${cYear}`;
    }

    const formatPrice = (price) => {
        return `R$ ${price.toFixed(2).replace('.', ',')}`;
    }

    return (
        <PageContainer>
            {adInfo.category && 
                <BreadChumb>
                    Você está aqui:
                    <Link to="/">
                        Home
                    </Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>
                        {adInfo.stateName}
                    </Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>
                        {adInfo.category.name}
                    </Link>
                    / 
                    {adInfo.title}
                </BreadChumb>
            }
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            
                            {loading && <Fake height={300} />}

                            {adInfo.images && 
                                <Slide>
                                    {adInfo.images.map((img, k) => {
                                        return (
                                            <div key={k} className="each-slide">
                                                <img src={img} alt="Slideshow dos anúncios" />
                                            </div>
                                        );
                                    })}
                                </Slide>
                            }

                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                
                                {loading && <Fake height={20} />}

                                {adInfo.title && 
                                    <h2>{adInfo.title}</h2>
                                }
                                { adInfo.dateCreated && 
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }

                            </div>
                            <div className="adDescription">
                                
                                {loading && <Fake height={100} />}

                                <p>{adInfo.description}</p>
                                <hr/>
                                {adInfo.views && 
                                    <small>Visualizações: {adInfo.views}</small>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box boxPadding">

                        {loading && <Fake height={20} />}

                        {adInfo.priceNegotiable && 
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">
                                Preço: <span>{formatPrice(adInfo.price)}</span>
                            </div>
                        }

                    </div>

                    {loading && <Fake height={50} />}

                    {adInfo.userInfo && 
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className="contactSellerLink">
                                Fale com o vendedor
                            </a>
                            <div className="createdBy box boxPadding">
                                Criado por:
                                    <strong>{adInfo.userInfo.name}</strong>
                                    <small>E-mail: {adInfo.userInfo.email}</small>
                                    <small>Estado: {adInfo.userInfo.stateName}</small>
                            </div>
                        </>
                    }

                </div>
            </PageArea>

            <OthersArea>
                {adInfo.others && 
                    <>
                        <h2>Outras ofertas do vendedor</h2>

                        <div className="list">
                            {adInfo.others.map((item, i) => {
                                return (
                                    <AdItem key={i} data={item} className="aditem" />
                                );
                            })}
                        </div>
                    </>
                }
            </OthersArea>

        </PageContainer>
    );
}

export default Page;