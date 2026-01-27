import  React from 'react';
import "../styles/global.scss"
import "../styles/home.scss"

export const Home = () => {
    return (
        <main className="main global--container">
            <h1 className="main__title">Zestawienie serwisowe pojazdu osobowego</h1>
            <img className="main__photo global--container" src="/img/auto.png" alt="auto"/>
        </main>
    )
}