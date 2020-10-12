import styled from 'styled-components';

export const PageArea = styled.div`

display: flex;
margin-top: 20px;

.leftSide {
    width: 250px;
    margin-right: 10px;

    .filterName {
        font-size: 16px;
        margin: 10px 0px;
    }

    input, select {
        width: 100%;
        height: 40px;
        border: 2px solid #9BB83C;
        border-radius: 5px;
        outline: 0;
        font-size: 16px;
        color: #000;
        padding: 10px;
    }

    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .categoryItem {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;

        img {
            width: 30px;
            height: 30px;
            margin-right: 5px;
        }

        span {
            font-size: 15px;
        }

    }

    .categoryItem:hover,
    .categoryItem.active {
        background-color: #9BB83C;
        color: #FFF;
    }
}

.rightSide {
    flex: 1;

    h2 {
        margin: 0;
        font-size: 20px;
    }

    .listWarning {
        padding: 30px;
        text-align: center;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .aditem {
            width: 33%;
        }
    }

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0px;
    
        .pageItem {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border: 1px solid #000;
            margin-left: 5px;
            cursor: pointer;

            &:hover {
                border: 1px solid #999;
            }
        }

        .active {
            background-color: #bbb;
        }
    }
}

@media (max-width: 600px) {
    
    & {
        flex-direction: column;
    }
    
    .leftSide {
        width: auto;
        margin: 10px;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                width: 50%;
                margin-bottom: 10px;
            }
        }
    }

    .rightSide {
        margin: 10px;

        .list .aditem {
            width: 50%;
        }

        .pagination {
            flex-wrap: wrap;

            .pageItem {
                margin-bottom: 10px;
            }
        }
    }
}

`;