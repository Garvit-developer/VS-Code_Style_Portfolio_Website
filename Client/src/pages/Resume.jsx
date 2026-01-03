import { Document, Page, pdfjs } from "react-pdf";
import resumePdf from "../assets/Garvit_Dani_Resume.pdf";
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { VscCloudDownload, VscFilePdf, VscCode, VscDatabase, VscChevronRight, VscZoomIn, VscZoomOut, VscRefresh, VscChromeClose, VscExpandAll } from "react-icons/vsc";
import { FaReact, FaNodeJs, FaJs } from "react-icons/fa";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Particle = ({ delay, icon: Icon, top, left, size, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0.03, 0.08, 0.03],
      y: [0, -20, 0],
      rotate: [0, 25, 0]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none z-0"
    style={{ top, left, fontSize: size, color }}
  >
    <Icon />
  </motion.div>
);

const Resume = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [numPages, setNumPages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [userZoom, setUserZoom] = useState(1.0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Update window width for dynamic scaling
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate dynamic scale factor
  const baseScale = useMemo(() => {
    if (windowWidth < 500) return (windowWidth - 40) / 600; // Mobile extra small
    if (windowWidth < 768) return (windowWidth - 60) / 750; // Mobile
    if (windowWidth < 1024) return 0.9; // Tablet
    return 1.1; // Desktop
  }, [windowWidth]);

  const scaleFactor = useMemo(() => isExpanded ? baseScale * 1.5 * userZoom : baseScale, [baseScale, userZoom, isExpanded]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setUserZoom(prev => Math.min(prev + 0.1, 3.0));
  };
  const handleZoomOut = (e) => {
    e.stopPropagation();
    setUserZoom(prev => Math.max(prev - 0.1, 0.5));
  };
  const handleResetZoom = (e) => {
    e.stopPropagation();
    setUserZoom(1.0);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setUserZoom(1.0); // Reset zoom when toggling
  };

  useEffect(() => {
    document.title = "Resume | Garvit Dani";
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      universal={true}
    >
      <div className="relative min-h-screen bg-[#1e1e1e] text-white flex flex-col overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Animated Particles */}
        {!isMobile && (
          <>
            <Particle icon={FaNodeJs} top="15%" left="10%" size="40px" color="#21a366" delay={2} />
            <Particle icon={VscCode} top="45%" left="5%" size="35px" color="#29a5ed" delay={8} />
            <Particle icon={FaJs} top="75%" left="12%" size="30px" color="#ffd600" delay={5} />
            <Particle icon={VscDatabase} top="20%" left="85%" size="45px" color="#6878f7" delay={12} />
            <Particle icon={FaReact} top="50%" left="90%" size="50px" color="#29a5ed" delay={0} />
            <Particle icon={VscCode} top="80%" left="82%" size="35px" color="#29a5ed" delay={5} />
          </>
        )}

        <div className="relative z-10 w-full px-4 py-6 md:px-0 md:py-6 flex flex-col items-center">
          {/* Header */}
          <div className="w-full max-w-5xl mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-3xl md:text-5xl font-thin tracking-tight text-white">
                My <span className="font-semibold text-blue-500">Resume</span>
              </div>
              <p className="text-gray-400 max-w-xl text-base md:text-lg font-light leading-relaxed font-['Roboto']">
                Professional experience and technical expertise.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!isMobile && (
                <button
                  onClick={toggleExpand}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#252526] hover:bg-[#37373d] text-white rounded font-medium transition-colors border border-[#454545] text-sm md:text-base"
                >
                  <VscExpandAll className="text-lg" />
                  {isExpanded ? "Collapse" : "Full View"}
                </button>
              )}

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={resumePdf}
                download
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#007acc] hover:bg-[#1a8ad3] text-white rounded font-medium transition-colors shadow-lg active:shadow-inner text-sm md:text-base no-underline"
              >
                <VscCloudDownload className="text-lg" />
                Download PDF
              </motion.a>
            </div>
          </div>

          {/* Editor Container */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.9, y: 0 }}
            className={`w-full max-w-3xl bg-[#1e1e1e] border border-[#454545] rounded-lg overflow-hidden shadow-2xl flex flex-col mb-10 ${!isMobile ? "cursor-pointer" : ""} ${isExpanded ? 'hidden' : ''}`}
            onClick={() => !isMobile && toggleExpand()}
          >
            {/* PDF Rendering Area */}
            <div className="flex justify-center p-2 md:p-10 overflow-x-auto scrollbar-none bg-[#1e1e1e]">
              <Document
                file={resumePdf}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center py-20 gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    <p className="text-xs text-gray-500">Opening PDF...</p>
                  </div>
                }
                onLoadError={(err) => console.error("PDF Load Error:", err)}
              >
                <Page
                  pageNumber={1}
                  scale={scaleFactor}
                  className="shadow-[0_0_50px_rgba(0,0,0,0.5)] !bg-white"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>
            </div>
          </motion.div>
        </div>

        {/* Modal Overlay for Expanded View */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-[#1e1e1e]/95 flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#252526] border-b border-[#454545]">
              <div className="flex items-center gap-3">
                <span className="text-blue-500"><VscFilePdf className="text-xl" /></span>
                <span className="text-sm font-medium text-gray-300">Garvit_Dani_Resume.pdf</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Modal Zoom Controls */}
                <div className="flex items-center bg-[#1e1e1e] border border-[#454545] rounded overflow-hidden mr-4">
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="p-2 hover:bg-[#37373d] text-gray-400 hover:text-white transition-colors border-r border-[#454545]"
                  >
                    <VscZoomOut className="text-lg" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="px-3 py-2 hover:bg-[#37373d] text-gray-400 hover:text-white transition-colors text-xs font-mono border-r border-[#454545] min-w-[60px]"
                  >
                    {Math.round(userZoom * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="p-2 hover:bg-[#37373d] text-gray-400 hover:text-white transition-colors"
                  >
                    <VscZoomIn className="text-lg" />
                  </button>
                </div>

                <button
                  onClick={toggleExpand}
                  className="p-2 hover:bg-[#e81123] hover:text-white text-gray-400 transition-colors rounded"
                  title="Close"
                >
                  <VscChromeClose className="text-xl" />
                </button>
              </div>
            </div>

            {/* Modal PDF Content */}
            <Scrollbars
              autoHide
              className="flex-1"
            >
              <div className="flex justify-center p-8 min-h-full items-start bg-[#1e1e1e]">
                <Document
                  file={resumePdf}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    pageNumber={1}
                    scale={scaleFactor}
                    className="shadow-[0_0_80px_rgba(0,0,0,0.8)] !bg-white transition-transform duration-200"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                  />
                </Document>
              </div>
            </Scrollbars>
          </motion.div>
        )}
      </div>
    </Scrollbars>
  );
};

export default Resume;
