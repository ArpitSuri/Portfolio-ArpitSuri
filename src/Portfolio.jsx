import { useState, useEffect  , useRef} from 'react';
import { Code, Briefcase, User, Mail, Github, Linkedin, ExternalLink, ChevronRight, Menu, X, NavigationOff, ArrowUp } from 'lucide-react';
import axios from 'axios';

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState({});
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cursorRef = useRef(null);



    // Mouse follower effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
        }
    }, [mousePosition]);

    // Scroll progress effect
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(currentProgress);

            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation effect for elements to fade in
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        document.querySelectorAll('.animate-section').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                    current = section.getAttribute('id');
                }
            });

            if (current !== activeSection && current) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Animation effect for elements to fade in
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        document.querySelectorAll('.animate-section').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    // Detect active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                    current = section.getAttribute('id');
                }
            });

            if (current !== activeSection && current) {
                setActiveSection(current);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    // Sample portfolio data
    const projects = [
        {
            id: 1,
            title: "Ai Ats Resume Filter",
            description: "An AI-powered resume filtering system that uses natural language processing to analyze resumes and match them with job descriptions, streamlining the hiring process.",
            tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "AI"],
            image: "/ai-ats.jpg",
            projectUrl: "https://ai-ats-system-qdvb.vercel.app/"
        },
        {
            id: 2,
            title: "Eco-Farm Connect",
            description: "A full-stack e-commerce platform for local farmers to sell their waste produce directly to industires, featuring a user-friendly interface and secure payment processing.",
            tags: ["Hackathon","React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
            image: "/farmer.jpg",
            projectUrl: "https://eco-farm-connect-prototype.vercel.app/"
        },
        {
            id: 3,
            title: "Hospital Management System",
            description: "A comprehensive web application for managing hospital operations, including patient records, appointment scheduling, and billing.",
            tags: ["React", "Node", "Tailwind CSS", "MongoDB"],
            image: "/HMS.png",
            projectUrl: "https://hospital-patient-management-system-obo3.vercel.app/"

        },
        {
            id: 4,
            title: "Concrete Mx Design Calculator",
            description: "A web application for calculating concrete mix designs based on user inputs, with a focus on user experience and performance.",
            tags: ["React", "Civil Engineering", "IS-CODE", "Material Design"],
            image: "/concrete-calculator.jpg",
            projectUrl: "https://concrete-mix-calculator-frontend.vercel.app/"
        },
        {
            id: 5,
            title: "Code-Sync",
            description: "A platform for programmers to code on a single screen, allowing for real-time collaboration and code sharing.",
            tags: ["React", "Node.js", "Socket.io", "Tailwind CSS"],
            image: "/code-sync.jpg",
            projectUrl:"https://code-sync-indol-eight.vercel.app/"

        },
        {
            id: 6,
            title: "Dr Ayurveda",
            description: "An Ai powered Chatbot for Ayurvedic consultation, providing personalized health advice and remedies.",
            tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
            image: "/ayurveda.jpg",
            projectUrl: "https://arpitsuri.github.io/Dr-Ayurveda/"

        },
        {
            id: 7,
            title: "Growtech-Creation",
            description: "A frontend project showcasing a modern and responsive design for a tech company, built with React and Tailwind CSS.",
            tags: ["React", "Tailwind CSS", "HTML", "CSS"],
            image: "/1.png",
            projectUrl: "https://arpitsuri.github.io/GTC/"

        }
    ];

    const skills = [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "MongoDB", level: 70 },
        { name: "AWS", level: 65 },
        { name: "UI/UX Design", level: 75 }
    ];

    const experiences = [
        {
            company: "PARTICIPATED IN 3rd HACKATHON AT IIIT UNA",
            role: "Team Lead",
            description: "PARTICIPATED AND DEVELOPED ECO-FARM-CONNECT PLATFORM"
        },
        {
            company: "PARTICIPATED IN 2ND HACKTHON I OTHER COLLEHE AND WON 2ND POSITION",
            role: "Team Lead",
            description: "CAME 2ND IN REGIONAL PITCHING ROUND OF HACKFEST AT GCG LANDRAN"
        },
        {
            company: "PARTICIPATED IN MY FIRST HACKTHON",
            role: "Team Lead",
            description: "HACKMOL 5.0 AND OUR PROJECT WAS OF MEDTECH THEME (DR. AYURVEDA)"
        }
    ];


    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "9e6a0b75-21a7-478f-b9d4-2cdef6e7b395");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await axios.post("https://api.web3forms.com/submit", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
        }
    };

    return (
        <div className="bg-black text-gray-100 min-h-screen font-sans">

            {/* Custom cursor follower */}
            <div
                ref={cursorRef}
                className="fixed w-18 h-18 pointer-events-none z-50 hidden md:block"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    marginLeft: '-16px',
                    marginTop: '-16px'
                }}
            >
                <div className="w-full h-full rounded-full bg-purple-500 opacity-20 animate-ping"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="fixed top-0 left-0 h-1 bg-white z-50" style={{ width: `${scrollProgress}%` }}></div>

            {/* Scroll to top button */}
            <button
                className={`fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg z-40 transition-all duration-300 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                onClick={scrollToTop}
            >
                <ArrowUp size={20} />
            </button>

            {/* Background particles */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                {Array(20).fill().map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-purple-500 rounded-full opacity-10"
                        style={{
                            width: `${Math.random() * 10 + 2}px`,
                            height: `${Math.random() * 10 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`
                        }}
                    ></div>
                ))}
            </div>

            {/* Navigation */}
            <nav className="fixed w-full bg-black bg-opacity-90 z-50 shadow-lg border-b border-purple-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="#home" className="flex items-center" onClick={() => scrollToSection('home')}>
                                < NavigationOff size={28} className="text-purple-500" />
                                <span className="ml-2 text-xl font-bold text-white">SURI</span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                <NavLink
                                    active={activeSection === 'home'}
                                    onClick={() => scrollToSection('home')}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    active={activeSection === 'about'}
                                    onClick={() => scrollToSection('about')}
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    active={activeSection === 'projects'}
                                    onClick={() => scrollToSection('projects')}
                                >
                                    Projects
                                </NavLink>
                                <NavLink
                                    active={activeSection === 'experience'}
                                    onClick={() => scrollToSection('experience')}
                                >
                                    Experience
                                </NavLink>
                                <NavLink
                                    active={activeSection === 'contact'}
                                    onClick={() => scrollToSection('contact')}
                                >
                                    Contact
                                </NavLink>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 hover:text-white focus:outline-none"
                            >
                                {isMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-900 pb-3 pt-2">
                        <div className="px-2 space-y-1">
                            <MobileNavLink
                                active={activeSection === 'home'}
                                onClick={() => scrollToSection('home')}
                            >
                                Home
                            </MobileNavLink>
                            <MobileNavLink
                                active={activeSection === 'about'}
                                onClick={() => scrollToSection('about')}
                            >
                                About
                            </MobileNavLink>
                            <MobileNavLink
                                active={activeSection === 'projects'}
                                onClick={() => scrollToSection('projects')}
                            >
                                Projects
                            </MobileNavLink>
                            <MobileNavLink
                                active={activeSection === 'experience'}
                                onClick={() => scrollToSection('experience')}
                            >
                                Experience
                            </MobileNavLink>
                            <MobileNavLink
                                active={activeSection === 'contact'}
                                onClick={() => scrollToSection('contact')}
                            >
                                Contact
                            </MobileNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-40 pb-20 min-h-screen flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black"></div>
                    <div className="absolute top-32 left-1/4 w-32 h-32 rounded-full bg-purple-500 filter blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-32 right-1/4 w-40 h-40 rounded-full bg-purple-700 filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="animate-section" id="hero-content">
                        <h2 className={`text-4xl md:text-6xl font-bold mb-4 text-purple-300 transition-opacity duration-1000 ${isVisible['hero-content'] ? 'opacity-100' : 'opacity-0'}`}>
                            Hi, I'm <span className="text-white">Arpit Suri</span>
                        </h2>
                        <h1 className={`text-2xl md:text-4xl font-medium mb-6 transition-all duration-1000 delay-300 ${isVisible['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <span className="text-gray-300">Full Stack</span> <span className="text-purple-400">Developer</span>
                        </h1>
                        <p className={`text-lg text-gray-300 max-w-2xl mb-8 transition-all duration-1000 delay-500 ${isVisible['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            I create modern and responsive web applications with a focus on user experience and performance. Passionate about building elegant solutions to complex problems.
                        </p>
                        <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-700 ${isVisible['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:bg-purple-700 transition-colors group"
                            >
                                View Projects
                                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="border border-purple-600 text-purple-300 px-6 py-3 rounded-lg font-medium hover:bg-purple-900/20 transition-colors"
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:gap-12">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h2 className="text-3xl font-bold mb-6 text-white border-b-2 border-purple-500 pb-2 inline-block">
                                About Me
                            </h2>
                            <div className="animate-section" id="about-text">
                                <p className={`text-lg text-gray-300 mb-4 transition-all duration-700 ${isVisible['about-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                    I am Arpit Suri, an ambitious and driven individual with a strong foundation in technology . My academic journey at Dr. B.R. Ambedkar National Institute of Technology Jalandhar, where I am pursuing a B.Tech.

                                    {/* I am Arpit Suri, an ambitious and driven individual with a strong foundation in technology . My academic journey at Dr. B.R. Ambedkar National Institute of Technology Jalandhar, where I am pursuing a B.Tech, has equipped me with a robust technical skill set, particularly in the MERN STACK . I thrive in competitive environments, regularly participating in hackathons to challenge myself and stay at the forefront of industry trends. Beyond my professional and academic pursuits, I am a martial arts enthusiast, which instills discipline and a relentless pursuit of excellence in all aspects of my life. */}
                                </p>
                                <p className={`text-lg text-gray-300 mb-4 transition-all duration-700 delay-200 ${isVisible['about-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                Has equipped me with a robust technical skill set, particularly in the MERN STACK . I thrive in competitive environments, regularly participating in hackathons to challenge myself and stay at the forefront of industry trends
                                </p>
                                <p className={`text-lg text-gray-300 mb-6 transition-all duration-700 delay-400 ${isVisible['about-text'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                    Beyond my professional and academic pursuits, I am a martial arts enthusiast, which instills discipline and a relentless pursuit of excellence in all aspects of my life. 
                                </p>
                            </div>

                            <div className="animate-section" id="resume-button">
                                <button
                                    className={`flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-500 ${isVisible['resume-button'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                >
                                    <span>Download Resume</span>
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <h3 className="text-2xl font-bold mb-6 text-white">Skills</h3>
                            <div className="space-y-4 animate-section" id="skills-list">
                                {skills.map((skill, index) => (
                                    <div key={index} className={`transition-all duration-700 delay-${index * 100} ${isVisible['skills-list'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-300">{skill.name}</span>
                                            <span className="text-purple-400">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: isVisible['skills-list'] ? `${skill.level}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-10 text-white border-b-2 border-purple-500 pb-2 inline-block">
                        Featured Projects
                    </h2>


                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="animate-section bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-900/20 hover:translate-y-[-5px] transition-all duration-300"
                                id={`project-${project.id}`}
                            >
                                <div className={`transition-all duration-700 delay-${index * 200} ${isVisible[`project-${project.id}`] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                                        <p className="text-gray-400 mb-4">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="bg-purple-900/40 text-purple-300 px-2 py-1 text-sm rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 group">
                                            <a href={project.projectUrl}>View Project</a>
                                            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className="text-center mt-12 animate-section" id="more-projects">
                        <button
                            className={`border border-purple-500 text-purple-300 px-6 py-3 rounded-lg font-medium hover:bg-purple-900/20 transition-all duration-700 ${isVisible['more-projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            View All Projects
                        </button>
                    </div> */}
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-10 text-white border-b-2 border-purple-500 pb-2 inline-block">
                        Work Experience
                    </h2>

                    <div className="space-y-12 animate-section" id="experience-list">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`relative pl-8 border-l-2 border-purple-700 transition-all duration-700 delay-${index * 200} ${isVisible['experience-list'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            >
                                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
                                <div className="mb-1 flex flex-wrap items-center justify-between">
                                    <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                    <span className="text-purple-400 font-medium">{exp.duration}</span>
                                </div>
                                <h4 className="text-lg text-gray-300 mb-3">{exp.company}</h4>
                                <p className="text-gray-400">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-black relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-purple-600 filter blur-3xl opacity-10 animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-purple-800 filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl font-bold mb-10 text-white border-b-2 border-purple-500 pb-2 inline-block">
                        Get In Touch
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="animate-section" id="contact-info">
                            <div className={`transition-all duration-700 ${isVisible['contact-info'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                                <p className="text-gray-300 mb-6">
                                    Feel free to reach out to me for collaborations, opportunities, or just to say hello!
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-900/30 p-3 rounded-full">
                                            <Mail size={20} className="text-purple-400" />
                                        </div>
                                        <a href="mailto:coinfo.gtc@gmail.com" className="text-gray-300 hover:text-purple-300 transition-colors">
                                            coinfo.gtc@gmail.com
                                        </a>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-900/30 p-3 rounded-full">
                                            <Github size={20} className="text-purple-400" />
                                        </div>
                                        <a href="https://github.com/ArpitSuri" className="text-gray-300 hover:text-purple-300 transition-colors">
                                            github.com/ArpitSuri
                                        </a>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="bg-purple-900/30 p-3 rounded-full">
                                            <Linkedin size={20} className="text-purple-400" />
                                        </div>
                                        <a href="https://www.linkedin.com/in/arpit-suri-500872280/" className="text-gray-300 hover:text-purple-300 transition-colors">
                                            linkedin.com/in/arpit-suri-500872280
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="animate-section" id="contact-form">
                            <div className={`transition-all duration-700 delay-300 ${isVisible['contact-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <h3 className="text-2xl font-semibold mb-6 text-white">Send Me a Message</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-300 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name='clientName'
                                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name='clientEmail'
                                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-gray-300 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name='clientMessage'
                                            rows={4}
                                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-purple-500"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors w-full md:w-auto"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            < NavigationOff size={24} className="text-purple-500" />
                            <span className="ml-2 text-lg font-bold text-white">SURI</span>
                        </div>

                        {/* <div className="flex space-x-4">
                            <SocialIcon>
                                <Github size={18} />
                            </SocialIcon>
                            <SocialIcon>
                                <Linkedin size={18} />
                            </SocialIcon>
                            <SocialIcon>
                                <Mail size={18} />
                            </SocialIcon>
                        </div> */}
                    </div>

                   
                </div>
            </footer>
        </div>
    );
}

// Components
function NavLink({ children, active, onClick }) {
    return (
        <a
            href="#"
            onClick={onClick}
            className={`px-3 py-2 rounded-md text-sm font-medium ${active
                    ? 'bg-purple-900/40 text-white'
                    : 'text-gray-300 hover:bg-purple-900/20 hover:text-white'
                } transition-colors`}
        >
            {children}
        </a>
    );
}

function MobileNavLink({ children, active, onClick }) {
    return (
        <a
            href="#"
            onClick={onClick}
            className={`block px-3 py-2 rounded-md text-base font-medium ${active
                    ? 'bg-purple-900/40 text-white'
                    : 'text-gray-300 hover:bg-purple-900/20 hover:text-white'
                } transition-colors`}
        >
            {children}
        </a>
    );
}

function SocialIcon({ children }) {
    return (
        <a
            href="#"
            className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-purple-700 transition-colors"
        >
            {children}
        </a>
 


   );
}



