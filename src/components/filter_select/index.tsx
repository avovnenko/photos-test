import { FC, ChangeEvent, useCallback } from 'react'
import { Button, FormGroup, FormLabel, MenuItem, Select } from '@material-ui/core'

interface FilterSelectProps {
  activeCategory: number | null
  setActiveCategory: (value: number | null) => void
  options: number[]
}

const FilterSelect: FC<FilterSelectProps> = ({ activeCategory, options, setActiveCategory }) => {
  const handleChange = useCallback((event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    setActiveCategory(event.target.value as number)
  }, [setActiveCategory])

  const handleReset = useCallback(() => {
    setActiveCategory(null)
  }, [setActiveCategory])

  return (
    <FormGroup>
      <FormLabel>Filter</FormLabel>
      <Select
        value={activeCategory ?? ''}
        onChange={handleChange}
      >
        {
          options.map(id => (
              <MenuItem
                key={id}
                value={id}
              >
                {id}
              </MenuItem>
            )
          )
        }
      </Select>
      <Button variant='contained' onClick={handleReset}>Reset</Button>
    </FormGroup>
  )
}

export default FilterSelect
