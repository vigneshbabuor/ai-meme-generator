import { CATEGORIES } from '../data/categories'
import type { Category, CategoryId } from '../types'

interface CategoryPickerProps {
  activeCategory: CategoryId | null
  disabled: boolean
  onSelect: (category: CategoryId) => void
}

interface CategoryCardProps {
  category: Category
  active: boolean
  disabled: boolean
  onSelect: (category: CategoryId) => void
}

export default function CategoryPicker({ activeCategory, disabled, onSelect }: CategoryPickerProps) {
  return (
    <div className="category-grid" role="group" aria-label="Meme categories">
      {CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          active={activeCategory === category.id}
          disabled={disabled}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function CategoryCard({ category, active, disabled, onSelect }: CategoryCardProps) {
  return (
    <button
      type="button"
      className={`category-card${active ? ' category-card--active' : ''}`}
      onClick={() => onSelect(category.id)}
      disabled={disabled}
      aria-pressed={active}
      aria-label={category.label}
    >
      <span className="category-card__emoji" aria-hidden="true">
        {category.emoji}
      </span>
      <span className="category-card__label">{category.label}</span>
      <span className="category-card__blurb">{category.blurb}</span>
    </button>
  )
}