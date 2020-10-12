import styled from 'styled-components';

const HeaderArea = styled.div`
height: 60px;
background-color: #fff;
border-bottom: 1px solid #ccc;

.container {
    max-width: 1000px;
    margin: auto;
    display: flex;
}

a {
    text-decoration: none;
}

.logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;

    .logo-1,
    .logo-2,
    .logo-3 {
        font-size: 30px;
        font-weight: bold;
    }
    .logo-1 { color: #ff0000; }
    .logo-2 { color: #00ff00; }
    .logo-3 { color: #0000ff; }
}

nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ul {
        display: flex;
        align-items: center;
        height: 40px;
    }

    li {
        margin-left: 20px;
        margin-right: 20px;

        a, button {
            border: 0;
            background: none;
            color: #000;
            font-size: 15px;
            text-decoration: none;
            cursor: pointer;
            outline: none;

            &:hover {
                color: #777;
            }

            &.button {
                background-color: #ff8100;
                border-radius: 4px;
                color: #fff;
                padding: 5px 10px;
            }

            &.button:hover {
                background-color: #e57706;
            }
        }
    }
}


@media (max-width: 600px) {
    & {
        height: auto;
    }
        
    .container {
        flex-direction: column;
    }

    .logo {
        justify-content: center;
        margin: 20px 0px;
    }

    nav ul {
        flex-direction: column;
        height: auto;

        li {
            margin: 10px 20px;
        }
    }
}

`;

export {
    HeaderArea
}