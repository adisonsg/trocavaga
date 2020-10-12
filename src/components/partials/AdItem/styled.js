import styled from 'styled-components';

export const Item = styled.div`

a {
    display: block;
    border: 1px solid #FFF;
    margin: 10px;
    padding: 10px;
    text-decoration: none;
    border-radius: 10px;
    background-color: #FFF;
    color: #000;
    transition: all ease 0.3s;

    &:hover {
        background-color: #EEE;
        border: 1px solid #BBB;
    }

    .itemImage img {
        width: 100%;
        border-radius: 5px;
    }

    .itemName {
        font-weight: bold;
    }
}

`;