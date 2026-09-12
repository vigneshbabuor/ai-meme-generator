import Button from './components/Button'
import CategoryPicker from './components/CategoryPicker'
import EmptyState from './components/EmptyState'
import Header from './components/Header'
import MemeGallery from './components/MemeGallery'
import Spinner from './components/Spinner'
import { CATEGORIES } from './data/categories'
import { useMemeGenerator } from './hooks/useMemeGenerator'

export default function App() {
  const { memes, activeCategory, loading, error, generate } = useMemeGenerator()

  const hasMemes = memes.length > 0
  const activeLabel = CATEGORIES.find((category) => category.id === activeCategory)?.label ?? ''

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <section className="pitch">
          <h2 className="pitch__title">Instant memes, zero effort</h2>
          <p className="pitch__text">
            Choose a vibe and get five ready-to-share memes in seconds.
          </p>
        </section>

        <CategoryPicker activeCategory={activeCategory} disabled={loading} onSelect={generate} />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        {loading && <Spinner label={`Cooking up ${activeLabel} memes…`} />}

        {!loading && hasMemes && (
          <>
            <div className="results-bar">
              <h3 className="results-bar__title">{activeLabel} memes</h3>
              {activeCategory && (
                <Button variant="ghost" onClick={() => generate(activeCategory)}>
                  🔀 Shuffle again
                </Button>
              )}
            </div>
            <MemeGallery memes={memes} />
          </>
        )}

        {!loading && !hasMemes && !error && <EmptyState />}
      </main>

      <footer className="app-footer">
        Built for the Naukri AI Bootcamp · Captions by AI via OpenRouter · Images by memegen.link
      </footer>
    </div>
  )
}