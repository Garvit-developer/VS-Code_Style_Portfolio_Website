import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./Components/Layouts/Layout";
import Home from "./pages/index";        // eager
import Skills from "./pages/Skills";     // eager
import "react-medium-image-zoom/dist/styles.css";

const MyVision = lazy(() => import("./pages/MyVision"));
const Contact = lazy(() => import("./pages/Email"));
const Experience = lazy(() => import("./pages/Experience"));
const Gaming = lazy(() => import("./pages/Gaming"));
const GithubStreak = lazy(() => import("./pages/GithubStreak"));
const Learning = lazy(() => import("./pages/Learning"));
const Projects = lazy(() => import("./pages/Projects/index"));
const ProjectPage = lazy(() => import("./pages/Projects/ProjectPage"));
const NotFound = lazy(() => import("./pages/404"));
const Resume = lazy(() => import("./pages/Resume"))

const PageLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[65vh]">

            {/* VS Code Terminal Container */}
            <div className="w-[300px] rounded-md border border-[#3c3c3c] bg-[#1e1e1e] shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-[#252526] border-b border-[#3c3c3c]">
                    <span className="w-3 h-3 rounded-full bg-red-500/60" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-[11px] text-[#cccccc] font-mono">
                        bundler
                    </span>
                </div>

                {/* Body */}
                <div className="px-4 py-4 font-mono text-[11px] space-y-1">
                    <p className="text-[#4ec9b0]">
                        ➜ loading route module
                    </p>
                    <p className="text-[#dcdcaa] animate-pulse">
                        importing components...
                    </p>
                    <p className="text-[#6a9955]">
                        ✔ optimizing chunks
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3 h-1 w-full bg-[#333] rounded overflow-hidden">
                        <div className="h-full bg-[#007acc] animate-loader" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <p className="mt-4 text-[11px] text-gray-500 tracking-wide">
                Initializing application route
            </p>

            {/* Animation */}
            <style>
                {`
                @keyframes loader {
                    0% { width: 0%; }
                    50% { width: 65%; }
                    100% { width: 100%; }
                }
                .animate-loader {
                    animation: loader 1.2s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
};

function App() {
    return (
        <HelmetProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Layout>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/myvision" element={<MyVision />} />
                            <Route path="/resume" element={<Resume/>} />
                            <Route path="/experience" element={<Experience />} />
                            <Route path="/gaming" element={<Gaming />} />
                            <Route path="/github-streak" element={<GithubStreak />} />
                            <Route path="/learning" element={<Learning />} />
                            <Route path="/email" element={<Contact />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/projects/:projectname" element={<ProjectPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </HelmetProvider>
    );
}

export default App;
