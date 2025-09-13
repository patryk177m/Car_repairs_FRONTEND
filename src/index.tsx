import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./pages/Home";
import { FormAddTally } from "./pages/FormAddTally";
import {TallyListPage} from "./pages/TallyListPage";
import {NotFound} from "./pages/NotFound";
import {Header} from "./components/Header";
import {TallySingleView} from "./pages/TallySingleView";
import {TallyProvider} from "./context/TallyContext";
import {FileUpdate} from "./pages/FormTallyUpdate";
import {FormLogin} from "./pages/FormLogin";
import {FormRegister} from "./pages/FormRegister";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <TallyProvider>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route index element={<Home />} />
                  <Route path="/add" element={<FormAddTally />}/>
                  <Route path="/list" element={<TallyListPage />}/>
                  <Route path="/list/:id" element={<TallySingleView />}/>
                  <Route path="/update/:id" element={<FileUpdate />}/>
                  <Route path="/register" element={<FormRegister/>}/>
                  <Route path="/login" element={<FormLogin />}/>
                  {/* obsługa nieistniejących ścieżek */}
                  <Route path="*" element={< NotFound />} />
              </Routes>
          </BrowserRouter>
          </TallyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
