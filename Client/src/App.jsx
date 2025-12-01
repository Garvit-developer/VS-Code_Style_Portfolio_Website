import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './Components/Layouts/Layout';
import Home from './pages/index';
import Blogs from './pages/Blogs';
import Contact from './pages/Email';
import Experience from './pages/Experience';
import Gaming from './pages/Gaming';
import Hobbies from './pages/Hobbies';
import Learning from './pages/Learning';
import Skills from './pages/Skills';
import Startup from './pages/Startup';
import Projects from './pages/Projects/index';
import ProjectPage from './pages/Projects/ProjectPage';
import NotFound from './pages/404';
import "react-medium-image-zoom/dist/styles.css";

function App() {
    return (
        <HelmetProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/gaming" element={<Gaming />} />
                        <Route path="/hobbies" element={<Hobbies />} />
                        <Route path="/learning" element={<Learning />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/startup" element={<Startup />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:projectname" element={<ProjectPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Router>
        </HelmetProvider>
    );
}

export default App;
