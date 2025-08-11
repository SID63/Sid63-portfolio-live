import { CursorEffects } from './components/CursorEffects';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Involvement } from './components/Involvement';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen relative dark">
      <CursorEffects />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Involvement />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}